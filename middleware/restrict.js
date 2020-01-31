module.exports = (req, res, next) => {
    if (req.session.isUserLoggedIn) {
        next();
    } else {
        res.status(400).json({
          message: 'No auth cookie found, please login!'
    });
    }
};