export function isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect("/auth/google")
}