package com.aratech.lecturemonitor.ui.activities.students;

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

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.common.Consts;
import com.aratech.lecturemonitor.models.StResponse;
import com.aratech.lecturemonitor.models.StdLogin;
import com.aratech.lecturemonitor.models.Student;
import com.aratech.lecturemonitor.network.ApiClient;
import com.aratech.lecturemonitor.network.ApiInterface;
import com.aratech.lecturemonitor.ui.activities.ForgotPasswordActivity;
import com.aratech.lecturemonitor.utils.Tools;
import com.sdsmdg.tastytoast.TastyToast;

import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class StudentLoginActivity extends AppCompatActivity implements View.OnClickListener {
    CircularProgressButton loginBtn;
    TextView gotoRegister, forgotPassword;
    ImageView slideSignUp;
    EditText edtIndex, edtPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_student_login);

        //initialize ui elements
        initUI();

        Tools.setSystemBarColor(this, R.color.grey_5);
        Tools.setSystemBarLight(this);

        loginBtn.setOnClickListener(this);
        gotoRegister.setOnClickListener(this);
        slideSignUp.setOnClickListener(this);
        forgotPassword.setOnClickListener(this);
    }

    private void initUI() {
        loginBtn = findViewById(R.id.login);
        gotoRegister = findViewById(R.id.gotoRegister);
        slideSignUp = findViewById(R.id.slideSignUp);
        edtIndex = findViewById(R.id.edtIndex);
        edtPassword = findViewById(R.id.edtPassword);
        forgotPassword = findViewById(R.id.txtForgotPassword);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.login:
                loginBtn.startAnimation();
                login();
                break;
            case R.id.txtForgotPassword:
                Intent intent = new Intent(StudentLoginActivity.this, ForgotPasswordActivity.class);
                startActivity(intent);
                overridePendingTransition(R.anim.slide_in_right, R.anim.stay);
                break;
            case R.id.gotoRegister:
            case R.id.slideSignUp:
                startActivity(new Intent(this,StudentSignupActivity.class));
                overridePendingTransition(R.anim.slide_in_right,R.anim.stay);
        }
    }

    //login user
    private void login(){
        int indexNo;
        String password;
        password = edtPassword.getText().toString();
        try {
            indexNo = Integer.parseInt(edtIndex.getText().toString());
        }catch (Exception e){
            edtIndex.setError("Index Number is required and must be an integer");
            TastyToast.makeText(getApplicationContext(), "Index Number is required and must be of type integer", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            loginBtn.revertAnimation();
            return;
        }

        if(password.length() < 8) {
            edtPassword.setError("Password is required and must be 8 characters or more");
            TastyToast.makeText(getApplicationContext(), "Password is required and must be 8 characters or more", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            loginBtn.revertAnimation();
            return;
        }

        //login user
        StdLogin stdLogin = new StdLogin(indexNo, password);

        ApiInterface apiService = ApiClient.getClient().create(ApiInterface.class);

        Call<StResponse> call = apiService.loginStudent(stdLogin);
        call.enqueue(new Callback<StResponse>() {
            @Override
            public void onResponse(@NonNull Call<StResponse> call, @NonNull Response<StResponse> response) {
                if(response.isSuccessful()) {
                    assert response.body() != null;
                    Student student = response.body().getData().getStudent();
                    TastyToast.makeText(getApplicationContext(), "Student Logged in successfully", TastyToast.LENGTH_LONG, TastyToast.SUCCESS)
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
                            .putString(Consts.CURRENT_USER_FIRST_NAME, student.getfName())
                            .putString(Consts.CURRENT_USER_LAST_NAME, student.getlName())
                            .putString(Consts.CURRENT_USER_INDEX, String.valueOf(student.getIndexNo()))
                            .putBoolean(Consts.CURRENT_USER_CREP, student.iscRep())
                            .putBoolean(Consts.CURRENT_USER_EMAIL_VERIFIED, student.isEmailVerified())
                            .apply();
                    loginBtn.revertAnimation();
                    Intent intent = new Intent(StudentLoginActivity.this, StudentHomeActivity.class);
                    startActivity(intent);
                    finish();
                }
                else {
                    TastyToast.makeText(getApplicationContext(), "Invalid index number or password", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                            .show();
                    edtIndex.setText("");
                    edtPassword.setText("");
                    loginBtn.revertAnimation();
                }
            }

            @Override
            public void onFailure(@NonNull Call<StResponse> call, @NonNull Throwable t) {
                TastyToast.makeText(getApplicationContext(), "Unable to log in at this time, check your internet connection", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                        .show();
                loginBtn.revertAnimation();
            }
        });

    }
}
