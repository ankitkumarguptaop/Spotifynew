import React from 'react'
import "./Footer.css"
import CurrentTrack from './CurrentTrack'
import PlayerControlles from './PlayerControlles'
export default function Footer() {
  return (
    <div className='FooterContainer'>
     <CurrentTrack></CurrentTrack>
     <PlayerControlles></PlayerControlles>
    </div>
  )
}
