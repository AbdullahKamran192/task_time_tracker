export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        message: "Not authenticated"
    });
}