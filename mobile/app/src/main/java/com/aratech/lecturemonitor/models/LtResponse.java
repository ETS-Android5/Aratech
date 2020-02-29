package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LtResponse {
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

    public LtResponse(String status, Data data) {
        this.status = status;
        this.data = data;
    }

    public LtResponse() {
    }

    public class Data {
        @SerializedName("token")
        @Expose
        private String token;

        @SerializedName("lecturer")
        @Expose
        private Lecturer lecturer;

        public Data(String token, Lecturer lecturer) {
            this.token = token;
            this.lecturer = lecturer;
        }

        public Data() {
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public Lecturer getLecturer() {
            return lecturer;
        }

        public void setLecturer(Lecturer lecturer) {
            this.lecturer = lecturer;
        }
    }
}
