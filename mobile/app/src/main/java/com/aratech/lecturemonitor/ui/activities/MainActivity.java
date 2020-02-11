package com.aratech.lecturemonitor.ui.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.aratech.lecturemonitor.R;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //code to run after application has delayed for a few seconds
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(MainActivity.this, IntroActivity.class);
                startActivity(intent);
                finish();
            }
        };

        //delay screen for 3 seconds
        Handler handler = new Handler();
        handler.postDelayed(runnable, 3000);
    }
}
