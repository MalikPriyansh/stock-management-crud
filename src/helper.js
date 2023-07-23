import React, { useEffect, useState } from 'react';
import { db } from "./firebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
const stockitemsref = collection(db,"Stock_Items");

function App(){

    const[data,setData] = useState([]);

    const addItem = (newItem)=>{
        return addDoc(stockitemsref, newItem);
    }

    const updateItem = (id, updateItem) => {
        const itemdoc = doc(db,"Stock_Items",id);
        return updateDoc(itemdoc,updateItem);
    }

    const deleteItem = (id) => {
        const itemdoc = doc(db,"Stock_Items",id);
        return deleteDoc(itemdoc);
    }

    const getAllItems = ()=>{
        return getDocs(stockitemsref);
    }

    const getItem = (id)=>{
        const itemdoc = doc(db,"Stock_Items",id);
        return getDoc(itemdoc);
    }

    useEffect(()=>{
        getItems();
    },[])

    const getItems = async()=>{
        const records = await getAllItems();
        setData(records.docs.map((doc)=>({ ...doc.data(), id: doc.id })));
        console.log(data);
    }

    const deleteHandler = async(id)=>{
        await deleteItem(id);
        getAllItems();
    }

    const[category,setCategory] = useState("");
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[price,setPrice] = useState(0);

    function onChangeHandler(e){
        const value = e.target.value;
        if(e.target.id=='1') setCategory(value);
        if(e.target.id=='2') setName(value);
        if(e.target.id=='3') setDescription(value);
        if(e.target.id=='4') setPrice(value);
    }

    const onClickHandler = async(e)=>{
        e.preventDefault();
        const newItem = {
            name,
            description,
            price,
            category
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
    }

    return (
        <>
            <div>
                <input id='1' placeholder='Enter Category' type='text' onChange={onChangeHandler}/><br/>
                <input id='2' placeholder='Enter Name' type='text' onChange={onChangeHandler}/><br/>
                <input id='3' placeholder='Enter description' type="text" onChange={onChangeHandler}/><br/>
                <input id='4' placeholder='Enter price' type="number" onChange={onChangeHandler}/><br/>
                <input type='submit' placeholder='SUBMIT' onClick={onClickHandler}/>
            </div>
            <div>
                {data.map((item)=>{
                    return (
                        <>
                            <p>{item.category}</p>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.description}</p>
                            <br />
                        </>
                    )
                })}
            </div>
        </>
    );
}

export default App;

