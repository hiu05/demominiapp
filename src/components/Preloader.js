import React from 'react'

import './Preloader.scss'

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__spinner">
        <div className="spinner"></div>
      </div>
    </div>
  )
}

export default Preloader
