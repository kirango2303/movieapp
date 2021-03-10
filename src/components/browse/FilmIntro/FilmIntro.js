import React, { useEffect, useState } from 'react'
import './FilmIntro.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../Comment/Comment';
import { db } from "../../../services/firebase"
import { useAuth } from '../../../contexts/AuthContext';



const FilmIntro = (props) => {
    const classes = useStyles()
    const { title, backdropPath, channel, filmLink, overview, id} = props
    const { currentUser } = useAuth()
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [comments, setComments] = useState([])
    const [invalidate, setInvalidate] = useState(true)
    const [bookmarkedMovies, setBookmarkedMovies] = useState([])
    const [bookmarkedId, setBookmarkedId] = useState([])


    useEffect(() => {
        if (invalidate) {
            db.collection("comments")
                .where("filmId", "==", id)
                .orderBy("createdAt", "asc")
                .onSnapshot((snapShot) => {
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
                bookmarked: true
            })
    }

    const onDeleteBookmark = (e, id) => {
        db.collection("bookmarked").doc(id).delete()
            .then(() => console.log("deleted"))
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     // get all bookmarked movies data from Firebase
    //     db.collection("bookmarked").onSnapshot((snapShot) =>{
    //         setBookmarkedMovies(snapShot.docs.map((doc) => ({bookmarkId: doc.id, data:doc.data()})))
    //     })
    // }, [handleBookmark, onDeleteBookmark])

    // useEffect(() => {
    //     if (bookmarkedMovies) {
    //         setBookmarkedId(bookmarkedMovies.find(movie => movie.data.movieId == id && currentUser.uid == movie.data.userId).bookmarkId)
    //     }
    // }, [bookmarkedMovies])

    console.log(bookmarkedId)
    return (
        <div className="container" >

            <div className="backdrop" onClick={() => setOpen(true)}>
                <img src={backdropPath} className="img" />

            </div>
            <div className="describe">

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    className={classes.paper}
                    // style={{'maxHeight': 'calc(100vh-100px)', 'overflowY': 'auto'}}
                    style={{ 'maxHeight': '1000px', 'overflowY': 'scroll', position: "absolute" }}
                >
                    <div>
                        <img src={backdropPath} style={{ width: "100%", height: "auto", }} />
                         <button type="button" onClick={() => setOpen1(true)}> Play </button>
                         <button type="button" onClick={() => handleBookmark()}> Bookmark </button>
                         {/* <button type="button" onClick={(e) => onDeleteBookmark(e, bookmarkedId)}> Remove </button> */}
                        <button type="button" onClick={() => setOpen2(true)}> View all comments </button>
                        <div className="title">
                           <b>{title}</b> 
                        </div>
                        <div className="channel" > Channel: {channel}</div>
                        <div className="overview">Overview: {overview}</div>

                        <div>
                            <Comment
                                id={id}
                            />
                        </div>

                        <Modal
                            open={open1}
                            onClose={() => setOpen1(false)}
                            className={classes.paper1}
                        >
                            <div>
                                <video width="100%" height="100%" controls>
                                    <source src={filmLink} type="video/mp4" />
                                </video>
                            </div>
                        </Modal>
                        <Modal
                            open={open2}
                            onClose={() => setOpen2(false)}
                            className={classes.paper2}
                        >
                            <div>
                                {comments.length >=1 ? comments.map((comment) => {
                                    return (
                                        <div className="boxResult">
                                            <div className="resultComment">
                                            <div class="avatarComment" >
								<img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>
							</div>
                                                <h4>{comment.name}</h4>
                                                <p>{comment.comment}</p>
                                            </div>
                                          
                                            </div>
                                    )
                                }): <div className="channel" style={{marginTop: "50px"}}>There is no comment on this video. Share what you think by adding a comment!</div>}
                                
                                  <div> <Comment id={id}/></div>
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
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: "100%",

    },
    paper: {
        marginLeft: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: "auto",
        backgroundColor: "black",
        overflowY: "scroll"

    },
    paper2: {
        marginLeft: "20%",
        display: "flex",
        width: "60%",
        height: "100%",
        backgroundColor: "black",
        overflowY: "scroll"

    },
}));

export default FilmIntro
