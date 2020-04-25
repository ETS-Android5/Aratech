package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class StdLogin {
    @SerializedName("indexNo")
    @Expose
    private int indexNo;

    @SerializedName("password")
    @Expose
    private String password;

    public StdLogin(int indexNo, String password) {
        this.indexNo = indexNo;
        this.password = password;
    }

    public StdLogin() {
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
