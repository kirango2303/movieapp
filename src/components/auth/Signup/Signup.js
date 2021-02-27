import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../../contexts/AuthContext';
import {Link, useHistory} from "react-router-dom";
import '../Style.css'


const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const {signup, currentUser} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e){
    e.preventDefault()

    // if(passwordRef.current.value !== passwordConfirmRef.current.value){
    //   return setError("Passwords do not match")
    //   //set the error only 1 time
    // }

    try{
      setError("")
      setLoading(true)
      const result = await signup(emailRef.current.value, passwordRef.current.value)
      const verified = await result.user.sendEmailVerification()
      history.push("/login")
    }
    catch{
      setError("Failed to create an account. Password must be at least 6 characters or username already existed")
    }
    // console.log(currentUser)
    setLoading(false)
  }
  return (
      <>
      <div className="bgImage"></div>
    <div className="wrap">
        <div className="title">Sign Up</div>
        {error && <div className="error">{error}</div>}

        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group id="first-name">
            <Form.Control type="first-name" className="input" placeholder="First Name" ref={firstNameRef} required></Form.Control>

          </Form.Group>
          <Form.Group id="email">
            <Form.Control type="email" className="input" placeholder="Email Address" ref={emailRef} required></Form.Control>
          </Form.Group>

          <Form.Group id="password">
            <Form.Control type="password" className="input" placeholder="Password" ref={passwordRef} required></Form.Control>
          </Form.Group>

          <Button disabled={loading} className="button" type="submit">
            Sign Up
          </Button>
        </Form>

        <div className="text">
          Already an user? <Link className="link" to="/login">Sign in now.</Link>
        </div>
    </div>
    </>
  );
}

export default Signup;