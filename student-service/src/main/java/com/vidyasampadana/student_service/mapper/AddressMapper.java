package com.vidyasampadana.student_service.mapper;

import com.vidyasampadana.student_service.dto.StudentAddressInfoDTO;
import com.vidyasampadana.student_service.entity.StudentAddressInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mapping(target = "addressId", ignore = true)
    StudentAddressInfo toEntity(StudentAddressInfoDTO dto);

    StudentAddressInfoDTO toDto(StudentAddressInfo entity);
    @Mapping(target = "addressId", ignore = true)
    void updateFromDto(StudentAddressInfoDTO dto, @MappingTarget StudentAddressInfo entity);
}
