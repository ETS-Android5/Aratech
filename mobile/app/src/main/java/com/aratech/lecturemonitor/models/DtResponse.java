package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DtResponse {
    @SerializedName("status")
    @Expose
    private String status;

    @SerializedName("data")
    @Expose
    private Data data;

    public DtResponse(String status, Data data) {
        this.status = status;
        this.data = data;
    }

    public DtResponse() {
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

    public class Data {
        @SerializedName("departments")
        @Expose
        private List<Department> departments;

        public Data() {
        }

        public Data(List<Department> departments) {
            this.departments = departments;
        }

        public List<Department> getDepartments() {
            return departments;
        }

        public void setDepartments(List<Department> departments) {
            this.departments = departments;
        }
    }
}
