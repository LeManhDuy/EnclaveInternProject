import React, {useEffect} from "react";
import './Teacher.css';
import { useHistory } from "react-router-dom"
import ROUTES from "../../constants/routes"
import AuthenticationService from "../../config/service/AuthenticationService"

function Teacher() {    
    const history = useHistory();
    useEffect(() => {
        if((AuthenticationService.isLogin()&&JSON.parse(localStorage.getItem('@Login')).role === "parent")||
        (AuthenticationService.isLogin()&&JSON.parse(localStorage.getItem('@Login')).role === "admin"))
        {
            history.push(ROUTES.HOME_PAGE.path)
        }
    },[])
    return(
        <div>Teacher</div>
    )
}

export default Teacher;