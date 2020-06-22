package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ClassTimeTable {
    
    @SerializedName('programme')
    @Expose
    private String programme;

    @SerializedName('events')
    @Expose
    private List<Event> events;

    public ClassTimeTable() {}

    public PersonalTimeTable(String programme, List<Event> events) {
        this.programme = programme;
        this.events = events;
    }

    private void setProgramme(String programme) {
        this.programme = programme;
    }

    private String getProgramme() {
        return programme;
    }

    private void setEvents(List<Event> events) {
        this.events = events;
    }

    private List<Events> getEvents() {
        return events;
    }

}