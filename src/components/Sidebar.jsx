import React from 'react'
import "./Sidebar.css"
import {IoLibrary} from "react-icons/io5"
import { MdHomeFilled ,MdSearch} from "react-icons/md"
import Playlists from './Playlists'
export default function Sidebar() {
  return (
    <div className='container3'>
      <div className='top_links'>
        <div className='logo'>
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" alt="" />
        </div>
        <ul>
          <li><MdHomeFilled/><span>Home</span></li>
          <li><MdSearch/><span>Search</span></li>
          <li><IoLibrary/><span>Your library</span></li>
        </ul>
      </div>
      <Playlists></Playlists>
    </div>
  )
}
