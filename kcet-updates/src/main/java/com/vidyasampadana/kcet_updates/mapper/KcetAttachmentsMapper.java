package com.vidyasampadana.kcet_updates.mapper;

import com.vidyasampadana.kcet_updates.dto.KcetAttachmentsDTO;
import com.vidyasampadana.kcet_updates.entity.KcetAttachments;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface KcetAttachmentsMapper {
    @Mapping(target = "attachmentId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt" , ignore = true)
    KcetAttachmentsDTO toResponse(KcetAttachments entity);
    List<KcetAttachmentsDTO> toResponseList(KcetAttachments toentityList);
}
