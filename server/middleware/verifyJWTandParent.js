const jwt = require('jsonwebtoken')
const Parents = require('../model/Parents')
const { ObjectId } = require('mongodb')
require('dotenv').config()


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send("Don't have an allowance to access this domain");
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).send("Invalid token")//invalid token
            async function checkTeacher() {
                if (await Admin.findById(decoded.adminId)) {
                    req.userId = decoded.adminId;
                    next();
                }
                else {
                    return res.status(401).send("Only teacher can access this page");
                }
            }
            checkTeacher()
        }
    );
}

module.exports = verifyJWT