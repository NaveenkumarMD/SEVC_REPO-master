import React from 'react'
import "../css/Scrolling.css"
function Scrollingbanner() {
    const handleMouseEnter = (event) => {
        event.target.style.animationPlayState = 'paused';
      }
    
      const handleMouseLeave = (event) => {
        event.target.style.animationPlayState = 'running';
      }
    
  return (
    <div className='container'>
        <div  onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave} className='text'>      Registration for SEVC-2024 OPENED.. Download Registration Guidelines and follow it, to register in SEVC 2024....</div>
    </div>
  )
}

export default Scrollingbanner