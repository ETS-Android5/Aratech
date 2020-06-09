package com.aratech.lecturemonitor.ui.fragments.students;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.widget.NestedScrollView;
import androidx.fragment.app.Fragment;

import com.aratech.lecturemonitor.ui.activities.IntroActivity;
import com.mikhaellopez.circularimageview.CircularImageView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.common.Consts;
import com.bumptech.glide.Glide;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.sdsmdg.tastytoast.TastyToast;

import java.util.Objects;

/**
 * A simple {@link Fragment} subclass.
 */
public class StudentProfileFragment extends Fragment {
    private TextView fullNameTxt,emailTxt ,phoneNumberTxt ,firstNameTxt, lastNameTxt, indexTxt, isCRepTxt, isEmailVerifiedTxt;
    private CircularImageView circleImageView;
    private Button logoutBtn;
    private FloatingActionButton editFab;
    private NestedScrollView nestedScrollView;
    private ProgressBar loadProfile;
    private SharedPreferences sharedPreferences,  authPrefs;

    public StudentProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_student_profile, container, false);

        //initUI
        initUI(view);
        sharedPreferences = Objects.requireNonNull(this.getActivity()).getSharedPreferences(Consts.CURRENT_USER_SHARED_PREFS, Context.MODE_PRIVATE);
        authPrefs = Objects.requireNonNull(this.getActivity()).getSharedPreferences(Consts.AUTH_SHARED_PREFS, Context.MODE_PRIVATE);

        logoutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TastyToast.makeText(getContext(), "Sad to see you go...", TastyToast.LENGTH_LONG, TastyToast.INFO)
                        .show();
                sharedPreferences.edit()
                        .remove(Consts.CURRENT_USER_EMAIL)
                        .remove(Consts.CURRENT_USER_INDEX)
                        .remove(Consts.CURRENT_USER_FIRST_NAME)
                        .remove(Consts.CURRENT_USER_LAST_NAME)
                        .remove(Consts.CURRENT_USER_AVATAR)
                        .remove(Consts.CURRENT_USER_CREP)
                        .remove(Consts.CURRENT_USER_PHONE)
                        .apply();
                authPrefs.edit()
                        .remove(Consts.AUTH_TOKEN)
                        .remove(Consts.IS_LOGGED_IN)
                        .remove(Consts.IS_STUDENT)
                        .remove(Consts.IS_LECTURER)
                        .apply();

                Intent intent = new Intent(StudentProfileFragment.this.getActivity(), IntroActivity.class);
                startActivity(intent);
                Objects.requireNonNull(getActivity()).finish();
            }
        });

        editFab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //todo: edit student profile
            }
        });

        return view;
    }

    @SuppressLint("RestrictedApi")
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        //get user details from shared preferences
        String email = sharedPreferences.getString(Consts.CURRENT_USER_EMAIL, "");
        String phone = sharedPreferences.getString(Consts.CURRENT_USER_PHONE, "");
        String fName = sharedPreferences.getString(Consts.CURRENT_USER_FIRST_NAME, "");
        String lName = sharedPreferences.getString(Consts.CURRENT_USER_LAST_NAME, "");
        String index = sharedPreferences.getString(Consts.CURRENT_USER_INDEX, "");
        String avatar = sharedPreferences.getString(Consts.CURRENT_USER_AVATAR, "");
        boolean isEV = sharedPreferences.getBoolean(Consts.CURRENT_USER_EMAIL_VERIFIED, false);
        boolean isRep = sharedPreferences.getBoolean(Consts.CURRENT_USER_CREP, false);

        //set profile view texts and profile image
        fullNameTxt.setText(String.format("%s %s", fName, lName));
        firstNameTxt.setText(fName);
        lastNameTxt.setText(lName);
        emailTxt.setText(email);
        phoneNumberTxt.setText(phone);
        indexTxt.setText(index);
        isEmailVerifiedTxt.setText(String.valueOf(isEV));
        isCRepTxt.setText(String.valueOf(isRep));

        if(!avatar.isEmpty()) {
            Glide.with(view)
                    .load(avatar)
                    .into(circleImageView);
        } else {
            Glide.with(view)
                    .load(R.drawable.user)
                    .into(circleImageView);
        }

        //make fab and view visible
        nestedScrollView.setVisibility(View.VISIBLE);
        editFab.setVisibility(View.VISIBLE);
        loadProfile.setVisibility(View.GONE);
    }

    private void initUI(View view){
        fullNameTxt = view.findViewById(R.id.fullNameTxt);
        firstNameTxt = view.findViewById(R.id.firstNameTxt);
        lastNameTxt = view.findViewById(R.id.lastNameTxt);
        phoneNumberTxt = view.findViewById(R.id.phoneNumberTxt);
        emailTxt = view.findViewById(R.id.emailTxt);
        indexTxt = view.findViewById(R.id.indexTxt);
        isCRepTxt = view.findViewById(R.id.isClassRepTxt);
        isEmailVerifiedTxt = view.findViewById(R.id.isEmailVerifiedTxt);
        circleImageView = view.findViewById(R.id.profileImg);
        logoutBtn = view.findViewById(R.id.logoutBtn);
        editFab = view.findViewById(R.id.editFab);
        loadProfile = view.findViewById(R.id.loadProfile);
        nestedScrollView = view.findViewById(R.id.nested_content);
    }
}
