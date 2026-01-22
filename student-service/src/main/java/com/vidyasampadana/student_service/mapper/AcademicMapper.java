package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentAcademicProfileDTO;
import com.vidyasampadana.student_service.entity.StudentAcademicProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AcademicMapper {
    StudentAcademicProfile toEntity(StudentAcademicProfileDTO dto);
    StudentAcademicProfileDTO toDto(StudentAcademicProfile entity);
    void  updateFromDto(StudentAcademicProfileDTO dto, @MappingTarget StudentAcademicProfile entity);
}
