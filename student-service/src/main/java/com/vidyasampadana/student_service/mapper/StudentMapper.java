package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import com.vidyasampadana.student_service.entity.Students;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {
        ParentMapper.class,
        ExamScoreMapper.class,
        ContactMapper.class,
        AddressMapper.class,
        AcademicMapper.class
})
public interface StudentMapper {
    @Mapping(source = "contactInfoDTO", target = "contactInfo")
    @Mapping(source = "academicProfileDTO", target = "academicProfile")
    @Mapping(source = "parentInfoDTO", target = "studentParentInfo")
    @Mapping(source = "studentAddressInfoDTO", target = "studentAddressInfo")
    @Mapping(source = "examScoresDTO", target = "studentExamScores")
    Students toEntity(StudentRequestDTO dto);

    @Mapping(source = "contactInfo", target = "contactInfoDTO")
    @Mapping(source = "academicProfile", target = "academicProfileDTO")
    @Mapping(source = "studentParentInfo", target = "parentInfoDTO")
    @Mapping(source = "studentAddressInfo", target = "studentAddressInfoDTO")
    @Mapping(source = "studentExamScores", target = "examScoresDTO")
    StudentResponseDTO toDTO(Students entity);

    // Update existing entity
    @Mapping(source = "contactInfoDTO", target = "contactInfo")
    @Mapping(source = "academicProfileDTO", target = "academicProfile")
    @Mapping(source = "parentInfoDTO", target = "studentParentInfo")
    @Mapping(source = "studentAddressInfoDTO", target = "studentAddressInfo")
    @Mapping(source = "examScoresDTO", target = "studentExamScores")
    void updateStudentFromDto(StudentRequestDTO dto, @MappingTarget Students entity);
}
