module.exports = function (req, res, next) {
    // previous middleware function i.e auth sets 
    // req.user , so now we can access it.
    if (!req.user.isAdmin) return res.status(403).send("Acess Denied.");

    next();
}