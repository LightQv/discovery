import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import NavLibrary from "../components/navigation/NavLibrary";
import RecentlyPlayed from "../components/user_content/RecentlyPlayed";

export default function Library() {
  const { accessToken } = useAuthContext();
  const user = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  return (
    <main className="page-container">
      <div className="mt-3 flex w-full items-center justify-between px-8 pb-2 pt-4 lg:mt-2">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-normal lg:text-5xl">
            My <span className="font-bold">Library</span>
          </h1>
          <h6 className="text-xs italic">
            Find any Artists, Tracks and Playlists.
          </h6>
        </div>
        <Link to="/profile">
          <img
            src={`${user?.images[0]?.url}`}
            alt="profile-pic"
            className="h-16 w-16 rounded-xl border-[1px] border-purple-500 shadow-lg dark:border-cyan-500 lg:h-40 lg:w-40"
          />
        </Link>
      </div>
      <div className="flex w-full flex-col justify-center">
        <NavLibrary />
        <div className="mb-6 grid h-fit grid-cols-1 lg:mb-0">
          <RecentlyPlayed accessToken={accessToken} />
        </div>
      </div>
    </main>
  );
}
