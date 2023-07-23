import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar2";
import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
  } from "firebase/firestore";
  const stockitemsref = collection(db, "Stock_Items");

function StaffView(){
    const [data, setData] = useState([]);

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
    return(
        <>
            <section>
                <div className="row">
                    <Sidebar></Sidebar>
                    <div className="col-lg-11 col-10">
                        <h1 className="admin">Staff Panel</h1>
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
                                      <td >{item.category}</td>
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

export default StaffView;