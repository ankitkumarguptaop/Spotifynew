import React from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Playlists.css"
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
export default function Playlists() {

const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    // console.log(token);
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      const { items } = response.data;
      // console.log(items);

      const playlists = items.map(({ name, id }) => {
        return { name, id }; // extract playlist name and id
      });
      // console.log(playlists);
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };

    getPlaylistData();
  }, [dispatch, token]);
const changePlaylist = (selectedPlaylistId)=>{
  console.log("id",selectedPlaylistId);
  dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
}
  // console.log("playlist" ,playlists);
  return (
  <div className="playlistsContainer">
   <ul>
   {
    playlists.map(({name,id} , i)=>(
      <li key={id} onClick={()=>changePlaylist(id)}>{name} </li>
    ))
   }
   </ul>
   

  </div>
  )
}
