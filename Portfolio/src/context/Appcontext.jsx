import axios from "axios";
import { useState, useEffect, createContext } from "react";

// Create the context
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendurl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendurl)

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Check if token cookie exists
  useEffect(() => {
    const tokenExists = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    setIsLoggedin(!!tokenExists);
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/review/all`, {
        withCredentials: true,
      });
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews(); // Load on mount
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        admin,
        setAdmin,
        backendurl,
        fetchReviews,
        reviews,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
