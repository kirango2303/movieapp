import React, { useRef, useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import './Comment.css'
import { db } from "../../../services/firebase"
import FilmIntro from '../FilmIntro/FilmIntro';
import { useAuth } from '../../../contexts/AuthContext';
import "./Comment.css"

const Comment = (props) => {
  const commentRef = useRef()
  const { currentUser } = useAuth()
  const { id } = props
  const [invalidate, setInvalidate] = useState(true)
  const [movieCommented, setMovieCommented] = useState([])
  useEffect(() => { // co cai gi thay doi trong [] chay lai ham nay
    if (invalidate) {
      db.collection("movies").doc(id).onSnapshot((snapShot) => {
        setMovieCommented(snapShot.data())
      })
      setInvalidate(false)
    }
  }, [invalidate])
  console.log(movieCommented)



  const addComment = (e) => {
    e.preventDefault()
    db.collection("comments").add({
      comment: commentRef.current.value,
      email: currentUser.email,
      name: currentUser.displayName,
      createdAt: new Date(),
      filmId: id
    })
    commentRef.current.value = ""
  }
  return (
    <div>


      <div className="container">
        <Form className="form-group" style ={{height: "80%"}} onSubmit={(e) => addComment(e)}>
          <Form.Control className="inputComment" type="text" ref={commentRef} placeholder="Enter your comment here..." />
          <Button className="buttonComment" type="submit" > Add Comment</Button>
        </Form>
        <ul className="posts">
        </ul>
      </div>


    </div>
  )
}

export default Comment

