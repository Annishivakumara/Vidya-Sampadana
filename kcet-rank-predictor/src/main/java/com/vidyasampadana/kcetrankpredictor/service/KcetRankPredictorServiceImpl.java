package com.vidyasampadana.kcetrankpredictor.service;

import com.vidyasampadana.kcetrankpredictor.dto.*;
import com.vidyasampadana.kcetrankpredictor.entity.*;
import com.vidyasampadana.kcetrankpredictor.exception.PredictionException;
import com.vidyasampadana.kcetrankpredictor.exception.ResourceNotFoundException;
import com.vidyasampadana.kcetrankpredictor.mapper.KcetCutoffDataMapper;
import com.vidyasampadana.kcetrankpredictor.mapper.KcetExamResultMapper;
import com.vidyasampadana.kcetrankpredictor.mapper.KcetRankPredictionMapper;
import com.vidyasampadana.kcetrankpredictor.repository.KcetCutoffDataRepository;
import com.vidyasampadana.kcetrankpredictor.repository.KcetExamResultRepository;
import com.vidyasampadana.kcetrankpredictor.repository.KcetRankPredictionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KcetRankPredictorServiceImpl implements KcetRankPredictorService {


    @Value("${ml.service.url}")
    private String mlServiceUrl;

    // Databases
    private final KcetExamResultRepository examResultRepository;
    private final KcetCutoffDataRepository cutoffDataRepository;
    private final KcetRankPredictionRepository predictionRepository;

    //Mapper
    private final KcetExamResultMapper examResultMapper;
    private final KcetCutoffDataMapper cutoffDataMapper;
    private final KcetRankPredictionMapper rankPredictionMapper;

    //ML service Provider
    private final RestTemplate restTemplate;

    @Override
    public KcetExamResultResponseDTO saveExamResult(KcetExamResultRequestDTO request) {
        KcetExamResult entity = examResultMapper.toEntity(request);
        entity.setTotalMarks(
                request.getPhysicsMarks() +
                        request.getChemistryMarks() +
                        request.getMathsMarks()
        );
        entity.setCreatedAt(LocalDateTime.now());
        return examResultMapper.toResponseDTO(examResultRepository.save(entity));
    }

    @Override
    public KcetCutoffDataResponseDTO saveCutoffData(KcetCutoffDataRequestDTO request) {
        KcetCutoffData entity = cutoffDataMapper.toEntity(request);
        return cutoffDataMapper.toResponseDTO(cutoffDataRepository.save(entity));
    }


    @Override
    public KcetRankPredictionResponseDTO predictRank(KcetRankPredictionRequestDTO request) {

        //  Step 1: Fetch student exam result to get actual marks
        KcetExamResult examResult = examResultRepository
                .findByStudentIdAndExamYearAndCategory(
                        request.getStudentId(),
                        request.getPredictionYear(),
                        request.getCategory()
                )
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Exam result not found for student: " + request.getStudentId() +
                                " for year: " + request.getPredictionYear()
                ));

        //  Step 2: Build ML request with actual marks from DB
        MLPredictionRequestDTO mlPredictionRequest = new MLPredictionRequestDTO(
                examResult.getPhysicsMarks(),
                examResult.getChemistryMarks(),
                examResult.getMathsMarks(),
                request.getCategory().toString()
        );

        //  Step 3: Call Python ML service
        MLPredictionResponseDTO mlResponse = restTemplate.postForObject(
                mlServiceUrl + "/predict",
                mlPredictionRequest,
                MLPredictionResponseDTO.class
        );

        if (mlResponse == null) {
            throw new PredictionException("ML service returned null response");
        }

        // Step 4: Find eligible colleges
        List<KcetCutoffData> cutoffs = cutoffDataRepository
                .findByCategoryAndExamYear(
                        request.getCategory(),
                        request.getPredictionYear() - 1
                );

        List<KcetCollegePrediction> eligibleColleges = cutoffs.stream()
                .map(cutoff -> {
                    KcetCollegePrediction cp = new KcetCollegePrediction();
                    cp.setCollegeName(cutoff.getCollegeName());
                    cp.setBranchName(cutoff.getBranchName());
                    cp.setChance(calculateChance(
                            mlResponse.getPredicted_rank(),
                            cutoff.getCutoffRank()
                    ));
                    return cp;
                })
                .collect(Collectors.toList());

        // Step 5: Save prediction
        KcetRankPrediction prediction = new KcetRankPrediction();
        prediction.setStudentId(request.getStudentId());
        prediction.setTotalMarks(mlResponse.getTotal_marks());
        prediction.setPredictedRankMin(mlResponse.getPredicted_rank_min());
        prediction.setPredictedRankMax(mlResponse.getPredicted_rank_max());
        prediction.setCategory(request.getCategory());
        prediction.setPredictionYear(request.getPredictionYear());
        prediction.setPredictedAt(LocalDateTime.now());
        prediction.setEligibleColleges(eligibleColleges);
        eligibleColleges.forEach(c -> c.setPrediction(prediction));

        return rankPredictionMapper.toResponseDTO(
                predictionRepository.save(prediction)
        );
    }


    @Override
    public List<KcetRankPredictionResponseDTO> getPredictionHistory(String studentId) {
        return predictionRepository.findByStudentId(studentId)
                .stream()
                .map(rankPredictionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<KcetCutoffDataResponseDTO> getCutoffData(Integer year, ExamCategory category) {
        return cutoffDataRepository.findByCategoryAndExamYear(category, year)
                .stream()
                .map(cutoffDataMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    private PredictionChance calculateChance(Integer predictedRank, Integer cutoffRank) {
        if (predictedRank <= cutoffRank * 0.85) return PredictionChance.HIGH;
        if (predictedRank <= cutoffRank) return PredictionChance.MEDIUM;
        return PredictionChance.LOW;
    }
}