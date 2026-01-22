package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentExamScoresDTO;
import com.vidyasampadana.student_service.entity.StudentExamScores;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ExamScoreMapper {
    StudentExamScores toEntity(StudentExamScoresDTO dto);
    StudentExamScoresDTO toDto(StudentExamScores entity);
    void updateFromDto(StudentExamScoresDTO dto, @MappingTarget StudentExamScores entity);
}
