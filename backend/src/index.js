import express from "express"
import "dotenv/config"
import path from "path"
import { tasksRouter } from "./Routes/tasks.js"
import { monthProgressRouter } from "./Routes/monthProgress.js"
import "./Helpers/auth.js"
import passport from "passport"
import session, { MemoryStore } from "express-session"
import { isLoggedIn } from "./Middlewares/user.js"
import cors from "cors" 


const app = express()
const PORT = 8080

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true
}
app.use(cors(corsOptions))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
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
app.use(monthProgressRouter)

app.get("/testroute", (req, res) => {
    res.json({
        myData: "Hello there, this is from the backend.",
    })
})

app.get("/", isLoggedIn, (req, res) => {
    // res.render('home', {
    //     "username": req.user.username,
    //     "userProfilePicture": req.user.profile_picture
    // })
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
        successRedirect: 'http://localhost:5173',
        failureRedirect: '/auth/failure',
    })
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
        res.redirect('http://localhost:5173');
    });
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
