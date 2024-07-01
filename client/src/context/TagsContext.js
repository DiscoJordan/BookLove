import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../config";
export const TagsContext = React.createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState();

  // const [userData, setUserData] = useState();

  const getTags = async () => {
    try {
      const response = await axios.get(`${URL}/tag/getall`);
      setTags(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <TagsContext.Provider
      value={{ getTags, tags, setTags, currentTag, setCurrentTag }}
    >
      {children}
    </TagsContext.Provider>
  );
};
