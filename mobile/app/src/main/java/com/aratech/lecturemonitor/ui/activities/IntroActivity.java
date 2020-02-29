package com.aratech.lecturemonitor.ui.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.viewpager.widget.PagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.aratech.lecturemonitor.R;
import com.aratech.lecturemonitor.ui.activities.lecturers.LecturerLoginActivity;
import com.aratech.lecturemonitor.ui.activities.students.StudentLoginActivity;
import com.aratech.lecturemonitor.utils.Tools;

import java.util.Objects;

public class IntroActivity extends AppCompatActivity {
    private static int MAX_STEP = 4;

    private ViewPager viewPager;
    private Button btnNext;

    //titles for the intro screen
    private String[] about_title_array = {
            "Take charge with your phone",
            "Important notifications only",
            "Highly encrypted attendance system",
            "Plan for the exam"
    };
    private String[] about_description_array = {
            "Take control of your academic life with your phone today",
            "Curated notifications to make sure you don't miss anything related to lectures, assignments, etx",
            "A smart and highly secured QR code based attendance system",
            "All to equip you as you journey to the final day!!!",
    };
    // images for the intro screen
    private int[] about_images_array = {
            R.drawable.img_wizard_1,
            R.drawable.img_wizard_2,
            R.drawable.img_wizard_3,
            R.drawable.img_wizard_4
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intro);

        initComponent();
        Tools.setSystemBarColor(this, R.color.grey_5);
        Tools.setSystemBarLight(this);
    }

    //initialize the ui elements
    private void initComponent(){
        viewPager = findViewById(R.id.view_pager);
        btnNext = findViewById(R.id.btn_next);

        //add bottom progress dots
        bottomProgressDots(0);

        /*set up adapter
        *it is related to the splash and intro screen
        */
        IntroPagerAdapter introPagerAdapter = new IntroPagerAdapter();
        viewPager.setAdapter(introPagerAdapter);
        viewPager.addOnPageChangeListener(viewPagerChangeListener);
        btnNext.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int current = viewPager.getCurrentItem() + 1;
                if (current < MAX_STEP) {
                    // move to next screen
                    viewPager.setCurrentItem(current);
                } else {
                    showCustomDialog();
                }
            }
        });
    }

    private void bottomProgressDots(int current_index) {
        LinearLayout dotsLayout = findViewById(R.id.dotsLayout);
        ImageView[] dots = new ImageView[MAX_STEP];

        dotsLayout.removeAllViews();
        for (int i = 0; i < dots.length; i++) {
            dots[i] = new ImageView(this);
            int width_height = 15;
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(new ViewGroup.LayoutParams(width_height, width_height));
            params.setMargins(10, 10, 10, 10);
            dots[i].setLayoutParams(params);
            dots[i].setImageResource(R.drawable.shape_circle);
            dots[i].setColorFilter(getResources().getColor(R.color.grey_20), PorterDuff.Mode.SRC_IN);
            dotsLayout.addView(dots[i]);
        }

        if (dots.length > 0) {
            dots[current_index].setImageResource(R.drawable.shape_circle);
            dots[current_index].setColorFilter(getResources().getColor(R.color.colorPrimary), PorterDuff.Mode.SRC_IN);
        }
    }

    private void showCustomDialog() {
        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE); // before
        dialog.setContentView(R.layout.dialog_info);
        dialog.setCancelable(true);

        WindowManager.LayoutParams lp = new WindowManager.LayoutParams();
        lp.copyFrom(Objects.requireNonNull(dialog.getWindow()).getAttributes());
        lp.width = WindowManager.LayoutParams.WRAP_CONTENT;
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;


        dialog.findViewById(R.id.bt_lecturer).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(IntroActivity.this, LecturerLoginActivity.class);
                startActivity(intent);
            }
        });

        dialog.findViewById(R.id.bt_student).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(IntroActivity.this, StudentLoginActivity.class);
                startActivity(intent);
            }
        });

        dialog.show();
        dialog.getWindow().setAttributes(lp);
    }

    ViewPager.OnPageChangeListener viewPagerChangeListener = new ViewPager.OnPageChangeListener() {
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

        }

        //
        @Override
        public void onPageSelected(int position) {
            bottomProgressDots(position);

            if(position == about_title_array.length -1){
                btnNext.setText(getString(R.string.CONTINUE));
                btnNext.setBackgroundColor(getResources().getColor(R.color.colorPrimary));
                btnNext.setTextColor(getResources().getColor(android.R.color.white));
            } else {
                btnNext.setText(getString(R.string.NEXT));
                btnNext.setBackgroundColor(getResources().getColor(R.color.grey_10));
                btnNext.setTextColor(getResources().getColor(R.color.grey_90));
            }
        }

        @Override
        public void onPageScrollStateChanged(int state) {

        }
    };


    /**
     * View pager adapter
     */
    public class IntroPagerAdapter extends PagerAdapter {

        IntroPagerAdapter() {
        }

        @NonNull
        @Override
        public Object instantiateItem(@NonNull ViewGroup container, int position) {
            LayoutInflater layoutInflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);

            assert layoutInflater != null;
            View view = layoutInflater.inflate(R.layout.item_intro, container, false);
            ((TextView) view.findViewById(R.id.title)).setText(about_title_array[position]);
            ((TextView) view.findViewById(R.id.description)).setText(about_description_array[position]);
            ((ImageView) view.findViewById(R.id.image)).setImageResource(about_images_array[position]);
            container.addView(view);

            return view;
        }

        @Override
        public int getCount() {
            return about_title_array.length;
        }

        @Override
        public boolean isViewFromObject(@NonNull View view, @NonNull Object obj) {
            return view == obj;
        }


        @Override
        public void destroyItem(ViewGroup container, int position, @NonNull Object object) {
            View view = (View) object;
            container.removeView(view);
        }
    }
}
