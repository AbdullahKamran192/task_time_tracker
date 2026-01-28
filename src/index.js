import express from "express"
import dotenv  from "dotenv"
import path from "path"
import { tasksRouter } from "./Routes/tasks.js"
import "./Helpers/auth.js"
import passport from "passport"
import session from "express-session"
import { isLoggedIn } from "./Middlewares/user.js"
dotenv.config()

const app = express()
const PORT = 8080

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session())

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./src/Views"))

app.use(express.static('./src/Public'))

app.use(tasksRouter)

app.get("/", (req, res) => {
    res.render('home')
})


app.get("/timetable", (req, res) => {
    res.render('timetable')
})

app.get("/auth/google", 
    passport.authenticate('google', {scope: ['email', 'profile']}),
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/tasks',
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
        res.redirect('/');
    });
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))