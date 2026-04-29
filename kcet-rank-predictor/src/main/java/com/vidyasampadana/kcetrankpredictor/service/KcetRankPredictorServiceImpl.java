package com.vidyasampadana.kcetrankpredictor.service;

import com.vidyasampadana.kcetrankpredictor.dto.KcetExamResultRequestDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetCutoffDataRequestDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetRankPredictionRequestDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetExamResultResponseDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetCutoffDataResponseDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetRankPredictionResponseDTO;
import com.vidyasampadana.kcetrankpredictor.entity.KcetCollegePrediction;
import com.vidyasampadana.kcetrankpredictor.entity.KcetCutoffData;
import com.vidyasampadana.kcetrankpredictor.entity.KcetExamResult;
import com.vidyasampadana.kcetrankpredictor.entity.KcetRankPrediction;
import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import com.vidyasampadana.kcetrankpredictor.entity.PredictionChance;
import com.vidyasampadana.kcetrankpredictor.exception.ResourceNotFoundException;
import com.vidyasampadana.kcetrankpredictor.mapper.KcetCutoffDataMapper;
import com.vidyasampadana.kcetrankpredictor.mapper.KcetExamResultMapper;
import com.vidyasampadana.kcetrankpredictor.mapper.KcetRankPredictionMapper;
import com.vidyasampadana.kcetrankpredictor.repository.KcetCutoffDataRepository;
import com.vidyasampadana.kcetrankpredictor.repository.KcetExamResultRepository;
import com.vidyasampadana.kcetrankpredictor.repository.KcetRankPredictionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KcetRankPredictorServiceImpl implements KcetRankPredictorService {

    private final KcetExamResultRepository examResultRepository;
    private final KcetCutoffDataRepository cutoffDataRepository;
    private final KcetRankPredictionRepository predictionRepository;

    private final KcetExamResultMapper examResultMapper;
    private final KcetCutoffDataMapper cutoffDataMapper;
    private final KcetRankPredictionMapper rankPredictionMapper;

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
        List<KcetCutoffData> cutoffs = cutoffDataRepository
                .findByCategoryAndExamYear(
                        request.getCategory(),
                        request.getPredictionYear() - 1
                );

        if (cutoffs.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No cutoff data found for year: " + (request.getPredictionYear() - 1)
            );
        }

        long higherCount = cutoffs.stream()
                .filter(c -> c.getCutoffMarks() > request.getTotalMarks())
                .count();

        int predictedRankMin = (int) (higherCount * 0.85);
        int predictedRankMax = (int) (higherCount * 1.15);

        List<KcetCollegePrediction> eligibleColleges = cutoffs.stream()
                .map(cutoff -> {
                    KcetCollegePrediction cp = new KcetCollegePrediction();
                    cp.setCollegeName(cutoff.getCollegeName());
                    cp.setBranchName(cutoff.getBranchName());
                    cp.setChance(calculateChance(
                            request.getTotalMarks(),
                            cutoff.getCutoffMarks()
                    ));
                    return cp;
                })
                .collect(Collectors.toList());

        KcetRankPrediction prediction = new KcetRankPrediction();
        prediction.setStudentId(request.getStudentId());
        prediction.setTotalMarks(request.getTotalMarks());
        prediction.setPredictedRankMin(predictedRankMin);
        prediction.setPredictedRankMax(predictedRankMax);
        prediction.setCategory(request.getCategory());
        prediction.setPredictionYear(request.getPredictionYear());
        prediction.setPredictedAt(LocalDateTime.now());
        prediction.setEligibleColleges(eligibleColleges);
        eligibleColleges.forEach(c -> c.setPrediction(prediction));

        return rankPredictionMapper.toResponseDTO(predictionRepository.save(prediction));
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

    private PredictionChance calculateChance(Double studentMarks, Double cutoffMarks) {
        double diff = studentMarks - cutoffMarks;
        if (diff >= 10) return PredictionChance.HIGH;
        if (diff >= 0)  return PredictionChance.MEDIUM;
        return PredictionChance.LOW;
    }
}