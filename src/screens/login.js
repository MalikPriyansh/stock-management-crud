import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";

function Login(){

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");

    const[isadmin,setIsadmin] = useState(false);

    const { login, googleSignIn } = useUserAuth();

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await login(email, password);
            if(isadmin==true) 
            {
                console.log(isadmin);
                setIsadmin(false);
                navigate("/admin");
            }
          else navigate("/staff");
        }catch(err){
            console.log(err.message);
            setError(err.message);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        
        try {
          await googleSignIn();
          if(isadmin==true) 
          {
            console.log(isadmin);
            setIsadmin(false);
            navigate("/staff");
          }
          else navigate("/staff");
        } catch (error) {
          console.log(error.message);
        }

        
      };

    return (
        <>
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
                <div className="p-4 box">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h2 className="mb-3">Firebase Auth Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        </Form.Group>

                        <div class="form-check text-start my-3">
                          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" onClick={(e)=>{setIsadmin(true)}}/>
                          <label class="form-check-label" for="flexCheckDefault">
                            is Admin
                          </label>
                        </div>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <hr />
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-4">
                            <div>
                                <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn}></GoogleButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 box mt-3 text-center">
                    Dont have an account ? <Link to="/signup">signup</Link>
                </div>
            </div>
            <div className="col-4"></div>
        </div>
        </>
    )
}

export default Login;