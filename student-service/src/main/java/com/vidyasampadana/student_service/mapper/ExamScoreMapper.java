package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentExamScoresDTO;
import com.vidyasampadana.student_service.entity.StudentExamScores;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ExamScoreMapper {

    @Mapping(target = "examId", ignore = true)
    @Mapping(target = "percentage", ignore = true)
    StudentExamScores toEntity(StudentExamScoresDTO dto);

    StudentExamScoresDTO toDto(StudentExamScores entity);

    @Mapping(target = "examId", ignore = true)
    @Mapping(target = "percentage", ignore = true)
    void updateFromDto(StudentExamScoresDTO dto, @MappingTarget StudentExamScores entity);
}