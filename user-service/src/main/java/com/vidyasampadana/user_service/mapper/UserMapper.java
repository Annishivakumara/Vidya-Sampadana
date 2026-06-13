package com.vidyasampadana.user_service.mapper;


import com.vidyasampadana.user_service.dto.AdminResponseDto;
import com.vidyasampadana.user_service.dto.StudentResponseDto;
import com.vidyasampadana.user_service.dto.UserResponseDto;
import com.vidyasampadana.user_service.dto.VolunteerResponseDto;
import com.vidyasampadana.user_service.entity.Admin;
import com.vidyasampadana.user_service.entity.Student;
import com.vidyasampadana.user_service.entity.User;
import com.vidyasampadana.user_service.entity.Volunteer;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDto toDto(User user) {
        if (user == null) {
            return null;
        }

        if (user instanceof Student student) {
            StudentResponseDto dto = new StudentResponseDto();
            mapCommonFields(student, dto, "STUDENT");
            dto.setInstitutionName(student.getInstitutionName());
            return dto;
        }

        if (user instanceof Volunteer volunteer) {
            VolunteerResponseDto dto = new VolunteerResponseDto();
            mapCommonFields(volunteer, dto, "VOLUNTEER");
            dto.setExpertise(volunteer.getExpertise());
            return dto;
        }

        if (user instanceof Admin admin) {
            AdminResponseDto dto = new AdminResponseDto();
            mapCommonFields(admin, dto, "ADMIN");
            return dto;
        }

        throw new IllegalArgumentException("Unknown user type: " + user.getClass().getName());
    }

    private void mapCommonFields(User source, UserResponseDto target, String role) {
        target.setId(source.getId());
        target.setName(source.getName());
        target.setEmail(source.getEmail());
        target.setRole(role);
    }
}