import React, {useEffect, useState} from 'react'
import {db} from "../../services/firebase"
import Header from '../header/Header'
import FilmIntro from './FilmIntro/FilmIntro'
import {useAuth} from "../../contexts/AuthContext"
import "./BrowsePage.css"
import { Link, useHistory } from "react-router-dom";
import Bookmark from "../Bookmark/Bookmark"
import Banner from '../banner/Banner'


const BrowsePage = () => {
    const [data, setData] = useState([])
    const {currentUser, logout} = useAuth()
    const [category1, setCategory1] = useState([])
    const [category2, setCategory2] = useState([])
    const [category3, setCategory3] = useState([])
    const [category4, setCategory4] = useState([])
    const [category5, setCategory5] = useState([])
    const [currentUserFirebase, setCurrentUserFirebase] = useState()
    const [bookmarkedByCurrentUser, setBookmarkedByCurrentUser] = useState()
    const [savedFilms, setSavedFilms] = useState([])
    const [bookmarkId, setBookmarkId] = useState([])
    const [value, setValue] = useState("")
    const history = useHistory()
    const [error, setError] = useState("")
    const [idForBookmark, setIdForBookmark] = useState(true)

    useEffect(() => { // co cai gi thay doi trong [] chay lai ham nay

          db.collection("bookmarked").onSnapshot((snapShot) => {
            setIdForBookmark(snapShot.docs.map((doc) => doc.id ))
          })     
      }, [])

    useEffect(() => {
        // get all movies data from Firebase
        db.collection("movies").onSnapshot((snapShot) =>{
            setData(snapShot.docs.map((doc) => doc.data()))
        })
    }, [])



    useEffect(() => {
        // filter categories
        if(data){
            setCategory1(data.filter((movie) => movie.category == "Gordon Ramsay Ultimate Cookery Course"))
            setCategory2(data.filter((movie) => movie.category == "ChefSteps At Home"))
            setCategory3(data.filter((movie) => movie.category == "The Great Cheese Hunt"))
            setCategory4(data.filter((movie) => movie.category == "Last Chance Kitchen Season 16"))
            setCategory5(data.filter((movie) => movie.category == "Culinary Frank's Vietnamese Recipes"))
        }
    }, [data])

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

    const goToBookmark = () => {
        history.push("/mylist")
    }

    

  

    async function handleLogout(e) {
        setError('')
    
        try {
          await logout()
          history.push('/login')
        }
        catch {
          setError("Failed to log out")
        }
      }

    return (
        <div style={{display:"flex", flexDirection:"column"}}>

            <div style ={{width: "100%", height:"70%", display:"flex", flexDirection:"row"}}>
                <Header />
                <Banner />   
                <input style ={{position: "fixed", width: "150px", left: "30%", height:"30px", display:"flex", flexDirection:"row", zIndex:"999"}}type="text" placeholder="Search for task" value={value} 
                onChange={(e) => setValue(e.target.value)} /> 
                          
            </div>
        
            <div style ={{width: "100%", height: "30%"}}>
            <div>
            <h2>My List </h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                {savedFilms
                .filter((film) => film.title.trim().toLowerCase().includes(value.trim().toLowerCase()))              
                .map((film) => {
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
                {/* {idForBookmark.map((id) => {
                    return(
                        <FilmIntro 
                        onDeleteBookmark = {onDeleteBookmark}
                        idForBookmark = {id.idForBookMark}
                        />
                    )
                })} */}
            </div>
            </div>
            <h2>Gordon Ramsay Ultimate Cookery Course</h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
            {category1
            .filter((film) => film.title.trim().toLowerCase().includes(value.trim().toLowerCase()))  
            .map((film) => {
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
        <h2>Culinary Frank's Vietnamese Recipes</h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
            {category5
            .filter((film) => film.title.trim().toLowerCase().includes(value.trim().toLowerCase()))  
            .map((film) => {
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
        <h2>ChefSteps At Home</h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "center"}}>
            {category2
            .filter((film) => film.title.trim().toLowerCase().includes(value.trim().toLowerCase()))  
            .map((film) => {
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
        <h2>The Great Cheese Hunt</h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "center"}}>
            {category3
            .filter((film) => film.title.trim().toLowerCase().includes(value.trim().toLowerCase()))  
            .map((film) => {
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
        <h2>Last Chance Kitchen Season 16</h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "center"}}>
            {category4
            .filter((film) => film.title.trim().toLowerCase().includes(value.trim().toLowerCase()))  
            .map((film) => {
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
    )
}

export default BrowsePage
 