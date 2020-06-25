package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class PersonalTimeTable {
    
    @SerializedName("userId")
    @Expose
    private String userId;

    @SerializedName("events")
    @Expose
    private List<Event> events;

    public PersonalTimeTable() {}

    public PersonalTimeTable(String userId, List<Event> events) {
        this.userId = userId;
        this.events = events;
    }

    private void setUserId(String userId) {
        this.userId = userId;
    }

    private String getUserId() {
        return userId;
    }

    private void setEvents(List<Event> events) {
        this.events = events;
    }

    private List<Event> getEvents() {
        return events;
    }

}