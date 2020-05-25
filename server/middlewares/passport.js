const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Student = require('../models/Student');
const Lecturer = require('../models/Lecturer');

//jwt options
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

//configure passport
passport.use(
  'jwt',
  new JWTStrategy(opts, async (payload, done) => {
    //check if it's a lecturer
    try {
      const lecturer = await Lecturer.findById(payload.id);
      if (lecturer) {
        done(null, { lecturer });
      } else {
        //check if it's a student
        try {
          const student = await await Student.findById(payload.id).populate(
            'department'
          );
          if (student) {
            done(null, { student });
          }
        } catch (error) {
          done(error);
        }
      }
    } catch (error) {
      console.log(error);
      //check if it's a student
      try {
        const student = await Student.findById(payload.id).populate(
          'department'
        );
        if (student) {
          done(null, { student });
        }
      } catch (error) {
        done(error);
      }
    }
  })
);

module.exports = passport;
