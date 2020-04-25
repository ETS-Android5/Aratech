package com.aratech.lecturemonitor.ui.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;
import android.view.Menu;
import android.app.Activity;
import android.view.*;
import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.common.Consts;
import com.aratech.lecturemonitor.ui.activities.lecturers.LecturerHomeActivity;
import com.aratech.lecturemonitor.ui.activities.students.StudentHomeActivity;
import com.sdsmdg.tastytoast.TastyToast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //code for full screen for the splash
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_main);

        //code to run after application has delayed for a few seconds
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                SharedPreferences authPrefs = getSharedPreferences(Consts.AUTH_SHARED_PREFS, Context.MODE_PRIVATE);
                boolean isLoggedIn = authPrefs.getBoolean(Consts.IS_LOGGED_IN, false);
                if (isLoggedIn) {
                    //user is logged in, check if logged in as student or lecturer
                    boolean isStudent = authPrefs.getBoolean(Consts.IS_STUDENT, false);
                    boolean isLecturer = authPrefs.getBoolean(Consts.IS_LECTURER, false);
                    if(isStudent) {
                        Intent intent = new Intent(MainActivity.this, StudentHomeActivity.class);
                        startActivity(intent);
                        finish();
                    }
                    else if(isLecturer) {
                        Intent intent = new Intent(MainActivity.this, LecturerHomeActivity.class);
                        startActivity(intent);
                        finish();
                    } else {
                        TastyToast.makeText(getApplicationContext(), "Unable to verify login status, please sign in again", TastyToast.LENGTH_LONG, TastyToast.WARNING)
                                .show();
                        authPrefs.edit().putBoolean(Consts.IS_LOGGED_IN, false).apply();
                        Intent intent = new Intent(MainActivity.this, IntroActivity.class);
                        startActivity(intent);
                        finish();
                    }
                }else {
                    Intent intent = new Intent(MainActivity.this, IntroActivity.class);
                    startActivity(intent);
                    finish();
                }
            }
        };

        //delay screen for 3 seconds
        Handler handler = new Handler();
        handler.postDelayed(runnable, 3000);

    }
}
