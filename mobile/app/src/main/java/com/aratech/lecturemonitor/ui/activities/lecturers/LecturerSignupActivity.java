package com.aratech.lecturemonitor.ui.activities.lecturers;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.common.Consts;
import com.aratech.lecturemonitor.models.Lecturer;
import com.aratech.lecturemonitor.models.LtResponse;
import com.aratech.lecturemonitor.models.LtSignup;
import com.aratech.lecturemonitor.models.StResponse;
import com.aratech.lecturemonitor.models.StSignup;
import com.aratech.lecturemonitor.models.Student;
import com.aratech.lecturemonitor.network.ApiClient;
import com.aratech.lecturemonitor.network.ApiInterface;
import com.aratech.lecturemonitor.ui.activities.students.StudentHomeActivity;
import com.aratech.lecturemonitor.ui.activities.students.StudentLoginActivity;
import com.aratech.lecturemonitor.ui.activities.students.StudentSignupActivity;
import com.sdsmdg.tastytoast.TastyToast;

import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LecturerSignupActivity extends AppCompatActivity implements View.OnClickListener {
    ImageView slideLogin;
    TextView gotoLogin;
    EditText fNameEdt, lNameEdt, otherNamesEdt, emailEdt, mobileEdt, passwordEdt, confirmPasswordEdt;
    CircularProgressButton registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lecturer_signup);

        //initialize ui elements
        initUI();

        gotoLogin.setOnClickListener(this);
        slideLogin.setOnClickListener(this);
    }

    private void initUI(){
        gotoLogin = findViewById(R.id.gotoLogin);
        slideLogin = findViewById(R.id.slideLogin);
        fNameEdt = findViewById(R.id.edtFirstName);
        lNameEdt = findViewById(R.id.edtLastName);
        emailEdt = findViewById(R.id.edtEmail);
        mobileEdt = findViewById(R.id.editTextMobile);
        passwordEdt = findViewById(R.id.edtPassword);
        confirmPasswordEdt = findViewById(R.id.edtConfirmPassword);
        registerButton = findViewById(R.id.btnRegister);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.gotoLogin:
            case R.id.slideLogin:
                this.onBackPressed();
                break;
            case R.id.btnRegister:
                registerUser();
                break;
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,android.R.anim.slide_out_right);
    }


    private void registerUser(){
        String fName, lName, otherNames, email, mobileNo, course, password, confirmPassword;

        course = "";
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

        LtSignup ltSignup = new LtSignup(fName, lName, otherNames,email, course, mobileNo, password);

        ApiInterface apiService = ApiClient.getClient().create(ApiInterface.class);
        Call<LtResponse> call = apiService.registerLecturer(ltSignup);
        call.enqueue(new Callback<LtResponse>() {
            @Override
            public void onResponse(@NonNull Call<LtResponse> call, @NonNull Response<LtResponse> response) {
                if(response.isSuccessful()) {
                    assert response.body() != null;
                    Lecturer lecturer = response.body().getData().getLecturer();
                    TastyToast.makeText(getApplicationContext(), "Student Signed up successfully", TastyToast.LENGTH_LONG, TastyToast.SUCCESS)
                            .show();
                    //save logged in student to shared preferences
                    SharedPreferences authPrefs = getSharedPreferences(Consts.AUTH_SHARED_PREFS, Context.MODE_PRIVATE);
                    authPrefs
                            .edit()
                            .putBoolean(Consts.IS_LOGGED_IN, true)
                            .putBoolean(Consts.IS_LECTURER, true)
                            .putBoolean(Consts.IS_STUDENT, false)
                            .putString(Consts.AUTH_TOKEN, response.body().getData().getToken())
                            .apply();

                    //save the current user info to shared preferences
                    SharedPreferences userPrefs = getSharedPreferences(Consts.CURRENT_USER_SHARED_PREFS, Context.MODE_PRIVATE);
                    userPrefs
                            .edit()
                            .putString(Consts.CURRENT_USER_EMAIL, lecturer.getEmail())
                            .putString(Consts.CURRENT_USER_PHONE, lecturer.getPhoneNo())
                            .putBoolean(Consts.CURRENT_USER_EMAIL_VERIFIED, lecturer.isEmailVerified())
                            .apply();
                    registerButton.revertAnimation();
                    Intent intent = new Intent(LecturerSignupActivity.this, StudentHomeActivity.class);
                    startActivity(intent);
                    finish();
                }
                else {
                    TastyToast.makeText(getApplicationContext(), "Wrong input", TastyToast.LENGTH_LONG, TastyToast.ERROR)
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
            public void onFailure(@NonNull Call<LtResponse> call, @NonNull Throwable t) {
                TastyToast.makeText(getApplicationContext(), "Unable to sign up at this time, check your internet connection", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                        .show();
                registerButton.revertAnimation();
            }
        });
    }

    
}

