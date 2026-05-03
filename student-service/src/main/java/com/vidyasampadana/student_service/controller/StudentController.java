package com.vidyasampadana.student_service.controller;

import com.vidyasampadana.student_service.dto.StudentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import com.vidyasampadana.student_service.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
<<<<<<< HEAD
import lombok.AllArgsConstructor;
=======
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.AllArgsConstructor;
import org.springframework.data.web.PageableDefault;
>>>>>>> sub_me/main
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5500")
@Tag(name = "Student Management", description = "APIs for managing students")
public class StudentController {

    private  final StudentService studentService;

    @PostMapping("/add")
    @Operation(summary = "student Created ")
    public ResponseEntity<StudentResponseDTO> createStudent(@Valid @RequestBody StudentRequestDTO requestDTO){
        StudentResponseDTO responsedto=studentService.createStudent(requestDTO);
        return  new ResponseEntity<>(responsedto , HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all students (paginated)")
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudents(
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<StudentResponseDTO> responsePage = studentService.getAllStudents(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/search")
    @Operation(summary = "Search students by first name")
    public ResponseEntity<Page<StudentResponseDTO>> getStudentsByName(
            @RequestParam String name,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<StudentResponseDTO> responsePage = studentService.getStudentsByName(name, pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/{studentId}")
    public  ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable  String studentId){
        StudentResponseDTO responsedto=studentService.getStudentByStudentId(studentId);
        return  ResponseEntity.ok(responsedto);
    }

    @PutMapping("/{studentId}")
    public  ResponseEntity<StudentResponseDTO> updateStudent(@Valid @RequestBody StudentRequestDTO requestDTO , @PathVariable String studentId){
        StudentResponseDTO studentResponsedto= studentService.updateStudentByStudentId(studentId, requestDTO);
        return ResponseEntity.ok(studentResponsedto);
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId){
        studentService.deleteStudentByStudentId(studentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    @Operation(summary = "Get total number of students")
    public ResponseEntity<Long> countStudents() {
        return ResponseEntity.ok(studentService.countStudents());
    }
}
