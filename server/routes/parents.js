const express = require('express')
const Parents = require('../model/Parents')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

// @route POST api/admin/parents/create
// @desc Create parents
// @access Private Only Admin

router.post('/', async (req, res) => {
    const {
        parent_name,
        parent_dateofbirth,
        parent_address,
        parent_phone,
        parent_email,
        parent_job,
        parent_gender,
        parent_password,
    } = req.body
    // Validation
    if (!parent_name || !parent_address || !parent_phone || !parent_password) {
        return res.status(400).json({ success: false, message: 'Missing information.Please fill in!' })
    }
    if (parent_phone.length != 10) {
        return res.status(400).json({ success: false, message: 'Phone number must have 10 numbers' })
    }
    try {
        // Good to die
        const hashPassword = await argon2.hash(parent_password)

        const parents = new Parents({
            parent_name,
            parent_dateofbirth,
            parent_address,
            parent_phone,
            parent_email,
            parent_job,
            parent_gender,
            parent_password:hashPassword,
        })
        await parents.save()
        // Return token
        const accessToken = jwt.sign({ userId: parents._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create account successfully', accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }

})

// @route GET api/admin/parents/get
// @desc GET parents
// @access Private Only Admin

router.get('/', async (req, res) => {
    try {
        // Return token
        const allParents = await Parents.find({})
        res.json({ success: true, allParents })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }

})

// @route PUT api/admin/parents/
// @desc Update parents
// @access Private Only Admin
router.put('/:id', async (req, res) => {

    const {
        parent_name,
        parent_dateofbirth,
        parent_address,
        parent_phone,
        parent_email,
        parent_job,
        parent_gender,
        parent_password,
    } = req.body
    // Validation
    if (!parent_name || !parent_address || !parent_phone || !parent_password) {
        return res.status(400).json({ success: false, message: 'Missing information.Please fill in!' })
    }
    if (parent_phone.length != 10) {
        return res.status(400).json({ success: false, message: 'Phone number must have 10 numbers' })
    }
    try {
        const hashPassword = await argon2.hash(parent_password)

        let updateParent = {
            parent_name,
            parent_dateofbirth,
            parent_address,
            parent_phone,
            parent_email,
            parent_job,
            parent_gender,
            parent_password:hashPassword,
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedParent = await Parents.findOneAndUpdate(postUpdateCondition, updateParent, { new: true })

        if (!updateParent)
            return res.status(401).json({ success: false, message: 'Parent not found' })
        res.json({ success: true, message: 'Updated!', parent: updateParent })
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route DELETE api/admin/parents/
// @desc DELETE parents
// @access Private Only Admin
router.delete('/:id', async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedParent = await Parents.findOneAndDelete(postDeleteCondition)

        if (!deletedParent)
            return res.status(401).json({ success: false, message: 'Parent not found' })
        res.json({ success: true, message: 'Deleted!', parent: deletedParent })
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router