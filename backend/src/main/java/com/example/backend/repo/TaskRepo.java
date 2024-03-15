package com.example.backend.repo;

import com.example.backend.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface TaskRepo extends JpaRepository<Task,Long> {

}
