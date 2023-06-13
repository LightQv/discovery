import SpotifyPlayer from "react-spotify-web-playback";
import { useAuthContext } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { usePlayingContext } from "../../contexts/PlayingContext";

export default function Player() {
  const { accessToken } = useAuthContext();
  const {
    playingTrack,
    setActualTrack,
    play,
    setPlay,
    isPlaying,
    setIsPlaying,
  } = usePlayingContext();
  const { darkTheme } = useThemeContext();

  if (!accessToken) return null;
  return (
    <>
      <div
        className={
          playingTrack === null
            ? "hidden"
            : "fixed bottom-12 right-0 z-10 w-full lg:bottom-0 lg:w-[calc(100%-12rem)]"
        }
      >
        <SpotifyPlayer
          token={accessToken}
          uris={playingTrack}
          callback={(state) => {
            setActualTrack(state.track.uri);
            setIsPlaying(state.isPlaying);
            if (!state.isPlaying) setPlay(false);
          }}
          hideAttribution="true"
          layout="responsive"
          play={play}
          showSaveIcon={false}
          styles={{
            activeColor: darkTheme ? "rgb(10,10,10)" : "rgb(245,245,244)",
            bgColor: darkTheme ? "rgb(10,10,10)" : "rgb(245,245,244)",
            color: darkTheme ? "rgb(245,245,244)" : "rgb(10,10,10)",
            sliderColor: darkTheme ? "rgb(6,182,212)" : "rgb(168,85,247)",
            sliderHandleColor: darkTheme ? "rgb(245,245,244)" : "rgb(10,10,10)",
            trackNameColor: darkTheme ? "rgb(6,182,212)" : "rgb(168,85,247)",
          }}
          syncExternalDevice="true"
        />
      </div>
      {playingTrack !== null && (
        <div className="mt-4 h-20 bg-stone-100 dark:bg-neutral-950 lg:h-16" />
      )}
      {playingTrack !== null && isPlaying && (
        <div className="h-16 bg-stone-100 dark:bg-neutral-950 lg:hidden" />
      )}
    </>
  );
}
