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
        <td><img src="https://i.pinimg.com/564x/ac/9c/77/ac9c77be24dcb3b3e5a3df682ff320ca.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/564x/b0/22/b2/b022b28376cb8210c5a14a6af80875e5.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/564x/02/32/d5/0232d52cea01ca0f2f59f96566244fa1.jpg" alt="drawing" width="250"/></td>
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
        <td><img src="https://i.pinimg.com/564x/51/07/ef/5107efe35277159309788e1ff596a81c.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/564x/00/06/1c/00061c52aa87577badaf08d7a863d1dd.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/564x/a3/93/86/a393867b87eae3a15c83eff771c40964.jpg" alt="drawing" width="250"/></td>
        <td><img src="https://i.pinimg.com/564x/33/c4/43/33c443e1880f6c78e7ccd98f4b5acb6f.jpg" alt="drawing" width="250"/></td>
    </tr>
</table>


If you have any questions, feel free contact me at my email address : lemanhduy311111@gmail.com.

Thank you for being here!
