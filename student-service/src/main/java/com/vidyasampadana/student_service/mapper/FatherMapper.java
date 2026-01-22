package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentFatherInfoDTO;
import com.vidyasampadana.student_service.entity.StudentFatherInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FatherMapper {
    StudentFatherInfo toEntity(StudentFatherInfoDTO dto);  // dto converting to Entity
    StudentFatherInfoDTO toDto(StudentFatherInfo entity); // entity conveting to dto
    void updateFromDto(StudentFatherInfoDTO dto, @MappingTarget StudentFatherInfo entity);
}
