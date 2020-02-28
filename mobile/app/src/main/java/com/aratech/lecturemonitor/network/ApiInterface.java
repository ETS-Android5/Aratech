package com.aratech.lecturemonitor.network;

import com.aratech.lecturemonitor.models.DtResponse;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiInterface {
    //get all departments
    @GET("departments")
    Call<DtResponse> getAllDepartments();
}
