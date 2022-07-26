import React, {useEffect, useState} from 'react'
import './ClassTeacher.css'
import TeacherService from '../../../config/service/TeacherService'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const ClassTeacher = () => {
  useEffect(() =>{
    TeacherService.getStudents().then(res =>console.log(res))
  },[])
  return (
    <div className="class-teacher">
      <header>
          <div className="title">
            <h4>List Student Of The Class 3A.</h4>
            <h4>Total: 39</h4>
          </div>
      </header>
      <div className="table-content">
                <table id="table">
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Date of Birth</th>
                            <th>Parent name</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyen Huu Dinh</td>
                            <td>20/10/2001</td>
                            <td>Nguyen Huu Hong Phuc</td>
                            <td>0362850450</td>
                            <td>216 Nguyen Phuoc Lan</td>
                            <td><button>Detail</button></td>
                        </tr>
                        <tr>
                            <td>Nguyen Huu Dinh</td>
                            <td>20/10/2001</td>
                            <td>Nguyen Huu Hong Phuc</td>
                            <td>0362850450</td>
                            <td>216 Nguyen Phuoc Lan</td>
                            <td><button>Detail</button></td>
                        </tr>
                        <tr>
                            <td>Nguyen Huu Dinh</td>
                            <td>20/10/2001</td>
                            <td>Nguyen Huu Hong Phuc</td>
                            <td>0362850450</td>
                            <td>216 Nguyen Phuoc Lan</td>
                            <td><button>Detail</button></td>
                        </tr>
                        <tr>
                        <td>Nguyen Huu Dinh</td>
                            <td>20/10/2001</td>
                            <td>Nguyen Huu Hong Phuc</td>
                            <td>0362850450</td>
                            <td>216 Nguyen Phuoc Lan</td>
                            <td><button>Detail</button></td>
                        </tr>
                        <tr>
                        <td>Nguyen Huu Dinh</td>
                            <td>20/10/2001</td>
                            <td>Nguyen Huu Hong Phuc</td>
                            <td>0362850450</td>
                            <td>216 Nguyen Phuoc Lan</td>
                            <td><button>Detail</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
     </div>
  )
}

export default ClassTeacher