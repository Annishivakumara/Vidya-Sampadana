package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentGuardianInfoDTO;
import com.vidyasampadana.student_service.entity.StudentGuardianInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

// FIX: Removed all explicit @Mapping annotations for isPrimaryContact/isEmergencyContact
//      Now that StudentGuardianInfo has both fields correctly defined with Lombok,
//      MapStruct auto-maps them by name without any @Mapping needed.
//      Adding wrong @Mapping targets was causing the errors — clean mapper is safer.

@Mapper(componentModel = "spring")
public interface GuardianMapper {
    StudentGuardianInfo toEntity(StudentGuardianInfoDTO dto);
    StudentGuardianInfoDTO toDto(StudentGuardianInfo entity);
    void updateFromDto(StudentGuardianInfoDTO dto, @MappingTarget StudentGuardianInfo entity);
}