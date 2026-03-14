package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentMotherInfoDTO;
import com.vidyasampadana.student_service.entity.StudentMotherInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel =  "spring")
public interface MotherMapper {
    StudentMotherInfo toEntity(StudentMotherInfoDTO dto);
    StudentMotherInfoDTO toDto(StudentMotherInfo entity);
    void updateFromDto(StudentMotherInfoDTO dto, @MappingTarget StudentMotherInfo entity);
}
