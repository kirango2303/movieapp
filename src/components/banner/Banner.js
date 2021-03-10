import React, { useState } from 'react'
import "./Banner.css"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const Banner = () => {
  const [open1, setOpen1] = useState(false)
  const classes = useStyles()
  return (
    <div className="banner">
      <video className="video"
        autoPlay
        // loop
        // muted
        style={{
          width: "100%",
          height: "600px",
          objectFit: "cover",
          zIndex: "-1",
        }}>
        <source src="https://firebasestorage.googleapis.com/v0/b/movieapp-97bcc.appspot.com/o/y2mate.com%20-%20Gordon%20Ramsay%20Demonstrates%20Basic%20Cooking%20Skills%20%20Ultimate%20Cookery%20Course_1080p-2.mp4?alt=media&token=1ed01314-53ee-41e8-9dd7-a8f1d48b8f7b" type="video/mp4" />

      </video>
      <div className="bannerContents" style={{ zIndex: "1" }}>
        <h1 className="bannerTitle">
          GR's #1 SERIES
        </h1>
        <div className="bannerButtons">
          <button className="bannerButton" onClick={() => setOpen1(true)}>Play video </button>
        </div>
        <p className="bannerDescription">
          Gordon Ramsay demonstrates some basic cooking skills as well as some easy to do recipes. This is the Ultimate Cookery Course.
        </p>
      </div>
      <Modal
        open={open1}
        onClose={() => setOpen1(false)}
        className={classes.paper1}
      >
        <div>
          <video width="100%" height="100%" controls>
            <source src="https://firebasestorage.googleapis.com/v0/b/movieapp-97bcc.appspot.com/o/y2mate.com%20-%20Gordon%20Ramsay%20Demonstrates%20Basic%20Cooking%20Skills%20%20Ultimate%20Cookery%20Course_1080p.mp4?alt=media&token=aa361790-6da7-4f5d-921e-911f6d8b0b6f" type="video/mp4" />
          </video>
        </div>
      </Modal>
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

  }
  
  
}));
export default Banner
