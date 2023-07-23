import React, { useState } from "react";
import Overlay from "react-overlay-component";
import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
  const stockitemsref = collection(db, "Stock_Items");

function Sidebar(){

    const [modalOpened,setmodalOpened] = useState(false);
    const animate = true;

    const {user , logOut} = useUserAuth();

    const addItem = (newItem) => {
        return addDoc(stockitemsref, newItem);
    };


    const onClickHandler = async(e)=>{
        e.preventDefault();
            const newItem = {
                name,
                description,
                price,
                category,
                stock
            }

            try{
                await addItem(newItem);
                alert("Item has been added successfully")
            }catch{
                alert("Error has been occured");
            }

            setCategory("");
            setDescription("");
            setName("");
            setPrice(0);
            setStock(0);
    }


    const enableForm=()=>{
        console.log("Entered");
        setmodalOpened(true);
        console.log(modalOpened);
    }

    const closeOverlay = ()=>{
        setmodalOpened(false);
        
    }

    const[category,setCategory] = useState("");
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[stock,setStock] = useState(0);
    const[price,setPrice] = useState(0);

    const onChangeHandler = (e)=>{
        const value = e.target.value;
        if(e.target.id=="1") setCategory(value);
        if(e.target.id=='2') setName(value);
        if(e.target.id=='3') setStock(value);
        if(e.target.id=='4') setPrice(value);
        if(e.target.id=='5') setDescription(value);
    }

    const logoutHandle = async() => {
        try{
            await logOut();
        }catch(err){
            console.log(err.message);
        }
    }

    return(
        <div className="col-lg-1 col-2 sidebarbg">
            <div className="row">
                <div className="col-12">
                    <img className="timer" src="images/plus.png" onClick={enableForm}/>
                    <Overlay configs={animate} isOpen={modalOpened} closeOverlay={closeOverlay} >
                        <p className="information">NEW <span className="bolding">INVENTORY</span></p>
                        <div className="formadj">
                        <div className="row">
                            <div className="col-6">
                                <input id="1" className="form1" type="text" placeholder="Enter Category" onChange={onChangeHandler} /> <br />
                            </div>
                            <div className="col-6">
                                <input id='2' className="form1" type="text" placeholder="Enter Name" onChange={onChangeHandler} /> <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input id='3' className="form" type="number" placeholder="Enter Stock" onChange={onChangeHandler} /> <br />
                            </div>
                            <div className="col-6">
                                <input id='4' className="form" type="number" placeholder="Enter Price" onChange={onChangeHandler} /> <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input id='5' className="form" type="text" placeholder="Enter Description" onChange={onChangeHandler} /> <br /> 
                            </div>
                            <div className="col-6">
                                <input className="form" type="submit" placeholder="Add" onClick={onClickHandler} /> <br /> 
                            </div>
                        </div>
                        </div>
                    </Overlay>
                </div>
                <div className="col-12">
                    <img className="logout" src="images/logout.png" onClick={logoutHandle}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;