import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import NewReleases from "../components/user_content/NewReleases";
import { getPascalCase } from "../services/utils";

export default function Dashboard() {
  const { accessToken } = useAuthContext();
  const user = useUserContext();

  if (!user) return null;
  return (
    <main className="page-container">
      <div className="mt-3 flex w-full items-center justify-between px-8 py-4 lg:mt-2">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-normal lg:text-5xl">
            Hi, <span className="font-bold">{`${user.display_name}`}</span> !
          </h1>
          <h6 className="text-xs italic">
            {getPascalCase(`${user.product}`)} user.{" "}
            {user.product === "free" ? (
              <span>Only Premium can use the Player.</span>
            ) : null}
          </h6>
        </div>
        <Link to="/profile">
          <img
            src={`${user.images[0]?.url}`}
            alt="profile-pic"
            className="h-16 w-16 rounded-xl border-[1px] border-purple-500 shadow-lg dark:border-cyan-500 lg:h-40 lg:w-40"
          />
        </Link>
      </div>
      <div className="flex w-full flex-col justify-center">
        <div className="mb-6 grid h-fit grid-cols-1 lg:mb-0">
          <NewReleases accessToken={accessToken} />
        </div>
      </div>
    </main>
  );
}
