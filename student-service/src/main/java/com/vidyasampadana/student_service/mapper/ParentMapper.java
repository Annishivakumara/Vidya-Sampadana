package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentParentInfoDTO;
import com.vidyasampadana.student_service.entity.StudentParentInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring" , uses = {
        FatherMapper.class,
        MotherMapper.class,
        GurdianMapper.class
})
public interface ParentMapper {
   StudentParentInfo toEntity(StudentParentInfoDTO dto);
   StudentParentInfoDTO toDto(StudentParentInfo entity);
   void updateFromDto(StudentParentInfoDTO dto, @MappingTarget StudentParentInfo entity);
}
