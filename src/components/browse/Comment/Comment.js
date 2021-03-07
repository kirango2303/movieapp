import React, { useRef, useState, useEffect } from 'react'
import { Button, Form} from 'react-bootstrap';
import './Comment.css'
import {db} from "../../../services/firebase"
import FilmIntro from '../FilmIntro/FilmIntro';

const Comment = () => {
    const commentRef = useRef()
    const [invalidate, setInvalidate] = useState(true)
    const [commentFromApi, setCommentFromApi] = useState([])
    useEffect(() => { // co cai gi thay doi trong [] chay lai ham nay
        if(invalidate){
          db.collection("comment").onSnapshot((snapShot) => {
            setCommentFromApi(snapShot.docs.map((doc) => ({id: doc.id, data:doc.data()})))
          })     
          setInvalidate(false) 
        }
      }, [invalidate])
    
      const addComment = (e) => {
        e.preventDefault()
        db.collection("comment").add({
          comment: commentRef.current.value,
        })
        commentRef.current.value = ""
      }
    return (
        <div>
            <Form  onSubmit={(e) => addComment(e)}>
                
                <Form.Control className="commentInput" type="text" ref ={commentRef} placeholder= "Add comment..." />
                <Button className="Comment-Add"  type="submit" > Comment</Button>
            </Form>
            <FilmIntro>
                
            </FilmIntro>
        </div>
    )
}

export default Comment

