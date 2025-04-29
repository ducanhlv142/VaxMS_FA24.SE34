package com.web.repository;

import com.web.dto.VaccineScheduleTimeResponse;
import com.web.entity.VaccineScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Set;

public interface VaccineScheduleTimeRepository extends JpaRepository<VaccineScheduleTime, Long> {

    @Query("select v from VaccineScheduleTime v where v.vaccineSchedule.id = ?1")
    public List<VaccineScheduleTime> findByVaccineSchedule(Long vaccineSchedule);

    @Query("select v.injectDate from VaccineScheduleTime v where v.vaccineSchedule.id = ?1 and v.injectDate >= ?2  order by v.injectDate asc")
    public Set<Date> findDateByVaccineSchedule(Long vaccineSchedule, Date date);

    @Query("select sum(v.limitPeople) from VaccineScheduleTime v where v.vaccineSchedule.id = ?1")
    public Long quantityBySchedule(Long scheduleId);

    @Query(value = "select vt.id, vt.inject_date as injectDate, vt.start, vt.end, vt.limit_people as limitPeople,\n" +
            "(select count(cs.id) from customer_schedule cs where cs.vaccine_schedule_time_id = vt.id and cs.status != 'cancelled') as quantity\n" +
            "from vaccine_schedule_time vt where vt.vaccine_schedule_id = ?1 and vt.inject_date = ?2", nativeQuery = true)
    List<VaccineScheduleTimeResponse> findTimeBySchedule(Long idSchedule, Date date);
    VaccineScheduleTime findFirstByVaccineScheduleId(Long idSchedule);
    List<VaccineScheduleTime> findAllByVaccineScheduleId(Long vaccineScheduleId);

}
