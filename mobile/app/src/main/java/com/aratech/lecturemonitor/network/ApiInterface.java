package com.aratech.lecturemonitor.network;

import com.aratech.lecturemonitor.models.DtResponse;
import com.aratech.lecturemonitor.models.LtResponse;
import com.aratech.lecturemonitor.models.StResponse;
import com.aratech.lecturemonitor.models.StSignup;
import com.aratech.lecturemonitor.models.StdLogin;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiInterface {
    //get all departments
    @GET("departments")
    Call<DtResponse> getAllDepartments();

    //login student
    @POST("auth/students/login")
    Call<StResponse> loginStudent(@Body StdLogin stdLogin);

    //register student
    @POST("auth/students/register")
    Call<StResponse> registerStudent(@Body StSignup stSignup);

    //login lecturer
    @POST("auth/lecturers/login")
    Call<LtResponse> loginLecturer();

    //register lecturer
    @POST("auth/lecturers/register")
    Call<LtResponse> registerLecturer();
}
