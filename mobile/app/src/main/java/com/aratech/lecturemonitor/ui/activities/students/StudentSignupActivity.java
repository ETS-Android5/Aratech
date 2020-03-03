package com.aratech.lecturemonitor.ui.activities.students;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.common.Consts;
import com.aratech.lecturemonitor.models.Department;
import com.aratech.lecturemonitor.models.DtResponse;
import com.aratech.lecturemonitor.models.StResponse;
import com.aratech.lecturemonitor.models.StSignup;
import com.aratech.lecturemonitor.models.Student;
import com.aratech.lecturemonitor.network.ApiClient;
import com.aratech.lecturemonitor.network.ApiInterface;
import com.isapanah.awesomespinner.AwesomeSpinner;
import com.sdsmdg.tastytoast.TastyToast;

import java.util.ArrayList;
import java.util.List;

public class StudentSignupActivity extends AppCompatActivity implements View.OnClickListener {
    private EditText fNameEdt, lNameEdt, otherNamesEdt, emailEdt, idEdt, mobileEdt, passwordEdt, confirmPasswordEdt;
    private AwesomeSpinner departmentsSpinner;
    private ScrollView scrollView;
    private RelativeLayout relativeLayout;
    private CircularProgressButton registerButton;
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
                            //do nothing
                        }
                    });
                }
                else {
                    TastyToast.makeText(getApplicationContext(), "Unable to fetch departments, Cannot signup!", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                            .show();
                    finish();
                }
            }

            @Override
            public void onFailure(@NonNull Call<DtResponse> call, @NonNull Throwable t) {
                Log.e("departments", t.getMessage());
                TastyToast.makeText(getApplicationContext(), "Unable to fetch departments, Cannot signup!", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                        .show();
                finish();
            }
        });

        gotoLogin.setOnClickListener(this);
        slideLogin.setOnClickListener(this);
        registerButton.setOnClickListener(this);
    }

    private void initUI(){
        gotoLogin = findViewById(R.id.gotoLogin);
        slideLogin = findViewById(R.id.slideLogin);
        fNameEdt = findViewById(R.id.edtFirstName);
        lNameEdt = findViewById(R.id.edtLastName);
        otherNamesEdt = findViewById(R.id.edtOtherNames);
        emailEdt = findViewById(R.id.edtEmail);
        passwordEdt = findViewById(R.id.edtPassword);
        confirmPasswordEdt = findViewById(R.id.edtConfirmPassword);
        idEdt = findViewById(R.id.edtIndex);
        mobileEdt = findViewById(R.id.edtMobile);
        departmentsSpinner = findViewById(R.id.departments);
        loader = findViewById(R.id.loader);
        scrollView = findViewById(R.id.mainSignup);
        relativeLayout = findViewById(R.id.relStdSignup);
        registerButton = findViewById(R.id.btnRegister);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.gotoLogin:
            case R.id.slideLogin:
//                startActivity(new Intent(this,StudentLoginActivity.class));
                this.onBackPressed();
                overridePendingTransition(R.anim.slide_in_left,android.R.anim.slide_out_right);
                break;
            case R.id.btnRegister:
                registerButton.startAnimation();
                registerUser();
        }
    }

    private void registerUser(){
        String fName, lName, otherNames, email, mobileNo, department, password, confirmPassword;
        int index;

        fName = fNameEdt.getText().toString();
        lName = lNameEdt.getText().toString();
        otherNames = otherNamesEdt.getText().toString();
        email = emailEdt.getText().toString();
        mobileNo = mobileEdt.getText().toString();
        password= passwordEdt.getText().toString();
        confirmPassword = confirmPasswordEdt.getText().toString();

        if(fName.isEmpty()){
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "First Name is required", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }
        if(lName.isEmpty()){
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "Last Name is required", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }
        if(email.isEmpty()){
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "Email is required", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }
        if(mobileNo.isEmpty()){
            TastyToast.makeText(getApplicationContext(), "Mobile number is required", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }
        if(password.length() < 8){
            registerButton.revertAnimation();
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "Password is required and must be 8 characters or more", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }
        if(confirmPassword.isEmpty()){
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "Confirm password is required", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }
        if(!confirmPassword.equals(password)){
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "Password fields must match", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }

        try {
            index = Integer.parseInt(idEdt.getText().toString());
        } catch (Exception e){
            registerButton.revertAnimation();
            TastyToast.makeText(getApplicationContext(), "Index number is required and should be of type integer", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            return;
        }

        department = departmentIds.get(departmentsSpinner.getSelectedItemPosition());

        StSignup stSignup = new StSignup(fName, lName, otherNames,email, index, department, mobileNo, password);

        ApiInterface apiService = ApiClient.getClient().create(ApiInterface.class);
        Call<StResponse> call = apiService.registerStudent(stSignup);
        call.enqueue(new Callback<StResponse>() {
            @Override
            public void onResponse(@NonNull Call<StResponse> call, @NonNull Response<StResponse> response) {
                if(response.isSuccessful()) {
                    assert response.body() != null;
                    Student student = response.body().getData().getStudent();
                    TastyToast.makeText(getApplicationContext(), "Student Signed up successfully", TastyToast.LENGTH_SHORT, TastyToast.SUCCESS)
                            .show();
                    //save logged in student to shared preferences
                    SharedPreferences authPrefs = getSharedPreferences(Consts.AUTH_SHARED_PREFS, Context.MODE_PRIVATE);
                    authPrefs
                            .edit()
                            .putBoolean(Consts.IS_LOGGED_IN, true)
                            .putBoolean(Consts.IS_LECTURER, false)
                            .putBoolean(Consts.IS_STUDENT, true)
                            .putString(Consts.AUTH_TOKEN, response.body().getData().getToken())
                            .apply();

                    //save the current user info to shared preferences
                    SharedPreferences userPrefs = getSharedPreferences(Consts.CURRENT_USER_SHARED_PREFS, Context.MODE_PRIVATE);
                    userPrefs
                            .edit()
                            .putString(Consts.CURRENT_USER_EMAIL, student.getEmail())
                            .putString(Consts.CURRENT_USER_PHONE, student.getPhoneNo())
                            .putBoolean(Consts.CURRENT_USER_CREP, student.iscRep())
                            .putBoolean(Consts.CURRENT_USER_EMAIL_VERIFIED, student.isEmailVerified())
                            .apply();
                    registerButton.revertAnimation();
                    Intent intent = new Intent(StudentSignupActivity.this, StudentHomeActivity.class);
                    startActivity(intent);
                    finish();
                }
                else {
                    TastyToast.makeText(getApplicationContext(), "Wrong input", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                            .show();
                    fNameEdt.setText("");
                    lNameEdt.setText("");
                    otherNamesEdt.setText("");
                    emailEdt.setText("");
                    mobileEdt.setText("");
                    passwordEdt.setText("");
                    confirmPasswordEdt.setText("");
                    registerButton.revertAnimation();
                }
            }

            @Override
            public void onFailure(@NonNull Call<StResponse> call, @NonNull Throwable t) {
                TastyToast.makeText(getApplicationContext(), "Unable to sign up at this time, check your internet connection", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                        .show();
                registerButton.revertAnimation();
            }
        });
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,android.R.anim.slide_out_right);
    }
}
