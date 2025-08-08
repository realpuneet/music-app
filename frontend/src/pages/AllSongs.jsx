import { useEffect, useRef, useState } from "react";
import NowPlayingBar from "../components/NowPlayingBar"; // make sure path is correct
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import axios from "axios";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/songs").then((response) => {
      setSongs(response.data.songs);
    });
  }, [songs]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const currentSongData = songs.find((s) => s._id === currentSong);

  return (
    <div className="p-1 bg-gray-900 text-white pb-20">
      <div className="p-2 flex items-center justify-between">
        <Link to="/" className="text-2xl ">
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-3xl font-bold font-[arial]">Your Music</h1>
        <Link to="/upload" className="text-white text-2xl">
          <IoCloudUploadOutline />
        </Link>
      </div>

      {songs.map((i, idx) => (
        <div
          key={idx}
          className="p-2 mb-1 h-[4.5rem] bg-gray-700 hover:bg-gray-800 flex items-center justify-between rounded-md"
        >
          <div className="flex items-center gap-x-3">
            <img
              src={i.coverUrl}
              alt="cover"
              className="w-12 h-12 object-cover rounded-md"
            />
            <div>
              <h1 className="text-white text-sm font-medium">
                {i.title.slice(0, 10)}
              </h1>
              <p className="text-gray-300 text-xs">{i.releaseYear}</p>
              <p className="text-gray-300 text-xs">{i.artist}</p>
            </div>
          </div>

          <div className="text-white text-xl pr-2">
            <button
              onClick={() => {
                if (currentSong === i._id) {
                  setCurrentSong(null);
                  setIsPlaying(false);
                } else {
                  setCurrentSong(i._id);
                  setIsPlaying(true);
                }
              }}
            >
              {currentSong === i._id && isPlaying ? <CiPause1 /> : <CiPlay1 />}
            </button>
          </div>
        </div>
      ))}

      {/* Hidden Audio Element */}
      {currentSongData && (
        <audio
          ref={audioRef}
          src={currentSongData.audioUrl}
          autoPlay
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Now Playing Bar */}
      <NowPlayingBar
        currentSongData={currentSongData}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />
    </div>
  );
};

export default AllSongs;
