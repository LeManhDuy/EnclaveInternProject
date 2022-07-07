import React from 'react'
import './NotFound.css'
import ROUTES from "../../constants/routes";
import { useHistory } from "react-router-dom";

function NotFound() {
    const history = useHistory();
    const HandleBackToHome = () => {
        history.push(ROUTES.HOME_PAGE.path)
    }
    return (
        <div>
            404
            <button onClick = {HandleBackToHome}>Back to Home</button>
        </div>
    )
}

export default NotFound