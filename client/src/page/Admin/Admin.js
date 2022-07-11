import React, { useEffect } from "react"
import './Admin.css'
import { useHistory } from "react-router-dom"
import ROUTES from "../../constants/routes"
import AdminLayout from "../../layout/AdminLayout/AdminLayout"

function Admin() {
    const history = useHistory()
    useEffect(() => {
        console.log()
        if(JSON.parse(localStorage.getItem('@Login')).role == "parent")
        {
            history.push(ROUTES.HOME_PAGE.path)
        }
    },[])
    return(
        <div>
            <AdminLayout />
        </div>
    )
}

export default Admin;