import React, {useEffect, useState} from 'react'
import {db} from "../../services/firebase"
import Header from '../header/Header'
import FilmIntro from './FilmIntro/FilmIntro'
import "./BrowsePage.css"

const BrowsePage = () => {
    const [data, setData] = useState([])
    const [category1, setCategory1] = useState([])
    const [category2, setCategory2] = useState([])
    const [category3, setCategory3] = useState([])
    const [category4, setCategory4] = useState([])
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

    console.log(category1)

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style ={{width: "100%", height: "10%"}}><Header /></div>
            <div style ={{width: "100%", height: "90%", marginTop: 50}}>
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
                    />
                )
            })}
        </div>
        </div>
        </div>
    )
}

export default BrowsePage
 