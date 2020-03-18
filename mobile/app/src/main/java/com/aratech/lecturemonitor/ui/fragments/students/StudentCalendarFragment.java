package com.aratech.lecturemonitor.ui.fragments.students;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.aratech.lecturemonitor.R;

/**
 * A simple {@link Fragment} subclass.
 */
public class StudentCalendarFragment extends Fragment {

    public StudentCalendarFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_student_calendar, container, false);
    }
}
