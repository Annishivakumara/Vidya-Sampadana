package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentContactInfoDTO;
import com.vidyasampadana.student_service.dto.StudentExamScoresDTO;
import com.vidyasampadana.student_service.entity.StudentContactInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    @Mapping(target = "studentContId", ignore = true)
    @Mapping(target = "fullName", ignore = true)
    StudentContactInfo toEntity(StudentContactInfoDTO dto);

    StudentContactInfoDTO toDto(StudentContactInfo entity);

    @Mapping(target = "studentContId", ignore = true)
    @Mapping(target = "fullName", ignore = true)
    void updateFromDto(StudentContactInfoDTO dto, @MappingTarget StudentContactInfo entity);
}