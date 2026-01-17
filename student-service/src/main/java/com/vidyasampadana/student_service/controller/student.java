package com.vidyasampadana.student_service.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@Tag(name = "student management" , description = "student personal and Educatinal details ")
public class student {

}
