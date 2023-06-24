import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ImageSlider({slider, currentIndex}) {

    

  console.log(slider)
        

  return (
    <div>
        <a href={slider[currentIndex].link} className='imgContainer'>
            <img src={slider[currentIndex].images} /> 
        </a>
    </div>

  )
}

export default ImageSlider
