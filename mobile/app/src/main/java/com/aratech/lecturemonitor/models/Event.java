package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Event {
    @SerializedName("eventName")
    @Expose
    private String eventName;

    @SerializedName("startTime")
    @Expose
    private String startTime;

    @SerializedName("endTIme")
    @Expose
    private String endTime;

    @SerializedName("repeatDaily")
    @Expose
    private boolean repeatDaily;

    @SerializedName("repeatWeekly")
    @Expose
    private boolean RepeatWeekly;

    public Event() {
    }

    public Event(String eventName, String startTime, String endTime, boolean repeatDaily, boolean repeatWeekly) {
        this.eventName = eventName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeatDaily = repeatDaily;
        RepeatWeekly = repeatWeekly;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public boolean isRepeatDaily() {
        return repeatDaily;
    }

    public void setRepeatDaily(boolean repeatDaily) {
        this.repeatDaily = repeatDaily;
    }

    public boolean isRepeatWeekly() {
        return RepeatWeekly;
    }

    public void setRepeatWeekly(boolean repeatWeekly) {
        RepeatWeekly = repeatWeekly;
    }
}
