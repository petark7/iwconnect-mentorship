import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

import "./login.scss";
const firebaseConfig = {
  apiKey: "AIzaSyCnmB0flqjkoqggingviHwriy5lxcrfqVw",
  authDomain: "iwconnect-mentorship.firebaseapp.com",
  projectId: "iwconnect-mentorship",
  storageBucket: "iwconnect-mentorship.appspot.com",
  messagingSenderId: "384055523695",
  appId: "1:384055523695:web:7792f92012ad3a894ed09a",
  measurementId: "G-TJ6DV12JLY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: {errors} 
	} = useForm();

  const formSubmit = (data) => {
	signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
	  toast.success(`Logged in! User: ${JSON.stringify(user)}`)
    })
    .catch((error) => {
	  // On error
	  //   const errorCode = error.code;
	  //   const errorMessage = error.message;
	  toast.error(`Oops, it looks like you entered wrong credentials.`)
    });
  }
  return (
    <>
      <div className="login-mainContainer">
        <div className="loginElements-container">
			<h1 className="login-heading">Login</h1>
          <Form className="login-loginForm" onSubmit={handleSubmit(formSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email', {
					required: 'Email field cannot be empty.',
					pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,	
				}
					)}
              />
			  <p>{errors.email?.message}</p>
			  <p>{errors.email?.pattern ? 'Entered email is not valid.' : null}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register('password', {
					required: 'Password field cannot be empty.'})}
              />
			  <p>{errors.password?.message}</p>
            </Form.Group>
            <Button 
			className="login-submitBtn"
			 variant="primary" 
			 type="submit"
			 >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
