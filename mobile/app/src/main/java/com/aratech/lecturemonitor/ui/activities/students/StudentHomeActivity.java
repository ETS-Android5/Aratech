package com.aratech.lecturemonitor.ui.activities.students;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.widget.NestedScrollView;
import androidx.fragment.app.Fragment;

import android.Manifest;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.os.Bundle;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.ui.fragments.students.StudentAttendanceFragment;
import com.aratech.lecturemonitor.ui.fragments.students.StudentCalendarFragment;
import com.aratech.lecturemonitor.ui.fragments.students.StudentHomeFragment;
import com.aratech.lecturemonitor.ui.fragments.students.StudentNotificationsFragment;
import com.aratech.lecturemonitor.ui.fragments.students.StudentProfileFragment;
import com.aratech.lecturemonitor.utils.Tools;
import com.aratech.lecturemonitor.utils.ViewAnimation;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;

import java.util.List;
import java.util.Objects;

public class StudentHomeActivity extends AppCompatActivity {
    private TabLayout tab_layout;
    private ActionBar actionBar;
    private ConstraintLayout constraintLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_home);

        initToolbar();
        initComponent();

        //request for permissions
        Dexter.withActivity(this)
                .withPermissions(
                        Manifest.permission.INTERNET,
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.CAMERA
                ).withListener(new MultiplePermissionsListener() {
            @Override
            public void onPermissionsChecked(MultiplePermissionsReport report) {
                    if(!report.areAllPermissionsGranted()) {
                        Snackbar.make(constraintLayout.getRootView(), "Permissions needed for application to run successfully", Snackbar.LENGTH_LONG).show();
                    }
            }


            @Override
            public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                Snackbar.make(constraintLayout.getRootView(), "Permissions needed for application to run successfully", Snackbar.LENGTH_LONG).show();
            }
        }).check();
    }

    private void initToolbar() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        actionBar = getSupportActionBar();
        assert actionBar != null;
        actionBar.setTitle("Home");
        Tools.setSystemBarColor(this, R.color.black);
    }

    private void initComponent() {
        constraintLayout = findViewById(R.id.container);
        tab_layout = findViewById(R.id.tab_layout);

        tab_layout.addTab(tab_layout.newTab().setIcon(R.drawable.ic_home), 0);
        tab_layout.addTab(tab_layout.newTab().setIcon(R.drawable.ic_qr_code), 1);
        tab_layout.addTab(tab_layout.newTab().setIcon(android.R.drawable.ic_menu_my_calendar), 2);
        tab_layout.addTab(tab_layout.newTab().setIcon(R.drawable.ic_notifications), 3);
        tab_layout.addTab(tab_layout.newTab().setIcon(R.drawable.ic_person), 4);

        // set icon color pre-selected
        Objects.requireNonNull(Objects.requireNonNull(tab_layout.getTabAt(0)).getIcon()).setColorFilter(Color.BLUE, PorterDuff.Mode.SRC_IN);
        tab_layout.getTabAt(1).getIcon().setColorFilter(getResources().getColor(R.color.grey_60), PorterDuff.Mode.SRC_IN);
        tab_layout.getTabAt(2).getIcon().setColorFilter(getResources().getColor(R.color.grey_60), PorterDuff.Mode.SRC_IN);
        tab_layout.getTabAt(3).getIcon().setColorFilter(getResources().getColor(R.color.grey_60), PorterDuff.Mode.SRC_IN);
        tab_layout.getTabAt(4).getIcon().setColorFilter(getResources().getColor(R.color.grey_60), PorterDuff.Mode.SRC_IN);

        gotoFragment(new StudentHomeFragment());

        tab_layout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                tab.getIcon().setColorFilter(Color.BLUE, PorterDuff.Mode.SRC_IN);
                switch (tab.getPosition()) {
                    case 0:
                        actionBar.setTitle("Home");
                        gotoFragment(new StudentHomeFragment());
                        break;
                    case 1:
                        actionBar.setTitle("Attendance");
                        gotoFragment(new StudentAttendanceFragment());
                        break;
                    case 2:
                        actionBar.setTitle("Calender");
                        gotoFragment(new StudentCalendarFragment());
                        break;
                    case 3:
                        actionBar.setTitle("Notifications");
                        gotoFragment(new StudentNotificationsFragment());
                        break;
                    case 4:
                        actionBar.setTitle("Profile");
                        gotoFragment(new StudentProfileFragment());
                        break;
                }

                ViewAnimation.fadeOutIn(constraintLayout);
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                Objects.requireNonNull(tab.getIcon()).setColorFilter(getResources().getColor(R.color.grey_60), PorterDuff.Mode.SRC_IN);
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        Tools.setSystemBarColor(this, R.color.grey_5);
        Tools.setSystemBarLight(this);
    }

    //method to switch between the fragments
    private void gotoFragment(Fragment fragment){
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.main_student, fragment)
                .commit();
    }
}
