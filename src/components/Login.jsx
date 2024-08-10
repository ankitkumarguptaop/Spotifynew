import React from "react";


import "./Login.css";
export default function Login() {
  function handleClick() {
    const clientId = "3c46250ca83f4e2f8f41968fb79a0930";
    const redirectURL = "https://www.google.com";
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    // const clientSecret = "691486d77afc4844811f56844e3ce49e0";

    const scope ='user-read-email user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-playback-position user-top-read user-read-recently-played';
    const params = {
      response_type: "token",
      client_id: clientId,
      scope : scope,
      redirect_uri: redirectURL,
    };
    // window.loctaion.herf = `${apiurl}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}&response_type=token& show_daialog=true`;
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  
 
  return (
    <div className="Container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
        alt="Spotify"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  );
}

// const Container = styled.div`
//    display :flex;
//    flex-direction :column;
//    align-items: center;
//    justify-content:center;
//    height: 100vh;
//    width :100vw;
//    background-color:#1db954;
// `
// ;



