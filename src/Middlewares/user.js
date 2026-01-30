export function isLoggedIn(req, res, next) {
    req.isAuthenticated() ? next() : res.render("login")
}