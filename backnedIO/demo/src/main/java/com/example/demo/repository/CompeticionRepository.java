package com.example.demo.repository;

import com.example.demo.module.Competicion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompeticionRepository extends JpaRepository<Competicion,Integer> {
}
