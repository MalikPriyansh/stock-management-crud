import React, { useState } from "react";
import { useUserAuth } from "../Context/UserAuthContext";

function Sidebar(){

    const {user , logOut} = useUserAuth();

    const logoutHandle = async() => {
        try{
            await logOut();
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="col-lg-1 col-2 sidebarbg">
            <div className="row">
                <div className="col-12">
                    <img className="logout" src="images/logout.png" onClick={logoutHandle}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;