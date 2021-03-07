import React, {useEffect, useState} from 'react'
import './FilmIntro.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../Comment/Comment';
import {db} from "../../../services/firebase"
import { useAuth } from '../../../contexts/AuthContext';



const FilmIntro = (props) => {
    const classes = useStyles()
    const {title, backdropPath, channel, filmLink, overview, id} = props
    const {currentUser} = useAuth()
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [comments, setComments] = useState([])
    const [invalidate, setInvalidate] = useState(true)

    useEffect(() => {
        if(invalidate){
            db.collection("comments")
            .where("filmId", "==", id)
            .orderBy("createdAt", "asc")
            .onSnapshot((snapShot) =>{
                setComments(snapShot.docs.map((doc) => doc.data()))
            })
        }
        setInvalidate(false)
    }, [invalidate]
    )

    const handleBookmark = () => {
        db.collection("bookmarked")
        .add({
            movieId: id,
            userId: currentUser.uid,
        })
    }

    console.log(comments)
    return (
        <div className="container" >
            
            <div className="backdrop" onClick={() => setOpen(true)}>
                <img src={backdropPath} className="img"/>

            </div>
            <div className="describe">
                
                <Modal
                open={open}
                onClose={() => setOpen(false)}
                className = {classes.paper}
                // style={{'maxHeight': 'calc(100vh-100px)', 'overflowY': 'auto'}}
                > 
                <div>
                    <img src={backdropPath} style={{width:"100%", height:"auto", }}/>
                    <button type="button" onClick={() => setOpen1(true)}> Play </button> 
                    <button type="button" onClick={() => handleBookmark()}> Bookmark </button> 
                    <div>
                        {title}
                    </div>
                    <div> {channel}</div>
                    <div>{overview}</div>
                    <div>
                        {comments && comments.map( (comment) => {
                            return (
                                <div>
                                    {comment.name}: {comment.comment}
                                </div>
                            )
                        })}
                    </div>
                    <div> 
                        <Comment
                            id = {id}
                        />
                    </div>

                    <Modal
                    open={open1}
                    onClose={() => setOpen1(false)}
                    className = {classes.paper1}
                    > 
                    <div>
                        <video width="100%" height="100%" controls>
                            <source src={filmLink} type="video/mp4"/>
                        </video>
                    </div>
                    </Modal>
                </div>
                
                </Modal>
            </div>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    paper1: {
        marginLeft: "10%",
        alignSelf:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width: "80%",
        height: "100%",
        
    },
    paper: {
        marginLeft: "20%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width: "60%",
        height: "auto",
        backgroundColor: "black",
        overflowY: "scroll"
        
    },
  }));

export default FilmIntro
