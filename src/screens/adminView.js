import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { db } from "../firebaseConfig";
import Overlay from "react-overlay-component";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const stockitemsref = collection(db, "Stock_Items");


function AdminView() {
  const [data, setData] = useState([]);
  const [modalOpened,setmodalOpened] = useState(false);
  const animate = true;
  const[item,setCurrentItem] = useState({});

    const closeOverlay = ()=>{
        setmodalOpened(false);    
    }

  const updateItem = (id, updateItem) => {
    const itemdoc = doc(db, "Stock_Items", id);
    return updateDoc(itemdoc, updateItem);
  };

  const deleteItem = (id) => {
    const itemdoc = doc(db, "Stock_Items", id);
    return deleteDoc(itemdoc);
  };

  const getAllItems = () => {
    return getDocs(stockitemsref);
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const records = await getAllItems();
    setData(records.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data);
  };

  const[category,setCategory] = useState("");
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[stock,setStock] = useState(0);
    const[price,setPrice] = useState(0);


  const getItemInfo = (item)=>{
    setmodalOpened(true);
    setCurrentItem(item);
    setCategory(item.category);
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description);
    setStock(item.stock);
  }

  
  const onChangeHandler = (e)=>{
    console.log("Entered");
    const value = e.target.value;
        if(e.target.id=="1") setCategory(value);
        if(e.target.id=='2') setName(value);
        if(e.target.id=='3') setStock(value);
        if(e.target.id=='4') setPrice(value);
        if(e.target.id=='5') setDescription(value);
  }

  const onClickHandler = async(id)=>{
    const updatedItem = {
        name,
        stock,
        description,
        price,
        category
    }

    try{
        await updateItem(id,updatedItem);
        alert("Item has been updated successfully")
    }catch(err){
        console.log(err);
        alert("Error has been occured");
    }
  }

  const onDeleteHandler = async(id)=>{
        
        try{
            await deleteItem(id);
            alert("Item has been deleted successfully")
        }catch(err){
            console.log(err);
            alert("Error has been occured");
        }
  }

  return (
    <>
      <section>
        <div className="row">
            <Overlay configs={animate} isOpen={modalOpened} closeOverlay={closeOverlay}>
            <p className="information">UPDATE/DELETE <span className="bolding">INVENTORY</span></p>
                    <div className="formadj">
                        <div className="row">
                            <div className="col-6">
                                <input id="1" className="form1" type="text" placeholder="Enter Category" value={category} onChange={onChangeHandler} /> <br />
                            </div>
                            <div className="col-6">
                                <input id='2' className="form1" type="text" placeholder="Enter Name" value={name} onChange={onChangeHandler} /> <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input id='3' className="form" type="number" placeholder="Enter Stock" value={stock} onChange={onChangeHandler} /> <br />
                            </div>
                            <div className="col-6">
                                <input id='4' className="form" type="number" placeholder="Enter Price" value={price} onChange={onChangeHandler} /> <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input id='5' className="form" type="text" placeholder="Enter Description" value={description} onChange={onChangeHandler} /> <br /> 
                            </div>
                            <div className="col-6">
                                <input className="form" type="submit" placeholder="UPDATE" onClick={()=>onClickHandler(item.id)} ></input> <br /> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input className="form" type="submit" placeholder="DELETE" onClick={()=>onDeleteHandler(item.id)} /> <br /> 
                            </div>
                        </div>
                    </div>
            </Overlay>
          <Sidebar></Sidebar>
          <div className="col-lg-11 col-10">
            <h1 className="admin">Admin Panel</h1>
            <div className="row">
              <div className="col-lg-12 col-12 setheight">
                <table className="table">
                  <thead>
                    <tr>
                      <th>CATEGORY</th>
                      <th>NAME</th>
                      <th>STOCK</th>
                      <th>PRICE</th>
                      <th>DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="invoiceNo" onClick={()=>getItemInfo(item)}>{item.category} </td>
                          <td>{item.name}</td>
                          <td>{item.stock}</td>
                          <td>{item.price}</td>
                          <td>{item.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminView;
