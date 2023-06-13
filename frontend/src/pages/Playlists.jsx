import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import UserPlaylists from "../components/user_content/UserPlaylists";

export default function Playlists() {
  const { accessToken } = useAuthContext();
  const user = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  }, [user]);

  return (
    <main className="page-container">
      <div className="mt-3 flex w-full items-center justify-between px-8 py-4 lg:mt-2">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-normal lg:text-5xl">
            My <span className="font-bold">Playlists</span>
          </h1>
          <h6 className="text-xs italic">All your user's Playlists.</h6>
        </div>
        <Link to="/profile">
          <img
            src={`${user?.images[0]?.url}`}
            alt="profile-pic"
            className="h-16 w-16 rounded-xl border-[1px] border-purple-500 shadow-lg dark:border-cyan-500 lg:h-40 lg:w-40"
          />
        </Link>
      </div>
      <div className="mb-6 grid h-fit grid-cols-1 lg:mb-0">
        <UserPlaylists accessToken={accessToken} user={user} />
      </div>
    </main>
  );
}
