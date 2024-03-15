package com.example.backend.task;

import com.example.backend.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Service
@RestController
@RequestMapping(path = "api/task")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskService {
    @Autowired
    TaskRepo repo;
    @Autowired
    public TaskService(TaskRepo repo) {
        this.repo = repo;
    }
    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = repo.findAll();
        return ResponseEntity.ok().body(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(@PathVariable(value = "id") Long id) {
        Optional<Task> task = repo.findById(id);
        if(task == null) {
            return ResponseEntity.notFound().build();
        }
            return ResponseEntity.ok().body(task);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        try {
            Task createdTask = repo.save(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating the task.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTaskByID(@RequestBody Task modifiedTask, @PathVariable(value = "id") Long id) {
        Optional<Task> optionalTask = repo.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setContent(modifiedTask.getContent()); // Update content
            repo.save(existingTask);
            return ResponseEntity.ok(existingTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Task>> removeTask(@PathVariable(value = "id") Long id) {
        Optional<Task> task = repo.findById(id);
        if(task.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        else {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
    }
}
