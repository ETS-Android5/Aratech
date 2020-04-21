package com.aratech.lecturemonitor.ui.fragments.students;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;

import com.aratech.lecturemonitor.R;
import com.google.android.material.snackbar.Snackbar;

/**
 * A simple {@link Fragment} subclass.
 */
public class StudentAttendanceFragment extends Fragment {
    private RelativeLayout attendanceFragment;

    public StudentAttendanceFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view =  inflater.inflate(R.layout.fragment_student_attendance, container, false);

        //initialize ui
        attendanceFragment = view.findViewById(R.id.attendance_fragment);
        Button attendanceBtn = view.findViewById(R.id.take_attendance);

        attendanceBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                takeAttendance();
            }
        });

        return view;
    }

    //take attendance functionality
    private void takeAttendance(){
        //todo: implement later
        Snackbar.make(attendanceFragment, "Unable to take attendance this time, try again later", Snackbar.LENGTH_LONG)
                .show();
    }

}
