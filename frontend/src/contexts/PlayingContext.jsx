import { createContext, useContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

const PlayingContext = createContext();

export default PlayingContext;

export function PlayingContextProvider({ children }) {
  const [playingTrackData, setPlayingTrackData] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [actualTrack, setActualTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [playingTrack]);

  const playing = useMemo(
    () => ({
      playingTrackData,
      setPlayingTrackData,
      playingTrack,
      chooseTrack,
      actualTrack,
      setActualTrack,
      play,
      setPlay,
      isPlaying,
      setIsPlaying,
    }),
    [playingTrackData, playingTrack, actualTrack, play, isPlaying]
  );

  return (
    <PlayingContext.Provider value={playing}>
      {children}
    </PlayingContext.Provider>
  );
}

export const usePlayingContext = () => useContext(PlayingContext);

PlayingContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
