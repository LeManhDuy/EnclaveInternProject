require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const adminParentsRouter = require("./routes/parents");
const adminRouterControl = require("./routes/admin");
const authRouter = require("./routes/auth");
const adminTeachersRouter = require("./routes/teacher");
const subjectRouter = require("./routes/subject");
const classRouter = require("./routes/class");
const gradeRouter = require("./routes/grade");
const protectorRouter = require("./routes/protector");
const studentRouter = require("./routes/student");
const scoreRouter = require("./routes/score");
const summaryRouter = require("./routes/summaryScore");
const scheduleRouter = require("./routes/schedule");
const notificationRouter = require("./routes/notification");
const cors = require("cors");
const app = express();
app.use(express.json());
//Static Image
app.use("/uploads/parents", express.static("uploads/parents"));
app.use("/uploads/teachers", express.static("uploads/teachers"));
app.use("/uploads/protectors", express.static("uploads/protectors"));
app.use("/uploads/students", express.static("uploads/students"));
app.use("/uploads/schedule", express.static("uploads/schedules"));

//database
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@enclave-project.cnfw0.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
connectDB();

//cors
app.use(cors());

//url
//admin
app.use("/api/admin/teachers", adminTeachersRouter);
app.use("/api/admin/parents", adminParentsRouter);
app.use("/api/authentication", authRouter);
app.use("/api/admin/parents", adminParentsRouter);
app.use("/api/admin/", adminRouterControl);
//teacher
// app.use('/api/dashboard/', teacherRouter)
//student
app.use("/api/student", studentRouter);
//class
app.use("/api/teacher/class", classRouter);
//score
app.use("/api/teacher/score", scoreRouter);

// app.use('/api/auth', authRouter)
app.use("/api/admin/parents", adminParentsRouter);
app.use("/api/subjects", subjectRouter);
// app.use('/api/dashboard/', teacherRouter)
//subject
app.use("/api/teacher/subjects", subjectRouter);
//greades
app.use("/api/grades", gradeRouter);
app.use("/api/protectors", protectorRouter);
//summary
app.use("/api/summary", summaryRouter);
//schedule
app.use("/api/schedule", scheduleRouter);
//notification
app.use("/api/notification", notificationRouter);
//port
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started ${PORT}`));
