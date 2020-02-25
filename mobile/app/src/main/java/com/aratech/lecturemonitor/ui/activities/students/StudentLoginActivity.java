package com.aratech.lecturemonitor.ui.activities.students;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.aratech.lecturemonitor.R;

import org.w3c.dom.Text;

import br.com.simplepass.loading_button_lib.customViews.CircularProgressButton;

public class StudentLoginActivity extends AppCompatActivity implements View.OnClickListener {
    CircularProgressButton loginBtn;
    TextView gotoRegister;
    ImageView slideSignUp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if(Build.VERSION.SDK_INT>= Build.VERSION_CODES.M){
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }
        setContentView(R.layout.activity_student_login);

        //initialize ui elements
        initUI();

        loginBtn.setOnClickListener(this);
        gotoRegister.setOnClickListener(this);
        slideSignUp.setOnClickListener(this);
    }

    private void initUI() {
        loginBtn = findViewById(R.id.login);
        gotoRegister = findViewById(R.id.gotoRegister);
        slideSignUp = findViewById(R.id.slideSignUp);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.login:
                Toast.makeText(getApplicationContext(), "Login clicked", Toast.LENGTH_SHORT)
                        .show();
                break;
            case R.id.gotoRegister:
            case R.id.slideSignUp:
                startActivity(new Intent(this,StudentSignupActivity.class));
                overridePendingTransition(R.anim.slide_in_right,R.anim.stay);
        }
    }
}
