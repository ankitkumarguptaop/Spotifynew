import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import axios from "axios";
import "./Spotify.css";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerbg, setheaderbg] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setheaderbg(true)
      : setheaderbg(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log("userinfo",response.data);

      const userInfo = {
        name: response.data.display_name,
        email: response.data.email,
        id: response.data.id,
        userUrl: response?.data?.images[1]?.url,
      };
      //  console.log("userinfo1",userInfo);

      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserData();
  }, [dispatch, token]);

  return (
    <div className="Containers">
      <div className="spotifybody">
        <Sidebar></Sidebar>
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}></Navbar>
          <div className="body_content">
            <Body headerbg={headerbg}></Body>
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer></Footer>
      </div>
    </div>
  );
}
