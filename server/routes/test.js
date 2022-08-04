const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWTandTeacher");
const Teachers = require("../model/Teacher");