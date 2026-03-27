package com.vidyasampadana.kcet_updates.mapper;


import com.vidyasampadana.kcet_updates.dto.KcetUpdatesRequestDTO;
import com.vidyasampadana.kcet_updates.dto.KcetUpdatesResponseDTO;
import com.vidyasampadana.kcet_updates.entity.Kcetupdates;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface AdminKcetUpdateMapper {
    @Mapping(source = " KcetImagesMapper", target = "KcetImages")
    @Mapping(source = "KcetVideosMapper" , target="KcetVideos")
    @Mapping(source = "KcetAttachmentsMapper"  , target="KcetAttachments")
    @Mapping(source = "KcetUpdatesTagsMapper"  , target = "KcetUpdateTags")
    Kcetupdates toEntity(KcetUpdatesRequestDTO dto);
    @Mapping(source = "KcetImages", target = "KcetImagesMapper")
    @Mapping(source = "KcetVideos" , target="KcetVideosMapper")
    @Mapping(source = "KcetAttachments"  , target="KcetAttachmentsMapper")
    @Mapping(source = "KcetUpdateTags"  , target = "KcetUpdatesTagsMapper")
    KcetUpdatesResponseDTO toResponseDto(Kcetupdates entity);
    List<KcetUpdatesResponseDTO> toResponseDtoList(List<Kcetupdates> entities);
}
// Stoped here to Converting the Admin updateds  into dto's
//start working on this  later Mapping it to other