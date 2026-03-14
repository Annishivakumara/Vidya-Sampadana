package com.vidyasampadana.kcet_updates.mapper;

import com.vidyasampadana.kcet_updates.dto.KcetUpdateTagsDTO;
import com.vidyasampadana.kcet_updates.entity.KcetUpdateTags;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.lang.annotation.Target;
import java.util.List;

@Mapper
public interface KcetUpdatesTagsMapper {
    @Mapping(target = "updateTagId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt" , ignore = true)
    KcetUpdateTagsDTO toResponse(KcetUpdateTags  enityt);
    @Mapping(target = "updateTagId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt" , ignore = true)
    List<KcetUpdateTagsDTO> toResponseList(List<KcetUpdateTags> entityList);
}
