import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../config";
export const PlacesContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [editTitle, setEditTitle] = useState();

  const getPlaces = async () => {
    try {
      const response = await axios.get(`${URL}/place/getall`);
      setPlaces(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
    setEditTitle(localStorage.getItem("editTitle") || "");
  }, []);

  return (
    <PlacesContext.Provider
      value={{ places, getPlaces, setEditTitle, editTitle }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
