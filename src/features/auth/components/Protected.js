import React from 'react';
import {selectedLoggedInUser} from "../authSlice";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Protected = ({children}) => {
    const user = useSelector(selectedLoggedInUser)
    if(!user){
        return <Navigate to='/login'/>
    }
    else{
        return children
    }
    // return (
    //     if(!user){
    //         Na
    //     }
    //     <div>
    //
    //     </div>
    // );
};

export default Protected;