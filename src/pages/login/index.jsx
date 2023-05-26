
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
	e.preventDefault();

	signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
	  console.log(`Logged in! User: ${JSON.stringify(user)}`)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
	  console.log(`Error! Error code: ${errorCode}, ${errorMessage}`)
    });
  }
  return (
    <>
      <div className="login-mainContainer">
        <div className="loginElements-container">
			<h1 className="login-heading">Login</h1>
          <Form className="login-loginForm">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button 
			className="login-submitBtn"
			 variant="primary" 
			 type="button"
			 onClick={handleSubmit}
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
