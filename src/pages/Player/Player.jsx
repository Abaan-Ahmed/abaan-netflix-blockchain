import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const navigate = useNavigate();

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate('/')}}/>
      <iframe width="90%" height="90%" src="https://www.youtube.com/embed/jdgVdMolHlo?si=NGrgGVFGLcxDnTD1" title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
      </iframe>
      <div className="player-info">
        <p>28-Apr-2025</p>
        <p>Netflix Tudum</p>
        <p>Official Trailer</p>
      </div>
    </div>
  )
}

export default Player
