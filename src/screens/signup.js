import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth } from "../firebaseConfig";

function Signup(){

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");

    const { signup } = useUserAuth();

    const navigate = useNavigate();

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try{
            await signup(email, password);
            navigate("/");
        }catch(err){
            console.log(err.message);
            setError(err.message);
        }
    }

    return (
    <>
    <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <div className="p-4 box">
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="mb-3">Firebase Auth Login</h2>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>
                <hr />
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-4">
                        <div>
                            <GoogleButton className="g-btn" type="dark"></GoogleButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account ? <Link to="/login">login</Link>
            </div>
        </div>
        <div className="col-4"></div>
    </div>
    </>
    );
}

export default Signup;