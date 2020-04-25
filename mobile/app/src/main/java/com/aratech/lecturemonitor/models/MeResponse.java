package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class MeResponse {

    public MeResponse() {

    }

    public MeResponse(String status, Data data) {
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    @SerializedName("status")
    @Expose
    private String status;

    @SerializedName("data")
    @Expose
    private Data data;

    public class Data {

        public Data() {
        }

        public Data(Student student, Lecturer lecturer) {
            this.student = student;
            this.lecturer = lecturer;
        }

        @SerializedName("student")
        @Expose
        private Student student;

        @SerializedName("lecturer")
        @Expose
        private Lecturer lecturer;


        public Student getStudent() {
            return student;
        }

        public void setStudent(Student student) {
            this.student = student;
        }

        public Lecturer getLecturer() {
            return lecturer;
        }

        public void setLecturer(Lecturer lecturer) {
            this.lecturer = lecturer;
        }
    }
}
