function authTeacher(role) {
    return (req, res, next) => {
        var roleAuth = "Teacher"
        if (role !== roleAuth)
            return res.status(401).send("Don't have an allowance to access this domain");
        next()
    }
}

module.exports = { authTeacher }