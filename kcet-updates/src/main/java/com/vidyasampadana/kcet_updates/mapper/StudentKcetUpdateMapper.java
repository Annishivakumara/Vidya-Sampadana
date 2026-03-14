package com.vidyasampadana.kcet_updates.mapper;

import com.vidyasampadana.kcet_updates.dto.KcetupdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface StudentKcetUpdateMapper {
    @Mapping(source = "KcetImages", target = "KcetImagesMapper")
    @Mapping(source = "KcetVideos" , target="KcetVideosMapper")
    @Mapping(source = "KcetAttachments"  , target="KcetAttachmentsMapper")
    @Mapping(source = "KcetUpdateTags"  , target = "KcetUpdatesTagsMapper")
    KcetupdatesResponseDTO toResponseDTO(Kcetupdates entity);
    List<KcetupdatesResponseDTO>  toListResponse(List<Kcetupdates> tntity);
}
