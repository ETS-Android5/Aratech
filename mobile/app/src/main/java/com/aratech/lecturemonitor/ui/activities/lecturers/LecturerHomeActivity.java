package com.aratech.lecturemonitor.ui.activities.lecturers;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.MenuItem;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.ui.fragments.lecturers.LecturerAttendanceFragment;
import com.aratech.lecturemonitor.ui.fragments.lecturers.LecturerCalendarFragment;
import com.aratech.lecturemonitor.ui.fragments.lecturers.LecturerHomeFragment;
import com.aratech.lecturemonitor.ui.fragments.lecturers.LecturerNotificationsFragment;
import com.aratech.lecturemonitor.ui.fragments.lecturers.LecturerProfileFragment;
import com.aratech.lecturemonitor.utils.Tools;
import com.google.android.material.navigation.NavigationView;

public class LecturerHomeActivity extends AppCompatActivity  implements NavigationView.OnNavigationItemSelectedListener{
    private DrawerLayout drawerLayout;
    private ActionBarDrawerToggle actionBarDrawerToggle;
    private NavigationView navigationView;
    private Toolbar toolbar;
    private ActionBar actionBar;

    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        setContentView(R.layout.activity_lecturer_home);

        initToolbar();


        drawerLayout = findViewById(R.id.drawer);
        navigationView = findViewById(R.id.navigationView);
        navigationView.setNavigationItemSelectedListener(this);

        actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.open, R.string.close);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.setDrawerIndicatorEnabled(true);
        actionBarDrawerToggle.syncState();

        //lets load the default fragment
        gotoFragment(new LecturerHomeFragment());

    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
        drawerLayout.closeDrawer(GravityCompat.START);

        if(menuItem.getItemId() == R.id.home){
            actionBar.setTitle("Home");
            gotoFragment(new LecturerHomeFragment());
        }
        if(menuItem.getItemId() == R.id.profile){
            actionBar.setTitle("Profile");
            gotoFragment(new LecturerProfileFragment());
        }
        if(menuItem.getItemId() == R.id.calendar){
            actionBar.setTitle("Calendar");
            gotoFragment(new LecturerCalendarFragment());
        }
        if(menuItem.getItemId() == R.id.attendance){
            actionBar.setTitle("Attendance");
            gotoFragment(new LecturerAttendanceFragment());
        }
        if(menuItem.getItemId() == R.id.notifications){
            actionBar.setTitle("Notifications");
            gotoFragment(new LecturerNotificationsFragment());
        }
        return true;
    }
    //method to switch between the fragments
    private void gotoFragment(Fragment fragment){
        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.lecturer_home, fragment);
        fragmentTransaction.commit();
    }
    private void initToolbar() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        actionBar = getSupportActionBar();
        assert actionBar != null;
        actionBar.setTitle("Home");
        Tools.setSystemBarColor(this, R.color.black);
    }
}
