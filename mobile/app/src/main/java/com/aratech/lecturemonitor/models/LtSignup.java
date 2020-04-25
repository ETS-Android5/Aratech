package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LtSignup {
    @SerializedName("fName")
    @Expose
    private String fName;

    @SerializedName("lName")
    @Expose
    private String lName;

    @SerializedName("otherNames")
    @Expose
    private String otherNames;

    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("indexNo")
    @Expose
    private int indexNo;

    @SerializedName("department")
    @Expose
    private String course;

    @SerializedName("phoneNo")
    @Expose
    private String phoneNo;

    @SerializedName("password")
    @Expose
    private String password;

    public LtSignup() {
    }

    public LtSignup(String fName, String lName, String otherNames, String email, String course, String phoneNo, String password) {
        this.fName = fName;
        this.lName = lName;
        this.otherNames = otherNames;
        this.email = email;
        this.course = course;
        this.phoneNo = phoneNo;
        this.password = password;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getOtherNames() {
        return otherNames;
    }

    public void setOtherNames(String otherNames) {
        this.otherNames = otherNames;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
