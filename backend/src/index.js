import express from "express"
import "dotenv/config"
import path from "path"
import { tasksRouter } from "./Routes/tasks.js"
import { monthProgressRouter } from "./Routes/monthProgress.js"
import { settingsRouter } from "./Routes/settings.js"
import "./Helpers/auth.js"
import passport from "passport"
import session, { MemoryStore } from "express-session"
import { isLoggedIn } from "./Middlewares/user.js"
import { statsRouter } from "./Routes/userProgress.js";
import cors from "cors" 



const app = express()
const PORT = 8080

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    credentials: true
}
app.use(cors(corsOptions))

app.set("trust proxy", 1)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
}));
app.use(passport.initialize());
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./src/Views"))

app.use(express.static('./src/Public'))

app.use(tasksRouter)
app.use(statsRouter);
app.use(monthProgressRouter)
app.use(settingsRouter)

app.get("/", isLoggedIn, (req, res) => {
    res.json({
        "username": req.user.username,
        "userProfilePicture": req.user.profile_picture
    })
})

app.get("/auth/google", 
    passport.authenticate('google', {scope: ['email', 'profile']}),
);

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
    }),
    (req, res) => {
        console.log("Authenticated?", req.isAuthenticated());
        console.log("User:", req.user);
        console.log("Session:", req.session);

        res.redirect(process.env.FRONTEND_URL);
    }
)

app.get('/auth/failure', (req, res) => {
    res.send("something went wrong")
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.username}`);
});

app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err);}
        req.session.destroy();
        res.redirect(process.env.FRONTEND_URL);
    });
});


app.use((req, res, next) => {
    res.status(404).send("Page not Found.")
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
