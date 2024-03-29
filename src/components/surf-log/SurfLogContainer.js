import React from 'react'
import { Link } from "react-router-dom"

import AddSessionForm from './AddSessionForm' 
import EditBoardsForm from './EditBoardsForm' 
import EditSpotsForm from './EditSpotsForm' 
import SessionLog from './SessionLog' 

const SurfLogContainer = () => {

    return (
        <div className="App">
            <Link to="/profile" className="btn btn-primary mt-2 mb-2">My Account</Link>
            <h1>surf log</h1>
            <AddSessionForm/>
            <EditBoardsForm/>
            <EditSpotsForm/>
            <SessionLog/>
        </div>
    )
};
    
export default SurfLogContainer;