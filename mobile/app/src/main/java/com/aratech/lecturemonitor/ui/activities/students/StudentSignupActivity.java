package com.aratech.lecturemonitor.ui.activities.students;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.models.Department;
import com.aratech.lecturemonitor.models.DtResponse;
import com.aratech.lecturemonitor.network.ApiClient;
import com.aratech.lecturemonitor.network.ApiInterface;
import com.isapanah.awesomespinner.AwesomeSpinner;

import java.util.ArrayList;
import java.util.List;

public class StudentSignupActivity extends AppCompatActivity implements View.OnClickListener {
    private EditText fNameEdt, lNameEdt, emailEdt, idEdt, mobileEdt, passwordEdt, confirmPasswordEdt;
    private AwesomeSpinner departmentsSpinner;
    private ScrollView scrollView;
    private RelativeLayout relativeLayout;
    private ProgressBar loader;
    private ImageView slideLogin;
    private TextView gotoLogin;
    private List<String> departmentIds = new ArrayList<>();
    private List<String> departmentNames = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_signup);

        //initialize ui elements
        initUI();

        //hide the main layout and show the loader
        loader.setVisibility(View.VISIBLE);
        relativeLayout.setBackgroundColor(Color.WHITE);
        scrollView.setVisibility(View.GONE);

        //create the api interface
        ApiInterface apiService = ApiClient.getClient().create(ApiInterface.class);

        //make http call to get all departments
        Call<DtResponse> call = apiService.getAllDepartments();
        call.enqueue(new Callback<DtResponse>() {
            @Override
            public void onResponse(@NonNull Call<DtResponse> call, @NonNull Response<DtResponse> response) {
                if(response.isSuccessful()){
                    DtResponse dtResponse = response.body();
                    assert dtResponse != null;
                    List<Department> departments = dtResponse.getData().getDepartments();
                    for (Department department: departments){
                        departmentIds.add(department.getId());
                        departmentNames.add(department.getName());
                    }

                    //create an array adapter for the department spinner
                    ArrayAdapter<String> departmentAdapter = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_item, departmentNames);
                    departmentsSpinner.setAdapter(departmentAdapter);
                    loader.setVisibility(View.GONE);
                    relativeLayout.setBackgroundColor(Color.BLUE);
                    scrollView.setVisibility(View.VISIBLE);

                    departmentsSpinner.setOnSpinnerItemClickListener(new AwesomeSpinner.onSpinnerItemClickListener<String>() {
                        @Override
                        public void onItemSelected(int position, String itemAtPosition) {

                        }
                    });
                }
                else {
                    Toast.makeText(getApplicationContext(), "Unable to fetch departments", Toast.LENGTH_SHORT)
                            .show();
                    finish();
                }
            }

            @Override
            public void onFailure(@NonNull Call<DtResponse> call, @NonNull Throwable t) {
                Log.e("departments", t.getMessage());
                Toast.makeText(getApplicationContext(), "No internet!", Toast.LENGTH_LONG)
                        .show();
                finish();
            }
        });

        gotoLogin.setOnClickListener(this);
        slideLogin.setOnClickListener(this);
    }

    private void initUI(){
        gotoLogin = findViewById(R.id.gotoLogin);
        slideLogin = findViewById(R.id.slideLogin);
        fNameEdt = findViewById(R.id.edtFirstName);
        lNameEdt = findViewById(R.id.edtLastName);
        emailEdt = findViewById(R.id.edtEmail);
        passwordEdt = findViewById(R.id.edtPassword);
        confirmPasswordEdt = findViewById(R.id.edtConfirmPassword);
        idEdt = findViewById(R.id.edtIndex);
        mobileEdt = findViewById(R.id.edtMobile);
        departmentsSpinner = findViewById(R.id.departments);
        loader = findViewById(R.id.loader);
        scrollView = findViewById(R.id.mainSignup);
        relativeLayout = findViewById(R.id.relStdSignup);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.gotoLogin:
            case R.id.slideLogin:
                startActivity(new Intent(this,StudentLoginActivity.class));
                overridePendingTransition(R.anim.slide_in_left,android.R.anim.slide_out_right);
                break;
            case R.id.btnRegister:
                registerUser();
        }
    }

    private void registerUser(){
        //code to create a new student
    }
}
