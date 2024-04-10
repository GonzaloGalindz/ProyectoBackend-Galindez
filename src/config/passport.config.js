import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import { usersModel } from "../dao/models/users.model.js";
import { compareData, hashData } from "../utils.js";

passport.use(
  "register",
  new local.Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      try {
        let { nombre, email } = req.body;
        if (!nombre || !email) {
          return done(null, false);
        }

        let existingUser = await usersModel.findOne({ email });
        if (existingUser) {
          return done(null, false);
        }

        const hashPassword = await hashData(password);

        let newUser = await usersModel.create({
          first_name,
          last_name,
          email,
          password: hashPassword,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new local.Strategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        let user = await usersModel.findOne({ email: username });
        if (!user) {
          return done(null, false);
        }

        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          return done(null, false);
        }

        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new github.Strategy(
    {
      clientID: "completar",
      clientSecret: "completar",
      callbackURL: "http://localhost:8080/api/sessions/callbackGithub",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let first_name = profile._json.name.split(" ")[0];
        let last_name = profile._json.name.split(" ")[1];
        let email = profile._json.email;
        if (!email) {
          return done(null, false);
        }
        let user = await usersModel.findOne({ email });
        if (!user) {
          user = await usersModel.create({
            first_name,
            last_name,
            email,
            profileGithub: profile,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  return done(null, usuario._id);
});

passport.deserializeUser((usuario, done) => {
  return done(null, usuario);
});
