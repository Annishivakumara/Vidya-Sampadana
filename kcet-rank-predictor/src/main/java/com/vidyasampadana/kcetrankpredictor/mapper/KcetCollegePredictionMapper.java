package com.vidyasampadana.kcetrankpredictor.mapper;

import com.vidyasampadana.kcetrankpredictor.dto.KcetCollegePredictionDTO;
import com.vidyasampadana.kcetrankpredictor.entity.KcetCollegePrediction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface KcetCollegePredictionMapper {

    KcetCollegePredictionDTO toDTO(KcetCollegePrediction entity);
}