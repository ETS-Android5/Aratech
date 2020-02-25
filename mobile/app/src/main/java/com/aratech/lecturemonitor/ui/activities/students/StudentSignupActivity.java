package com.aratech.lecturemonitor.ui.activities.students;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.aratech.lecturemonitor.R;

public class StudentSignupActivity extends AppCompatActivity implements View.OnClickListener {
    ImageView slideLogin;
    TextView gotoLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_signup);

        //initialize ui elements
        initUI();

        gotoLogin.setOnClickListener(this);
        slideLogin.setOnClickListener(this);
    }

    private void initUI(){
        gotoLogin = findViewById(R.id.gotoLogin);
        slideLogin = findViewById(R.id.slideLogin);
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
                Toast.makeText(getApplicationContext(), "Signed up", Toast.LENGTH_SHORT)
                        .show();
                break;
        }
    }
}
