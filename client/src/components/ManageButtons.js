import React, { useContext, useEffect } from "react";
import CircleButton from "./CircleButton";
import { Link } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";
import { PlacesContext } from "../context/PlacesContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ManageButtons({ place }) {
  const { userData, getUserData,isLoggedIn } = useContext(UserContext);
  const { getPlaces, setEditTitle } = useContext(PlacesContext);
  const wishMatch = userData?.wishes?.some((e) => e.title === place.title);
  const visitedMatch = userData?.visited?.some((e) => e.title === place.title);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const deletePlace = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post(`${URL}/place/delete`, {
        title: place.title,
      });
      // setMessage(response.data.data);
      // setTimeout(() => {
      //   setMessage("");
      // }, 2000);
      console.log(response);
      if (response.data.ok) {
        //   setTimeout(() => {
        //       navigate(`/}`);
        //   }, 2000);
        if(location.pathname.includes('place')){
            navigate(-1);
        }
      }

      getPlaces();
    } catch (error) {
      console.log(error);
    }
  };

  const editPlace = (e) => {
    e.stopPropagation();
    navigate(`/${place.title}/addnewplace`);
    setEditTitle(place.title);
    localStorage.setItem("editTitle", JSON.stringify(place.title));
  };

  const updatePreferences = async (update, value, e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${URL}/user/editList`, {
        username: userData.username,
        placeId: place._id,
        update,
        value,
      });
      console.log(response);
      console.log(wishMatch);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="place__buttons">
      {!userData?.isAdmin && (
        <button
          onClick={(e) => {
            if (!isLoggedIn) {
              handleClickOpen(e);
            } else {
              if (wishMatch) {
                //remove
                updatePreferences("wishes", false, e);
              } else {
                //add
                updatePreferences("wishes", true, e);
              }
            }
          }}
        >
          <CircleButton content={!wishMatch ? "wish_off" : "wish"} />
        </button>
      )}
      {!userData?.isAdmin && (
        <button
          onClick={(e) => {
            if (!isLoggedIn) {
              handleClickOpen(e);
            } else {
              if (visitedMatch) {
                updatePreferences("visited", false, e);
              } else {
                updatePreferences("visited", true, e);
              }
            }
          }}
        >
          <CircleButton content={!visitedMatch ? "visited" : "visited_off"} />
        </button>
      )}

      {userData?.isAdmin && (
        <button onClick={editPlace}>
          <CircleButton content={"edit"} />
        </button>
      )}
      {userData?.isAdmin && (
        <button onClick={deletePlace}>
          {" "}
          <CircleButton content={"delete"} />
        </button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            "& .MuiDialog-paper": {
                padding:'10px',
              borderRadius: "20px", 
            },
          }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Want to use full functionality? "}
        </DialogTitle>
        <hr color="#FF471F" />
       
        <DialogContent>
            
          <DialogContentText id="alert-dialog-description">
            To get full access to all site features, register an account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            
          <Button onClick={handleClose}
           sx={{
            color: "black",
            border:'1px black solid',
            fontWeight:'600',
            borderRadius:'50px',
            padding:'8px 16px',
            "&:hover": {
                color: "#FF471F",
                border:'1px #FF471F solid',
              backgroundColor: "white",
            },
          }}>Later</Button>
          <Link to={'/registration'}>
          <Button
          sx={{
            color: "white",
            backgroundColor: "black",
            border:'1px black solid',
            fontWeight:'600',
            borderRadius:'50px',
            padding:'8px 16px',
            "&:hover": {
             
              backgroundColor: "#FF471F",
              border:'1px #FF471F solid',
            },
          }} onClick={handleClose} autoFocus>
            Register
          </Button>
            </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageButtons;
