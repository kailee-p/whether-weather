import React from 'react';

const VideoBackground = () => {
  return (
    <div id="video-container">
      <video autoPlay loop muted>
        <source src="./videos/whetherweatherbackgroundvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoBackground;