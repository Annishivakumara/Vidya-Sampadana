package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentFatherInfoDTO;
import com.vidyasampadana.student_service.entity.StudentFatherInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FatherMapper {
    StudentFatherInfo toEntity(StudentFatherInfoDTO dto);
    StudentFatherInfoDTO toDto(StudentFatherInfo entity);
    void updateFromDto(StudentFatherInfoDTO dto, @MappingTarget StudentFatherInfo entity);
}
