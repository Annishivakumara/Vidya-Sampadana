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
<<<<<<< HEAD
    @Mapping(source = "contactInfoDTO", target = "contactInfo")
    @Mapping(source = "academicProfileDTO", target = "academicProfile")
    @Mapping(source = "parentInfoDTO", target = "studentParentInfo")
    @Mapping(source = "studentAddressInfoDTO", target = "studentAddressInfo")
    @Mapping(source = "examScoresDTO", target = "studentExamScores")
    Students toEntity(StudentRequestDTO dto);
=======
>>>>>>> sub_me/main

    @Mapping(target = "id",              ignore = true)
    @Mapping(target = "studentId",       ignore = true)
    @Mapping(source = "contactInfo",     target = "contactInfo")
    @Mapping(source = "academicProfile", target = "academicProfile")
    @Mapping(source = "parentInfo",      target = "studentParentInfo")
    @Mapping(source = "addressList",     target = "addressList")
    @Mapping(source = "examScores",      target = "examScores")
    Students toEntity(StudentRequestDTO dto);

    @Mapping(source = "contactInfo",       target = "contactInfo")
    @Mapping(source = "academicProfile",   target = "academicProfile")
    @Mapping(source = "studentParentInfo", target = "parentInfo")
    @Mapping(source = "addressList",       target = "addressList")
    @Mapping(source = "examScores",        target = "examScores")
    StudentResponseDTO toDTO(Students entity);

<<<<<<< HEAD
    // Update existing entity
    @Mapping(source = "contactInfoDTO", target = "contactInfo")
    @Mapping(source = "academicProfileDTO", target = "academicProfile")
    @Mapping(source = "parentInfoDTO", target = "studentParentInfo")
    @Mapping(source = "studentAddressInfoDTO", target = "studentAddressInfo")
    @Mapping(source = "examScoresDTO", target = "studentExamScores")
    void updateStudentFromDto(StudentRequestDTO dto, @MappingTarget Students entity);
}
=======
    @Mapping(target = "id",              ignore = true)
    @Mapping(target = "studentId",       ignore = true)
    @Mapping(source = "contactInfo",     target = "contactInfo")
    @Mapping(source = "academicProfile", target = "academicProfile")
    @Mapping(source = "parentInfo",      target = "studentParentInfo")
    @Mapping(source = "addressList",     target = "addressList")
    @Mapping(source = "examScores",      target = "examScores")
    void updateStudentFromDto(StudentRequestDTO dto, @MappingTarget Students entity);
}
>>>>>>> sub_me/main
