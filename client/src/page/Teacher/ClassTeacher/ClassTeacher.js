import React, {useEffect, useState} from 'react'
import './ClassTeacher.css'
import TeacherService from '../../../config/service/TeacherService'

const ClassTeacher = () => {
  useEffect(() =>{
    TeacherService.getStudents().then(res =>console.log(res))
  },[])
  return (
    <div className="class-teacher">
      Class teacher
    </div>
  )
}

export default ClassTeacher