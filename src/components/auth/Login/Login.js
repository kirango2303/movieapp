import React, { useRef, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import '../Style.css'
import Header from '../../header/Header';

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const [verified, setVerified] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        .then((data) => {
          const name = data.user.displayName;
          const loggedInUser = {
              name,
              uid: data.user.uid,
              email: data.user.email
          }
          emailRef.current.value = "";
          passwordRef.current.value = "";
          localStorage.setItem('user', JSON.stringify(loggedInUser));
        })
  
      
      history.push("/browse")
    }
    catch {
      setError("Failed to login. Please check your password or username and try again")
    }
    setLoading(false)
    console.log(currentUser)
  }
      catch {
        setError("Failed to login. Please check your password or username and try again")
      }
      setLoading(false)
    }

  return (
    <div >
    
    <div className="bgImage"></div>
        <Header />
    <div className="wrap "> 

          <div className="title">Sign in</div> 
          {error && <div className="error">{error}</div>}

          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control className ="input" type="email" placeholder="Email Address" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Control className ="input" type="password" placeholder="Password" ref={passwordRef} required></Form.Control>
            </Form.Group>

            <Button className="button" disabled={loading} type="submit">
              Sign in
          </Button>
          </Form>

          <div className="text">
            New to Netflix? <Link className="link" to="/signup">Sign up now </Link>
          </div>
          <div className="capcha">This page is protected by Google reCAPTCHA to ensure you are not a bot. </div>
    </div>
   </div>
  );
}

export default Login;