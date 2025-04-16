// components/AudioPlayer.jsx
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase"; // path to your config

const AudioPlayer = ({audioFile}) => {
    console.log('audioFile is', audioFile)
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const audioRef = ref(storage, audioFile); // filename
        const url = await getDownloadURL(audioRef);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error fetching audio URL:", error);
      }
    };

    fetchAudio();
  }, [audioFile]);

  return (
    <>
      {audioUrl ? (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}
    </>
  );
};

export default AudioPlayer;
