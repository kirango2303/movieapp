import React, {useEffect, useState} from 'react'
import {db} from "../../services/firebase"
import Header from '../header/Header'
import FilmIntro from './FilmIntro/FilmIntro'
import {useAuth} from "../../contexts/AuthContext"
import "./BrowsePage.css"
import { Link, useHistory } from "react-router-dom";
import Bookmark from "../Bookmark/Bookmark"


const BrowsePage = () => {
    const [data, setData] = useState([])
    const {currentUser} = useAuth()
    const [category1, setCategory1] = useState([])
    const [category2, setCategory2] = useState([])
    const [category3, setCategory3] = useState([])
    const [category4, setCategory4] = useState([])
    const [currentUserFirebase, setCurrentUserFirebase] = useState()
    const [bookmarkedByCurrentUser, setBookmarkedByCurrentUser] = useState()
    const [savedFilms, setSavedFilms] = useState([])
    const [bookmarkId, setBookmarkId] = useState([])
    const history = useHistory()
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

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style ={{width: "100%", height: "10%", display:"flex", flexDirection:"row"}}>
                <Header />
                <div style={{position:"absolute", left: "30%", top:"2%"}} onClick={() => goToBookmark()}>
                    My List
                </div>
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
            <h2>Gordon Ramsay Ultimate Cookery Course</h2>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
            {category1.map((film) => {
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
            {category2.map((film) => {
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
            {category3.map((film) => {
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
            {category4.map((film) => {
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
 