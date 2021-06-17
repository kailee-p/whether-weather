import React from 'react';
import '../css/video-background.css';

const VideoBackground = () => {
  return (
    <div>
      <div id="video-container">
        <video autoPlay loop muted>
          <source src="./videos/whetherweatherbackgroundvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div id="video-credits">
        B Roll by <a href="http://www.videezy.com">Videezy</a>
      </div>
    </div>
  )
}

export default VideoBackground;