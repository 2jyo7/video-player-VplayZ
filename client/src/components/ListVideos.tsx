"use client";
import { VideoTypes } from '@/types ';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';

const ListVideos = () => {
  const [allVideos, setAllVideos] = useState<VideoTypes[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [lastWatchedTime, setLastWatchedTime] = useState<any>(0);
  const [progress, setProgress] = useState(0);


  // Handle video end event
  const handleVideoEnd = () => {
    setIsVideoCompleted(true);
    updateProgress(0, true); // Mark the video as completed in the backend
  };

// Handle video time update event to update the progress bar

const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  const currentTime = e.currentTarget.currentTime;
  const duration = e.currentTarget.duration;
  const progressPercentage = (currentTime / duration) * 100;
  setProgress(progressPercentage);

  console.log(e.currentTarget.duration); // This will log the video element
console.log(progress);

};

  // Handle previous video button click
  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsVideoCompleted(false);
      setLastWatchedTime(0); // Reset last watched time for the previous video
    }
  };

  // Handle video pause event
  const handleVideoPause = async (currentTime: number) => {
    setLastWatchedTime(currentTime);
    await updateProgress(currentTime, false);
  };

 

  // Handle next video button click
  const handleNextVideo = () => {
    if (currentVideoIndex < allVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsVideoCompleted(false);
      setLastWatchedTime(0); // Reset last watched time for the new video
    }
  };

  

  // Fetch videos from backend
  async function getAllVids() {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get("http://localhost:4300/api/videos", {
        headers: {
          Authorization: `${token}` // Add the Authorization header
        }
      });
      setAllVideos(res.data);
    } catch (error: any) {
      console.error('Error fetching videos:', error.response || error.message);
    }
  }

  // Update progress in backend
  async function updateProgress(currentTime: number, completed: boolean) {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        "http://localhost:4300/api/progress",
        {
          videoId: allVideos[currentVideoIndex].id,
          lastWatchedTime: currentTime,
          completed: completed
        },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      console.log('Progress updated successfully');
    } catch (error: any) {
      console.error('Error updating progress:', error.response || error.message);
    }
  }

  // Load last watched time when video is ready to play
  const handleVideoLoadedMetadata = (videoElement: HTMLVideoElement) => {
    // console.log(videoElement.currentTime);
    
    if (lastWatchedTime > 0) {
      videoElement.currentTime = lastWatchedTime;
    }
  };

  // Fetch all videos when component mounts
  useEffect(() => {
    getAllVids();
    fetchLastWatchedTime();
  }, [currentVideoIndex]);

  // Fetch last watched time for the current video
  const fetchLastWatchedTime = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(
        `http://localhost:4300/api/progress`,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      setLastWatchedTime(res.data[0]?.last_watched_time);
    } catch (error: any) {
      console.error('Error fetching last watched time:', error.response || error.message);
    }
  };

  return (
    <div className="flex flex-col p-10 border border-gray-300 rounded-md shadow-lg bg-white justify-center max-w-5xl mx-auto">
  <h1 className="text-center text-black text-3xl my-4 font-bold">Videos</h1>
  <ul className="bg-blue-950 p-6 rounded-lg flex flex-col items-center space-y-8">
    {allVideos && allVideos.map((video, index) => (
      <li key={video.id} className="w-full">
        <h2 className="text-center text-xl flex items-center justify-center font-semibold text-white">
          {video.title}
          {index === currentVideoIndex && (
            <FaPlayCircle className="ml-2 text-green-500" />
          )}
        </h2>
        {index === currentVideoIndex && (
          <div className="flex flex-col items-center">
            <video
              width="820"
              height="540"
              controls
              preload="none"
              onEnded={handleVideoEnd}
              onTimeUpdate={handleTimeUpdate}
              onPause={(e) => handleVideoPause(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => handleVideoLoadedMetadata(e.currentTarget)}
              onError={() => console.log("Error loading video")}
              className="border border-gray-500 rounded-md shadow-lg m-4"
            >
              <source src={video.url} type="video/mp4" />
              <track src="" kind="subtitles" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>
            
            <div className="relative w-full h-2 bg-gray-200 rounded">
         <div
    className="absolute top-0 left-0 h-full bg-blue-500 rounded"
    style={{ width: `${progress}%` }}
     ></div>
     </div>
            <div className="flex justify-between w-full max-w-lg mt-4">
              <button
                onClick={handlePrevVideo}
                disabled={currentVideoIndex === 0}
                className="text-3xl text-white hover:text-gray-300"
              >
                <GiPreviousButton />
              </button>
              <button
                onClick={handleNextVideo}
                disabled={!isVideoCompleted}
                className="text-3xl text-white hover:text-gray-300"
              >
                <GiNextButton />
              </button>
            </div>
          </div>
        )}
      </li>
    ))}
  </ul>
</div>

  );
};

export default ListVideos;
