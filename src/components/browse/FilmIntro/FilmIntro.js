import React, {useState} from 'react'
import './FilmIntro.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../Comment/Comment';



const FilmIntro = (props) => {
    const classes = useStyles()
    const {title, backdropPath, channel, filmLink, overview} = props
    const {name, id, comment} = props
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
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
                style={{'max-height': 'calc(100vh-100px)', 'overflow-y': 'auto'}}
                > 
                <div>
                    <img src={backdropPath} style={{width:"100%", height:"100%"}}/>
                    <button type="button" onClick={() => setOpen1(true)}> Play </button> 
                    <div>
                        {title}
                    </div>
                    <div> {channel}</div>
                    <div>{overview}</div>
                    <div> <Comment>
                        
                        </Comment> </div>

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
        marginLeft: "30%",
        alignSelf:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width: "40%",
        height: "100%",
        backgroundColor: "black",

        
    },
  }));

export default FilmIntro
