package com.vidyasampadana.kcet_updates.mapper;

import com.vidyasampadana.kcet_updates.dto.KcetVideosDto;
import com.vidyasampadana.kcet_updates.entity.KcetVideos;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface KcetVideosMapper {
    @Mapping(target = "videoId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt" , ignore = true)
    KcetVideosDto toResponseDto(KcetVideos entity);
    List<KcetVideosDto> toResponseList(List<KcetVideos> entityList);
}
