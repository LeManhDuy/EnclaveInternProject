# Enclave Intern Project

## Primary School Management

This is an app that allows parents to observe their kids in the school. For example, they can get the score information, the class, the teacher, and more.

Admin can CRUD Admin Account, Class, Grade, Subject, Student, Schedule.

Teacher can see the class they teach and schedule. Also they can add score for student in their class. 

Demo : https://blue-school.netlify.app/

## How to run project
1. Open project in VS Code. Then open terminal.

### With client site :
1. Type : cd client and press enter.
2. Type : npm install and press enter.
3. Go to directory : client/src/config/api/HandleAPI.js -> change const REACT_APP_API_ENDPOINT = "https://blue-school-project.herokuapp.com/" to const REACT_APP_API_ENDPOINT = "http://localhost:8000/". Because I deployed this project before so the first link is the link to BE Server. You should change it to local.
4. Type : npm start.

### With server site:
1. Type : cd server and press enter.
2. Type : npm install and press enter.
3. Type : npm run server.

If you have any questions, feel free contact me at my email address : lemanhduy311111@gmail.com.

Thank you for being here!
