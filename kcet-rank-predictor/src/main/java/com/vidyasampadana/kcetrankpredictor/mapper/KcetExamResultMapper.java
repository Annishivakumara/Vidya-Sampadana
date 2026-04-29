package com.vidyasampadana.kcetrankpredictor.mapper;

import com.vidyasampadana.kcetrankpredictor.dto.KcetExamResultRequestDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetExamResultResponseDTO;
import com.vidyasampadana.kcetrankpredictor.entity.KcetExamResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface KcetExamResultMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "totalMarks", ignore = true)  // calculated manually
    @Mapping(target = "createdAt", ignore = true)
    KcetExamResult toEntity(KcetExamResultRequestDTO dto);

    KcetExamResultResponseDTO toResponseDTO(KcetExamResult entity);
}