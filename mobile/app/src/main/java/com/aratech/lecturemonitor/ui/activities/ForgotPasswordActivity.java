package com.aratech.lecturemonitor.ui.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.models.ForgotPwd;
import com.aratech.lecturemonitor.models.ForgotPwdResponse;
import com.aratech.lecturemonitor.network.ApiClient;
import com.aratech.lecturemonitor.network.ApiInterface;
import com.sdsmdg.tastytoast.TastyToast;

import org.jetbrains.annotations.NotNull;

import java.util.Objects;

import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ForgotPasswordActivity extends AppCompatActivity implements View.OnClickListener {
    private EditText txtEmail;
    private CircularProgressButton btnSendResetLink;
    private TextView gotoLogin;
    private ImageView slideLogin;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);

        //initialize ui elements
        initUI();

        //register onclick listeners
        btnSendResetLink.setOnClickListener(this);
        gotoLogin.setOnClickListener(this);
        slideLogin.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btnSendReset:
                btnSendResetLink.startAnimation();
                sendEmailReset();
                break;
            case R.id.gotoLogin:
            case R.id.slideLogin:
                //go to the previous activity
                this.onBackPressed();
                break;
        }
    }

    private void sendEmailReset() {
        //try and send user a password reset mail
        String email = txtEmail.getText().toString();

        //validate email
        if(email.isEmpty()) {
            TastyToast.makeText(this, "Email must not be empty", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                    .show();
            btnSendResetLink.revertAnimation();
            return;
        }
        if(!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            TastyToast.makeText(this, "Invalid email address", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                    .show();
            btnSendResetLink.revertAnimation();
            return;
        }

        //send user a verification email
        ForgotPwd forgotPwd = new ForgotPwd(email);
        ApiInterface apiService = ApiClient.getClient().create(ApiInterface.class);
        Call<ForgotPwdResponse> call = apiService.forgotPassword(forgotPwd);
        call.enqueue(new Callback<ForgotPwdResponse>() {
            @Override
            public void onResponse(@NotNull Call<ForgotPwdResponse> call, @NotNull Response<ForgotPwdResponse> response) {
                if(response.isSuccessful()) {
                    assert response.body() != null;
                    TastyToast.makeText(ForgotPasswordActivity.this, response.body().getMessage(), TastyToast.LENGTH_LONG, TastyToast.SUCCESS)
                            .show();
                    btnSendResetLink.revertAnimation();
                } else {
                    TastyToast.makeText(ForgotPasswordActivity.this, "Request not successful..., please try again after some time", TastyToast.LENGTH_LONG, TastyToast.WARNING)
                            .show();
                    btnSendResetLink.revertAnimation();
                }
            }

            @Override
            public void onFailure(@NotNull Call<ForgotPwdResponse> call, @NotNull Throwable t) {
                Log.d(ForgotPasswordActivity.class.getName(), Objects.requireNonNull(t.getMessage()));
                TastyToast.makeText(ForgotPasswordActivity.this, "Request failed", TastyToast.LENGTH_LONG, TastyToast.ERROR)
                        .show();
                btnSendResetLink.revertAnimation();
            }
        });
    }

    private void initUI() {
        txtEmail = findViewById(R.id.txtEmail);
        btnSendResetLink = findViewById(R.id.btnSendReset);
        gotoLogin = findViewById(R.id.gotoLogin);
        slideLogin = findViewById(R.id.slideLogin);
    }

    @Override
    public void onBackPressed(){
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left, android.R.anim.slide_out_right);
    }
}
