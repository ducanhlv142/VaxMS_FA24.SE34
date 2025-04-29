package com.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;
import java.sql.Time;

public interface VaccineScheduleTimeResponse {

    Long getId();

    Date getInjectDate();

    Time getStart();

    Time getEnd();

    Integer getLimitPeople();

    Integer getQuantity();
}
