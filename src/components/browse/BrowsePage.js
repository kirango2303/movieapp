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
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", height:"100vh"}}>

            <div style ={{width: "100%", height:"70%", display:"flex", flexDirection:"row"}}>
                <Header />
                <Banner />
                <div className="welcome" style ={{position: "fixed", marginLeft:"30%", display:"flex", flexDirection:"row"}}>Welcome, {currentUser.displayName}! </div>
                <div className="search">  
                <input type="text" value={value} 
                onChange={(e) => setValue(e.target.value)} /> 
                 </div>          
            </div>

            <div style ={{width: "100%", height: "30%"}}>
            
            {savedFilms.length >= 1 && <div className="head"><b>My List </b></div>}
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between", marginBottom: "50px"}}>
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
            
            </div>
            
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", flexGrow:1}}>
            <div className="film-container">
                <div className="head"><b>Gordon Ramsay Ultimate Cookery Course</b></div>
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
            </div>

            <div className="film-container">
                <div className="head"><b>Culinary Frank's Vietnamese Recipes</b> </div>
                <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between", }}>
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
            </div>

            <div className="film-container">
                <div className="head"><b>ChefSteps At Home </b></div>
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
            </div>

        <div className="film-container">
            <div className="head"><b>The Great Cheese Hunt</b></div>
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
        </div>

        
        <div className="film-container">
            <div className="head"><b>Last Chance Kitchen Season 16</b></div>
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
        </div>
        </div>
    )
}

export default BrowsePage