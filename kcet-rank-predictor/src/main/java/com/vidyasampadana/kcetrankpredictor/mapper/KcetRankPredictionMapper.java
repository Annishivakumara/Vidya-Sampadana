package com.vidyasampadana.kcetrankpredictor.mapper;

import com.vidyasampadana.kcetrankpredictor.dto.KcetRankPredictionResponseDTO;
import com.vidyasampadana.kcetrankpredictor.entity.KcetRankPrediction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {KcetCollegePredictionMapper.class})

public interface KcetRankPredictionMapper {

    KcetRankPredictionResponseDTO toResponseDTO(KcetRankPrediction entity);
}