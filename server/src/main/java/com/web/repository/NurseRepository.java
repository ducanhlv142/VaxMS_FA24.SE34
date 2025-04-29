package com.web.repository;

import com.web.entity.Nurse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NurseRepository extends JpaRepository<Nurse, Long> {
    @Query("SELECT n FROM Nurse n " +
            "WHERE (:q IS NULL OR LOWER(n.fullName) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(n.user.phoneNumber) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(n.user.email) LIKE LOWER(CONCAT('%', :q, '%')))")
    public Page<Nurse> getNurse(@Param("q") String q, Pageable pageable);
}
