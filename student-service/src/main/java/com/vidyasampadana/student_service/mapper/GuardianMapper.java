package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentGuardianInfoDTO;
import com.vidyasampadana.student_service.entity.StudentGuardianInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface GurdianMapper {
    StudentGuardianInfo toEntity(StudentGuardianInfoDTO dto);
    StudentGuardianInfoDTO toDto(StudentGuardianInfo entity);
    void updateFromDto(StudentGuardianInfoDTO dto, @MappingTarget StudentGuardianInfo entity);
}
