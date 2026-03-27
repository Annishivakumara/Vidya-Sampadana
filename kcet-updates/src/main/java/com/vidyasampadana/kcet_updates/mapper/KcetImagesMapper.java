package com.vidyasampadana.kcet_updates.mapper;

import com.vidyasampadana.kcet_updates.dto.KcetImagesDTO;
import com.vidyasampadana.kcet_updates.entity.KcetImages;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.*;

@Mapper
public interface KcetImagesMapper {
    @Mapping(target = "imageId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt" , ignore = true)
    KcetImagesDTO toResponseDto(KcetImages entity);
    List<KcetImagesDTO> toListResponse(List<KcetImages> entityList);
}
