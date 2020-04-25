package com.aratech.lecturemonitor;

import android.app.Application;

import com.aratech.lecturemonitor.utils.Tools;

public class MyApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Tools.overrideFont(getApplicationContext(), "SERIF", "fonts/Montserrat.ttf");
    }
}
