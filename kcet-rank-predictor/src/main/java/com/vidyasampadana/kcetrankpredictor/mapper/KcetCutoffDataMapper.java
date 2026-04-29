package com.vidyasampadana.kcetrankpredictor.mapper;

import com.vidyasampadana.kcetrankpredictor.dto.KcetCutoffDataRequestDTO;
import com.vidyasampadana.kcetrankpredictor.dto.KcetCutoffDataResponseDTO;
import com.vidyasampadana.kcetrankpredictor.entity.KcetCutoffData;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface KcetCutoffDataMapper {

    @Mapping(target = "id", ignore = true)
    KcetCutoffData toEntity(KcetCutoffDataRequestDTO dto);

    KcetCutoffDataResponseDTO toResponseDTO(KcetCutoffData entity);
}