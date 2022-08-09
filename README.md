# Enclave Intern Project

## Primary School Management

This is an app that allows parents to observe their kids in the school. For example, they can get the score information, the class, the teacher, and more.

Admin can CRUD Admin Account, Class, Grade, Subject, Student, Schedule.

Teacher can see the class they teach and schedule. Also they can add score for student in their class. 

Demo : https://blue-school.netlify.app/

## How to run project
1. Dowload NodeJS : https://nodejs.org/en/download/
2. Open project in VS Code. Then open terminal.

### With client site :
1. Type : cd client and press enter.
2. Type : npm install and press enter.
3. Go to directory : client/src/config/api/HandleAPI.js -> change const REACT_APP_API_ENDPOINT = "https://blue-school-project.herokuapp.com/" to const REACT_APP_API_ENDPOINT = "http://localhost:8000/". Because I deployed this project before so the first link is the link to BE Server. You should change it to local.
4. Type : npm start.

### With server site:
1. Type : cd server and press enter.
2. Type : npm install and press enter.
3. Type : npm run server.

## Preview :
<table>
    <tr>
        <td><b><p align="center">Home Screen<p></b></td>
        <td><b><p align="center">Login Screen<p></b></td>
        <td><b><p align="center">Admin Screen<p></b></td>
        <td><b><p align="center">CRUD Account<p></b></td>
    </tr>
    <tr>
        <td><img src="https://i.pinimg.com/originals/b6/80/1c/b6801c2ddd33ecb1c61fc15de8c70281.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/originals/84/f4/bb/84f4bb9464eeaabfaee26b7e2ecb936d.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/originals/a2/20/09/a22009dd52612d0677bf2fd524bb1048.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/originals/e1/5b/76/e15b766be194a73a5543b099a42d04e1.jpg" alt="drawing" width="250"/></td>
    </tr>
</table>

<table>
    <tr>
        <td><b><p align="center">Parent Screen<p></b></td>
        <td><b><p align="center">Teacher Screen</b><p></td>
        <td><b><p align="center">Score Information Screen<p></b></td>
        <td><b><p align="center">Notification Screen<p></b></td>
    </tr>
    <tr>
        <td><img src="https://i.pinimg.com/originals/f9/57/d2/f957d247722717802c2048f561982458.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/originals/de/3b/fd/de3bfd60738556985df5ba60470f7b97.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/originals/22/59/3c/22593ceca607b6c5e2fd40f2e618f66e.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/originals/a2/74/12/a27412282d3f4f4894edc0e9e419417c.jpg" alt="drawing" width="250"/></td>
    </tr>
</table>


If you have any questions, feel free contact me at my email address : lemanhduy311111@gmail.com.

Thank you for being here!
