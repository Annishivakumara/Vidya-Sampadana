package com.vidyasampadana.student_service.controller;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import com.vidyasampadana.student_service.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@Tag(name = "Student Management", description = "APIs for managing students")
public class StudentController {

    private  final StudentService studentService;

    @PostMapping("/add")
    @Operation(summary = "student Created ")
    public ResponseEntity<StudentResponseDTO> createStudent(@Valid @RequestBody studentRequestDTO requestDTO){
        StudentResponseDTO responsedto=studentService.createStudent(requestDTO);
        return  new ResponseEntity<>(responsedto , HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "getting All Students ")
    public ResponseEntity<List<StudentResponseDTO>> getAllStudent(){
        List<StudentResponseDTO> responsedtos= studentService.getAllStudents();
        return ResponseEntity.ok(responsedtos);
    }

    @GetMapping("/{studentId}")
    public  ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable  String studentId){
        StudentResponseDTO responsedto=studentService.getStudentByStudentId(studentId);
        return  ResponseEntity.ok(responsedto);
    }

    @PutMapping("/{studentId}")
    public  ResponseEntity<StudentResponseDTO> updateStudent(@Valid @RequestBody studentRequestDTO requestDTO , @PathVariable String studentId){
        StudentResponseDTO studentResponsedto= studentService.updateStudentByStudentId(studentId, requestDTO);
        return ResponseEntity.ok(studentResponsedto);
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deletestudent(@PathVariable String studentId){
        studentService.deleteStudentByStudentId(studentId);
        return ResponseEntity.noContent().build();
    }
}
