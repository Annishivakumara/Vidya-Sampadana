package com.vidyasampadana.student_service.controller;

import com.vidyasampadana.student_service.entity.Students;
import com.vidyasampadana.student_service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Add Student
    @PostMapping
    public ResponseEntity<Students> createStudent(@RequestBody Students student) {
        Students createdStudent = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdStudent);
    }

    // Get All Students
    @GetMapping
    public ResponseEntity<List<Students>> getAllStudents() {
        List<Students> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    //Read By Id
    @GetMapping("/{id}")
    public ResponseEntity<Students> getStudentById(@PathVariable Long id){
          Students student= studentService.getStudentById(id);
          return ResponseEntity.ok(student);
    }

    //Update Student
    @PutMapping("/{id}")
    public ResponseEntity<Students> updateStudent(@PathVariable Long id, @RequestBody Students updateStudent) {
        Students student = studentService.updateStudent(id, updateStudent);
        return ResponseEntity.ok(student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student Deleted Successfully");
    }
}
