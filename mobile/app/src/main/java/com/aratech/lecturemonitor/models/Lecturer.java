package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Lecturer {
    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("fName")
    @Expose
    private String fName;

    @SerializedName("lName")
    @Expose
    private String lName;

    @SerializedName("otherNames")
    @Expose
    private String otherNames;

    @SerializedName("courses")
    @Expose
    private List<String> courses;

    @SerializedName("phoneNo")
    @Expose
    private String phoneNo;

    @SerializedName("password")
    @Expose
    private String password;

    @SerializedName("isEmailVerified")
    @Expose
    private boolean isEmailVerified;

    public Lecturer(String email, String phoneNo, String fName, String lName, String otherNames, List<String> courses, String password, boolean isEmailVerified) {
        this.email = email;
        this.phoneNo = phoneNo;
        this.fName = fName;
        this.lName = lName;
        this.otherNames = otherNames;
        this.courses = courses;
        this.password = password;
        this.isEmailVerified = isEmailVerified;
    }

    public Lecturer() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoneNo(){
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEmailVerified() {
        return isEmailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        isEmailVerified = emailVerified;
    }
}
