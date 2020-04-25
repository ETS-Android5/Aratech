package com.aratech.lecturemonitor.ui.fragments.lecturers;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.ui.activities.lecturers.LecturerHomeActivity;

/**
 * A simple {@link Fragment} subclass.
 */
public class LecturerAttendanceFragment extends Fragment {

    public LecturerAttendanceFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_lecturer_attendance, container, false);
    }
}
