import React, { useEffect } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import "./PlayerControlles.css";
import { useState, useRef } from "react";
export default function PlayerControlles() {
  const [{ prevlink, token, playerState }, dispatch] = useStateProvider();

  
  // const changeState = async () => {
  //     try {
  //       const state = playerState ? "pause" : "play";
  //       await axios.put(
  //         `https://api.spotify.com/v1/me/player/${state}`,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       dispatch({
  //         type: reducerCases.SET_PLAYER_STATE, playerState: !playerState,
  //       });
  //     } catch (error) {
  //       console.error("Error changing state:", error.response || error.message);
  //     }
  //   };

  // const changeTrack = async (type) => {
  //   try {
  //     await axios.post(
  //       `https://api.spotify.com/v1/me/player/${type}`,
  //       {},
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

  //     const response1 = await axios.get(
  //       "https://api.spotify.com/v1/me/player/currently-playing",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );

  //     if (response1.data !== "") {
  //       const currentPlaying = {
  //         id: response1.data.item.id,
  //         name: response1.data.item.name,
  //         artists: response1.data.item.artists.map((artist) => artist.name),
  //         image: response1.data.item.album.images[2].url,
  //       };
  //       dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
  //     } else {
  //       dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
  //     }
  //   } catch (error) {
  //     console.error("Error changing track:", error.response || error.message);
  //   }
  // };
  //   function playPreview(previewUrl) {
  //     var audioPlayer = document.getElementById('preview-player');
  //     audioPlayer.src = previewUrl;
  //     audioPlayer.play();
  // }
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(()=>{
    setIsPlaying(false);
  } ,[prevlink]);
  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = (x / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return (
    // <div className='PlayerControlles'>
    // {prevlink ? <audio id="preview-player" controls src={prevlink} className="custom-audio-player" /> : <div style={{"color":"white"}}> No preview available</div> }
    // </div>

    /* <div className="audio-player">
            <audio
                ref={audioRef}
                src={prevlink}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
            <div className="controls">
                <button onClick={playPauseHandler} className="play-pause-button">
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <div className="progress-bar" onClick={handleProgressClick}>
                    <div
                        className="progress-bar-filled"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>
            </div>
        </div> */
        <>
      {prevlink ?  <div className="outer">

      <div className="PlayerControlles">
        <audio
          ref={audioRef}
          src={prevlink}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="shuffle">
          <BsShuffle />
        </div>
        <div className="previous">
          <CgPlayTrackPrev />
        </div>
        <div className="state">
          {isPlaying ? (
            <BsFillPauseCircleFill onClick={playPauseHandler} />
          ) : (
            <BsFillPlayCircleFill onClick={playPauseHandler} />
          )}
        </div>
        <div className="next">
          <CgPlayTrackNext />
        </div>
        <div className="repeat">
          <FiRepeat />
        </div>
      </div>
      <div className="progress-bar" onClick={handleProgressClick}>
        <div
          className="progress-bar-filled"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
    </div>  : <div style={{"color":"white"}}> No preview available</div>
      
      }
      </>
  )
}
