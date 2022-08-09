require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWTandTeacher')
const verifyJWTParent = require('../middleware/verifyJWTandParent')
const Teacher = require('../model/Teacher')
const Parent = require('../model/Parents')
const Student = require('../model/Student')
const Class = require('../model/Class')
const PublicNotification = require("../model/PublicNotification")
const PrivateNotification = require("../model/PrivateNotification")
const {now} = require("mongoose");

// @route POST api/notification/
// @desc create notification
// @access Private
router.post('/', async (req, res) => {
    let {
        title,
        content,
    } = req.body
    //Validation
    if (!title && !content)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please fill in complete information'
            })
    try {
        let date = now().toString()
        const newNotification = new PublicNotification({
            notification_title: title,
            notification_date: date,
            notification_content: content,
        })
        await newNotification.save()
        res.json({
            success: true,
            message: 'Create notification successfully',
            type: "public",
            title: newNotification.notification_title,
            content: newNotification.notification_content,
            date: newNotification.notification_date,
        })
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route POST api/notification/{{ teacher_id }}&{{ parent_id }}
// @desc create notification
// @access Private
router.post('/:teacher_id&:parent_id', async (req, res) => {
    const {teacher_id, parent_id} = req.params
    let {
        title,
        content,
    } = req.body
    //Validation
    if (!title && !content)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please fill in complete information'
            })

    try {
        let date = now().toString()
        const teacher = await Teacher.findById(teacher_id)
        if (!teacher) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Teacher is not existing!"
                })
        }
        const parent = await Parent.findById(parent_id)
        if (!parent) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Parent is not existing!"
                })
        }
        const newNotification = new PrivateNotification({
            notification_title: title,
            notification_date: date,
            notification_content: content,
            teacher_id: teacher,
            parent_id: parent
        })
        await newNotification.save()
        teacher.notifications.push(newNotification._id)
        parent.notifications.push(newNotification._id)
        await teacher.save()
        await parent.save()

        res.json({
            success: true,
            message: 'Create notification successfully',
            type: "private",
            title: newNotification.notification_title,
            content: newNotification.notification_content,
            date: newNotification.notification_date,
            teacher: teacher.teacher_name,
            parent: parent.parent_name
        })
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route POST api/notification/
// @desc create notification to class
// @access Private
router.post('/notification-to-class/:classID',verifyJWT, async (req, res) => {
    const {
        classID
    } = req.params
    let {
        title,
        content,
    } = req.body
    const classDB = await Class.findById(classID)
    //Validation
    if (!classDB)
        return res
            .status(404)
            .json({
                success: false,
                message: "Class is not existing!"
            })
    if (!title && !content)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please fill in complete information'
            })
    try {
        const teacher = await Teacher.findById(classDB.teacher_id)
        if (!teacher) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Teacher is not existing!"
                })
        }
        let newNotification
        let studentDB
        let parent
        for (let student of classDB.students) {
            studentDB = await Student.findById(student)
            parent = await Parent.findById(studentDB.parent_id)
            let date = now().toString()
            newNotification = new PrivateNotification({
                notification_title: title,
                notification_date: date,
                notification_content: content,
                teacher: teacher.teacher_name,
                parent: parent.parent_name
            })
            await newNotification.save()
            teacher.notifications.push(newNotification._id)
            parent.notifications.push(newNotification._id)
            await teacher.save()
            await parent.save()
        }
        res.json({
            success: true,
            message: 'Create notification successfully',
            type: "private",
            title: newNotification.notification_title,
            content: newNotification.notification_content,
            date: newNotification.notification_date,
        })
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route GET api/notification/
// @desc get public notification
// @access public
router.get('/', async (req, res) => {
    try {
        let showNotification = []
        const notifications = await PublicNotification.find({})
        for (let notification of notifications) {
            showNotification.push({
                id: notification._id,
                title: notification.notification_title,
                content: notification.notification_content,
                date: notification.notification_date,
            })
        }
        res.json({
            success: true,
            notifications: showNotification
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route GET api/notification/
// @desc get by id notification
// @access public
router.get('/:notification_id', async (req, res) => {
    const {notification_id} = req.params
    let notification
    let publicNotification = await PublicNotification.findById(notification_id)
    let privateNotification = await PrivateNotification.findById(notification_id)
    if (publicNotification) {
        notification = await PublicNotification.findById(notification_id)
    }
    else if (privateNotification) {
        notification = await PrivateNotification.findById(notification_id)
    }
    if (!publicNotification&&!privateNotification) {
        return res
            .status(404)
            .json({
                success: false,
                message: "notification is not existing!"
            })
    }
    try {
        res.json({
            success: true,
            notifications: notification
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route GET api/notification/teacher/{{ teacher_id }}
// @desc get private notification of teacher
// @access Private
router.get('/teacher/:teacher_id', verifyJWT, async (req, res) => {
    const {teacher_id} = req.params
    try {
        const teacher = await Teacher.findById(teacher_id)
        if (!teacher) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Teacher is not existing!"
                })
        }
        const arrNotification = []
        teacher.notifications.map(item => {
            arrNotification.push(item._id)
        })
        let showNotification = []
        const notifications = await PrivateNotification.find({'_id': arrNotification})
        for (let notification of notifications) {
            notification = await notification.populate('parent_id',['parent_name'])
            showNotification.push({
                id: notification._id,
                title: notification.notification_title,
                content: notification.notification_content,
                date: notification.notification_date,
                parent: notification.parent_id.parent_name,
                teacher: teacher.teacher_name
            })
        }
        res.json({
            success: true,
            notifications: showNotification
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route GET api/notification/my-notification/{{ teacher_id }}&{{ parent_id }}
// @desc get private notification of teacher
// @access Private
router.get('/my-notification/:teacher_id&:parent_id', verifyJWTParent, async (req, res) => {
    const {teacher_id,parent_id} = req.params
    try {
        const teacher = await Teacher.findById(teacher_id)
        if (!teacher) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Teacher is not existing!"
                })
        }
        const arrNotification = []
        teacher.notifications.map(item => {
            arrNotification.push(item._id)
        })
        let showNotification = []
        const notifications = await PrivateNotification.find({'_id': arrNotification})
        for (let notification of notifications) {
            notification = await notification
            if (notification.parent_id.toString() === parent_id.toString()){
                showNotification.push({
                    id: notification._id,
                    title: notification.notification_title,
                    content: notification.notification_content,
                    date: notification.notification_date,
                    teacher: teacher.teacher_name
                })
            }
        }
        res.json({
            success: true,
            notifications: showNotification
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route GET api/notification/parent/{{ parent_id }}
// @desc get private notification by parent
// @access Private
router.get('/parent/:parent_id', verifyJWTParent, async (req, res) => {
    const {parent_id} = req.params
    try {
        const parent = await Parent.findById(parent_id)
        if (!parent) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Parent is not existing!"
                })
        }
        const arrNotification = []
        parent.notifications.map(item => {
            arrNotification.push(item._id)
        })
        let showNotification = []
        const notifications = await PrivateNotification.find({'_id': arrNotification})
        for (let notification of notifications) {
            notification = await notification.populate('teacher_id',['teacher_name'])
            showNotification.push({
                id: notification._id,
                title: notification.notification_title,
                content: notification.notification_content,
                date: notification.notification_date,
                completed: notification.is_completed,
                teacher: notification.teacher_id.teacher_name
            })
        }
        res.json({
            success: true,
            notifications: showNotification
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route PUT api/notification/public/{{ notification_id }}
// @desc update public notification
// @access Private
router.put('/public/:notification_id', verifyJWT,  async (req, res) => {
    const {
        notification_id
    } = req.params
    let {
        title,
        content,
        isCompleted
    } = req.body
    const notification = await PublicNotification.findById(notification_id)
    if (!notification) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Notification not found"
            })
    }
    try {
        let date = now().toString()
        if (!title)
            title = notification.notification_title
        if (!content)
            content = notification.notification_content
        if (!isCompleted)
            isCompleted = notification.is_completed
        let updateNotification = {
            notification_title:title,
            notification_content:content,
            notification_date:date,
            is_completed:isCompleted
        }
        const notificationUpdateCondition = {_id:notification_id, user:req.userId}
        updatedNotification = await PublicNotification.findOneAndUpdate(notificationUpdateCondition, updateNotification, {new: true})
        if (!notificationUpdateCondition) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Notification not found"
                })
        }
        res.json({
            success: true,
            message: 'Updated',
            id: updateNotification._id,
            title: updateNotification.notification_title,
            content: updateNotification.notification_content,
            date: updateNotification.notification_date,
            completed: updateNotification.is_completed,
        })
    } catch (error) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route PUT api/notification/private/{{ notification_id }}
// @desc update private notification
// @access Private
router.put('/private/:notification_id', verifyJWT,  async (req, res) => {
    const {
        notification_id
    } = req.params
    let {
        title,
        content,
        isCompleted
    } = req.body
    const notification = await PrivateNotification.findById(notification_id)
    if (!notification) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Notification not found"
            })
    }
    try {
        let date = now().toString()
        if (!title)
            title = notification.notification_title
        if (!content)
            content = notification.notification_content
        if (!isCompleted)
            isCompleted = notification.is_completed
        let updateNotification = {
            notification_title:title,
            notification_content:content,
            notification_date:date,
            is_completed:isCompleted
        }
        const notificationUpdateCondition = {_id:notification_id, user:req.userId}
        updatedNotification = await PrivateNotification.findOneAndUpdate(notificationUpdateCondition, updateNotification, {new: true})
        if (!notificationUpdateCondition) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Notification not found"
                })
        }
        res.json({
            success: true,
            message: 'Updated!',
            title: updateNotification.notification_title,
            content: updateNotification.notification_content,
            date: updateNotification.notification_date,
            completed: updateNotification.is_completed,
        })
    } catch (error) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route DELETE api/notification/public/{{ notification_id }}
// @desc delete public notification
// @access Private
router.delete('/public/:id', verifyJWT, async (req, res) => {
    try {
        const notificationDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        }
        const notification = await PublicNotification.findById(notificationDeleteCondition._id)
        if (!notification) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Notification not found!"
                })
        }
        const deleteNotification = await PublicNotification.findOneAndDelete(notificationDeleteCondition)
        if (!deleteNotification) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Notification not found!"
                })
        }

        res.json({
            success: true,
            message: "Deleted!",
            subject: deleteNotification
        })
    } catch (e) {
        return res
            .status(500)
            .json({
                success: false,
                message: e
            })
    }
})

// @route DELETE api/notification/private/{{ notification_id }}
// @desc delete private notification
// @access Private
router.delete('/private/:id', verifyJWT, async (req, res) => {
    try {
        const notificationDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        }
        const notification = await PrivateNotification.findById(notificationDeleteCondition._id.toString())
        if (!notification) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Notification not found"
                })
        }

        // xoa notification ra khoi teacher
        const teacher = await Teacher.findById(notification.teacher_id.toString())
        if (!teacher) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Teacher not found"
                })
        }
        teacher.notifications = teacher.notifications.filter(item => item._id.toString() !== notification._id.toString())
        await teacher.save()

        // xoa notification ra khoi parent
        const parent = await Parent.findById(notification.parent_id.toString())
        if (!parent) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Teacher not found"
                })
        }
        parent.notifications = parent.notifications.filter(item => item._id.toString() !== notification._id.toString())
        await parent.save()

        const deleteNotification = await PrivateNotification.findOneAndDelete(notificationDeleteCondition)
        if (!deleteNotification) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Notification not found!"
                })
        }

        res.json({
            success: true,
            message: "Deleted!",
            subject: deleteNotification
        })
    } catch (e) {
        return res
            .status(500)
            .json({
                success: false,
                message: e
            })
    }
})
module.exports = router