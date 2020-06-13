package com.aratech.lecturemonitor.ui.fragments.students;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.aratech.lecturemonitor.R;

public class EditStudentProfileFragment extends Fragment {

    public EditStudentProfileFragment() {
        // Required empty public constructor
    }

    public static EditStudentProfileFragment newInstance(String param1, String param2) {
        return new EditStudentProfileFragment();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_edit_student_profile, container, false);
    }
}