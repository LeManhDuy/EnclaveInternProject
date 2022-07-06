function authTeacher(role) {
    return (req, res, next) => {
        switch (role) {
            case "Admin":
                next()
            case "Teacher":
                next()
            case "Parent":
                next()
        }
        return res.status(401).send("Don't have an allowance to access this domain");
    }
}

module.exports = { authTeacher }