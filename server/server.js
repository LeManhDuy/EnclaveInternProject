require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const adminParentsRouter = require('./routes/parents')
const adminRouterControl = require('./routes/admin')
const authRouter = require('./routes/auth')
const adminTeachersRouter = require('./routes/teacher')
const gradeRouter = require('./routes/grade')
const classRouter = require('./routes/class')
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
const teacherRouter = require('./routes/teacher')
app.use('/authentication', authRouter)
app.use('/api/admin/parents', adminParentsRouter)
app.use('/api/admin/', adminRouterControl)
// app.use('/api/dashboard/', teacherRouter)
//admin
app.use('/api/dashboard/', teacherRouter)
app.use('/api/admin/teachers', adminTeachersRouter)
//admin
//const authRouter = require('./routes/auth')

// app.use('/authentication', authRouter)
//teacher
// const studentRouter = require('./routes/student')
// const classRouter = require('./routes/class')
// app.use('/dashboard/teacher/student', studentRouter)
// app.use('/dashboard/teacher/class', classRouter)

//student
const studentRouter = require('./routes/student')
app.use('/dashboard/teacher/student', studentRouter)
//class
// const classRouter = require('./routes/class')
app.use('/dashboard/teacher/class', classRouter)

// app.use('/api/auth', authRouter)
app.use('/api/admin/parents', adminParentsRouter)
// app.use('/api/dashboard/', teacherRouter)
app.use('/api/grades', gradeRouter)

// login -> dahsboard -> teacher page (neu admin thi khong the den teacherpage) -> student page. 
// app.get('/dashboard', (req, res) => { 
//     res.send('Dashboard page')
// })
// app.get('/', (req, res) => {
//     res.send('Homepage')
// })

//port
const PORT = 8000 
app.listen(PORT, () => console.log(`Server started ${PORT}`))