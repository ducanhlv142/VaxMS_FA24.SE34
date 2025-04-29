package com.web.repository;

import com.web.entity.VaccineScheduleDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;

public interface VaccineScheduleDoctorRepository extends JpaRepository<VaccineScheduleDoctor, Long> {

    @Modifying
    @Transactional
    @Query("delete from VaccineScheduleDoctor p where p.vaccineSchedule.id = ?1 and p.injectDate = ?2")
    int deleteByVaccineSchedule(Long vaccineScheduleId, Date date);

    @Query("select v from VaccineScheduleDoctor v where v.vaccineSchedule.id = ?1")
    List<VaccineScheduleDoctor> findBySchedule(Long vaccineScheduleId);
}
