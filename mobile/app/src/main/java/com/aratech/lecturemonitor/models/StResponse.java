package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class StResponse {
    @SerializedName("status")
    @Expose
    private String status;

    @SerializedName("data")
    @Expose
    private Data data;

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

    public StResponse(String status, Data data) {
        this.status = status;
        this.data = data;
    }

    public StResponse() {
    }

    public class Data {
        @SerializedName("token")
        @Expose
        private String token;

        @SerializedName("student")
        @Expose
        private Student student;

        public Data(String token, Student student) {
            this.token = token;
            this.student = student;
        }

        public Data() {
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public Student getStudent() {
            return student;
        }

        public void setStudent(Student student) {
            this.student = student;
        }
    }
}
