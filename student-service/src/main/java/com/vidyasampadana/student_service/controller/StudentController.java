package com.vidyasampadana.student_service.controller;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.studentResponsedto;
import com.vidyasampadana.student_service.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private  final StudentService studentService;

    @PostMapping
    @Operation(summary = "student Created ")
    public ResponseEntity<studentResponsedto> createStudent(@Valid @RequestBody studentRequestDTO requestDTO){
        studentResponsedto responsedto=studentService.createStudent(requestDTO);
        return  new ResponseEntity<>(responsedto , HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "getting All Students ")
    public ResponseEntity<List<studentResponsedto>> getAllStudent(){
        List<studentResponsedto> responsedtos= studentService.getAllStudents();
        return ResponseEntity.ok(responsedtos);
    }

    @GetMapping("/{studentId}")
   public  ResponseEntity<studentResponsedto> getStudentById(@PathVariable  String userId){
        studentResponsedto responsedto=studentService.getStudentByUserId(userId);
        return  ResponseEntity.ok(responsedto);
   }

   @PutMapping("/{studentId}")
   public  ResponseEntity<studentResponsedto> updateStudent(@Valid @RequestBody studentRequestDTO requestDTO , @PathVariable String userId){
        studentResponsedto studentResponsedto= studentService.updateStudentByUserId(userId, requestDTO);
        return ResponseEntity.ok(studentResponsedto);
   }

   @DeleteMapping("/{studentId}")
   public ResponseEntity<Void> deletestudent(@PathVariable String userId){
        studentService.deleteStudentByUserId(userId);
        return ResponseEntity.noContent().build();
   }
}
