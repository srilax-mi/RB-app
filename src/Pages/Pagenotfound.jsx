import React from 'react'
import notFoundGif from '../assets/404.mp4.gif'

function Pagenotfound() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <img
        src={notFoundGif}
        alt="404 - Page Not Found"
        style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: 0 }}
      />

      <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
        <div style={{ textAlign: 'center', color: 'white', background: 'rgba(0,0,0,0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>404 - Page Not Found</h1>
          <p style={{ fontSize: '1.125rem' }}>You're lost in deep space. Let's go back.</p>
        </div>
      </div>
    </div>
  )
}

export default Pagenotfound
 