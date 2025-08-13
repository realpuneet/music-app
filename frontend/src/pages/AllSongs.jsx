import { useEffect, useRef, useState } from "react";
import NowPlayingBar from "../components/NowPlayingBar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import axios from "axios";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Song timing
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch songs
  useEffect(() => {
    axios.get("http://localhost:3000/songs").then((res) => {
      setSongs(res.data.songs || []);
    });
  }, []);

  // Play / Pause
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play specific song
  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // Next / Previous
  const playNext = () => {
    if (songs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (songs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  // Handle progress update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  // Format time
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const currentSongData = songs[currentIndex] || null;

  return (
    <div className="p-1 bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="p-2 flex items-center justify-between">
        <Link to="/" className="text-2xl">
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-3xl font-bold font-[arial]">Your Music</h1>
        <Link to="/upload" className="text-white text-2xl">
          <IoCloudUploadOutline />
        </Link>
      </div>

      {/* Song List */}
      {songs.map((song, idx) => (
        <div
          key={song._id}
          className="p-2 mb-1 h-[4.5rem] bg-gray-700 hover:bg-gray-800 flex items-center justify-between rounded-md"
        >
          <div className="flex items-center gap-x-3">
            <img
              src={song.coverUrl}
              alt="cover"
              className="w-12 h-12 object-cover rounded-md"
            />
            <div>
              <h1 className="text-white text-sm font-medium">
                {song.title.slice(0, 15)}
              </h1>
              <p className="text-gray-300 text-xs">{song.releaseYear}</p>
              <p className="text-gray-300 text-xs">{song.artist}</p>
            </div>
          </div>

          <div className="text-white text-xl pr-2">
            <button
              onClick={() =>
                currentIndex === idx && isPlaying
                  ? handlePlayPause()
                  : playSong(idx)
              }
            >
              {currentIndex === idx && isPlaying ? <CiPause1 /> : <CiPlay1 />}
            </button>
          </div>
        </div>
      ))}

      {/* Hidden Audio */}
      {currentSongData && (
        <audio
          ref={audioRef}
          src={currentSongData.audioUrl}
          autoPlay={isPlaying}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      )}

      {/* Now Playing Bar */}
      {currentSongData && (
        <NowPlayingBar
          currentSongData={currentSongData}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={playNext}
          onPrev={playPrev}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
          onSeek={(value) => {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
          }}
        />
      )}
    </div>
  );
};

export default AllSongs;
