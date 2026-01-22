package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentContactInfoDTO;
import com.vidyasampadana.student_service.dto.StudentExamScoresDTO;
import com.vidyasampadana.student_service.entity.StudentContactInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ContactMapper {
    StudentContactInfo toEntity(StudentContactInfoDTO dto);
    StudentContactInfoDTO toDto(StudentContactInfo entity);
    void updateFromDto(StudentContactInfoDTO dto, @MappingTarget StudentContactInfo entity);
}
