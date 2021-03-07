import React, {useEffect, useState} from 'react'
import {db} from "../../services/firebase"
import Header from '../header/Header'
import FilmIntro from '../browse/FilmIntro/FilmIntro'
import {useAuth} from "../../contexts/AuthContext"
import "../browse/BrowsePage.css"

const Bookmark = () => {
    const [data, setData] = useState([])
    const {currentUser} = useAuth()
    const [currentUserFirebase, setCurrentUserFirebase] = useState()
    const [bookmarkedByCurrentUser, setBookmarkedByCurrentUser] = useState()
    const [savedFilms, setSavedFilms] = useState([])
    const [bookmarkId, setBookmarkId] = useState([])
    useEffect(() => {
        // get all movies data from Firebase
        db.collection("movies").onSnapshot((snapShot) =>{
            setData(snapShot.docs.map((doc) => doc.data()))
        })
    }, [])



    useEffect(() => {
        db.collection("users").where("uid", "==", currentUser.uid)
        .onSnapshot((snapShot) => snapShot.docs.map((doc) => setCurrentUserFirebase(doc.data())))
    }, [])
    console.log(currentUser)
    console.log(currentUserFirebase)

    useEffect(() => {
        db.collection("bookmarked").where("userId", "==", currentUser.uid)
        .onSnapshot((snapShot) => setBookmarkedByCurrentUser(snapShot.docs.map((doc) => doc.data())))
    }, [])

    useEffect(() => {
        if(bookmarkedByCurrentUser){
            setBookmarkId(bookmarkedByCurrentUser.map((movie) => movie.movieId))
        }
    }, [bookmarkedByCurrentUser])

    useEffect(() => {
        if(bookmarkId){
            setSavedFilms(data.filter((film) => bookmarkId.includes(film.filmId)))
        }
    }, [bookmarkId])
    return (
           <div style={{display:"flex", flexDirection:"column"}}>
            <div style ={{width: "100%", height: "10%", display:"flex", flexDirection:"row"}}>
                <Header />
                <div style={{position:"absolute", left: "40%", top:"2%"}}>
                {currentUser.displayName}
                </div>
            </div>
        
            <div style ={{width: "100%", height: "80%", marginTop: 50}}>
            <div>
            <h2>My List </h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                {savedFilms.map((film) => {
                   return(
                    <FilmIntro
                        backdropPath = {film.backdropPath}
                        category = {film.category}
                        filmLink = {film.filmLink}
                        title = {film.title}
                        overview = {film.overview}
                        channel= {film.channel}
                        id = {film.filmId}
                        />
                    )  
                })}
            </div>
            </div>
        </div>
        </div>
    )
}

export default Bookmark
