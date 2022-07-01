const express = require('express')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')

router.post('/teacher', verifyJWT, authTeacher("Teacher"), (req, res) => {
    res.send('Teacher page')
})

module.exports = router