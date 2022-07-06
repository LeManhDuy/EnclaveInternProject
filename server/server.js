require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const adminParentsRouter = require('./routes/parents')
const adminRouterControl = require('./routes/admin')
const authRouter = require('./routes/auth')
const adminTeachersRouter = require('./routes/teacher')
const subjectRouter = require('./routes/subject')
const classRouter = require('./routes/class')
const gradeRouter = require('./routes/grade')
const protectorRouter = require('./routes/protector')
const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const cors = require('cors')
const app = express()
app.use(express.json())

//database
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@enclave-project.cnfw0.mongodb.net/?retryWrites=true&w=majority`)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

//cors
app.use(cors())

//url
//admin
app.use('/api/admin/teachers', adminTeachersRouter)
app.use('/api/admin/parents', adminParentsRouter)
app.use('/api/authentication', authRouter)
app.use('/api/admin/parents', adminParentsRouter)
app.use('/api/admin/', adminRouterControl)
//teacher
app.use('/api/dashboard/', teacherRouter)
//student
app.use('/dashboard/teacher/student', studentRouter)
//class
app.use('/dashboard/teacher/class', classRouter)
//subject
app.use('/dashboard/teacher/subjects', subjectRouter)
//greades
app.use('/api/grades', gradeRouter)
app.use('/api/protectors', protectorRouter)

//port
const PORT = 8000
app.listen(PORT, () => console.log(`Server started ${PORT}`))