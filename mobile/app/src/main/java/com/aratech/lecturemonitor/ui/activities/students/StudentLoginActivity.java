package com.aratech.lecturemonitor.ui.activities.students;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.utils.Tools;

import org.w3c.dom.Text;

import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;

public class StudentLoginActivity extends AppCompatActivity implements View.OnClickListener {
    CircularProgressButton loginBtn;
    TextView gotoRegister;
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
    }

    private void initUI() {
        loginBtn = findViewById(R.id.login);
        gotoRegister = findViewById(R.id.gotoRegister);
        slideSignUp = findViewById(R.id.slideSignUp);
        edtIndex = findViewById(R.id.edtIndex);
        edtPassword = findViewById(R.id.edtPassword);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.login:
                loginBtn.startAnimation();
                login();
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
            e.printStackTrace();
        }

    }
}
