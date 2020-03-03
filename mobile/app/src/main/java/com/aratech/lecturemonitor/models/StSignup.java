package com.aratech.lecturemonitor.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class StSignup {
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
    private String department;

    @SerializedName("phoneNo")
    @Expose
    private String phoneNo;

    @SerializedName("password")
    @Expose
    private String password;

    public StSignup() {
    }

    public StSignup(String fName, String lName, String otherNames, String email, int indexNo, String department, String phoneNo, String password) {
        this.fName = fName;
        this.lName = lName;
        this.otherNames = otherNames;
        this.email = email;
        this.indexNo = indexNo;
        this.department = department;
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

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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
