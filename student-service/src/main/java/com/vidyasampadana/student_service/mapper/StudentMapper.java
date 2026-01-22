package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.studentResponsedto;
import com.vidyasampadana.student_service.entity.Students;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {
        ParentMapper.class,
        ExamScoreMapper.class,
        ContactMapper.class,
        AddressMapper.class,
        AcademicMapper.class
})
public interface StudentMapper {
    Students toEntity(studentRequestDTO dto);
    studentResponsedto toDTO(Students entity);
    void updateStudentFromDto(studentRequestDTO dto, @MappingTarget Students entity);
}
