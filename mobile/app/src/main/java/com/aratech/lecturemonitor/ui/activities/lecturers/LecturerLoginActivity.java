package com.aratech.lecturemonitor.ui.activities.lecturers;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.common.Consts;
import com.aratech.lecturemonitor.models.Lecturer;
import com.aratech.lecturemonitor.models.LtLogin;
import com.aratech.lecturemonitor.models.LtResponse;
import com.aratech.lecturemonitor.network.ApiClient;
import com.aratech.lecturemonitor.network.ApiInterface;
import com.aratech.lecturemonitor.utils.Tools;
import com.sdsmdg.tastytoast.TastyToast;

import org.jetbrains.annotations.NotNull;
import org.w3c.dom.Text;

import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LecturerLoginActivity extends AppCompatActivity implements View.OnClickListener {
    CircularProgressButton loginBtn;
    TextView gotoRegister, forgotPassword;
    ImageView slideSignUp;
    EditText edtEmail, edtPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_lecturer_login);

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
        edtEmail = findViewById(R.id.edtEmail);
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
                TastyToast.makeText(getApplicationContext(), "Forgot password not yet made", TastyToast.LENGTH_SHORT, TastyToast.INFO)
                        .show();
                break;
            case R.id.gotoRegister:
            case R.id.slideSignUp:
                startActivity(new Intent(this, LecturerSignupActivity.class));
                overridePendingTransition(R.anim.slide_in_right,R.anim.stay);
        }
    }

    //login user
    private void login(){
        String email,password;
        password = edtPassword.getText().toString();
        email = edtEmail.getText().toString();

        if(email.isEmpty()){
            TastyToast.makeText(getApplicationContext(), "Email must not be empty", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            loginBtn.revertAnimation();
            return;
        }

        if(!Patterns.EMAIL_ADDRESS.matcher(email).matches()){
            TastyToast.makeText(getApplicationContext(), "Must be a valid email address", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            loginBtn.revertAnimation();
            return;
        }

        if (password.length() < 8){
            TastyToast.makeText(getApplicationContext(), "Password is required and must be 8 characters or more", TastyToast.LENGTH_SHORT, TastyToast.ERROR)
                    .show();
            loginBtn.revertAnimation();
            return;
        }

        ApiInterface apiService = ApiClient.getClient().create(ApiInterface.class);
        LtLogin ltLogin = new LtLogin(email, password);
        Call<LtResponse> call = apiService.loginLecturer(ltLogin);

        //make http call
        call.enqueue(new Callback<LtResponse>() {
            @Override
            public void onResponse(@NotNull Call<LtResponse> call, @NotNull Response<LtResponse> response) {
                if(response.isSuccessful()){
                    assert response.body() != null;
                    Lecturer lecturer = response.body().getData().getLecturer();
                    TastyToast.makeText(getApplicationContext(), "Student Logged in successfully", TastyToast.LENGTH_LONG, TastyToast.SUCCESS)
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
                    loginBtn.revertAnimation();
                    Intent intent = new Intent(LecturerLoginActivity.this, LecturerHomeActivity.class);
                    startActivity(intent);
                    finish();
                }
                else {
                    TastyToast.makeText(getApplicationContext(), "Login Failed", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                            .show();
                    loginBtn.revertAnimation();
                }
            }

            @Override
            public void onFailure(@NotNull Call<LtResponse> call, @NotNull Throwable t) {
                Log.d("Lecturer Login", t.getMessage());
                TastyToast.makeText(getApplicationContext(), "Unable to login at this time, please check your internet connection", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                        .show();
                loginBtn.revertAnimation();
            }
        });

    }
}


