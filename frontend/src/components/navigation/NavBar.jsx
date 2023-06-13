import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";
import logo from "../../assets/images/logo-t.svg";

export default function NavBar() {
  const { setAccessToken } = useAuthContext();
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    setAccessToken(null);
    navigate("/");
  }

  return (
    <nav className="fixed bottom-0 left-0 z-10 flex h-12 w-screen flex-row items-center justify-evenly bg-gradient-to-b from-stone-100 via-stone-100 via-30% to-stone-100/90 text-neutral-950 dark:border-neutral-900 dark:from-neutral-950 dark:via-neutral-950 dark:via-30% dark:to-neutral-950/90 dark:text-stone-100 lg:h-screen lg:w-48 lg:flex-col lg:justify-around lg:border-r-[1px] lg:border-stone-200 lg:bg-stone-100 lg:px-8 lg:dark:bg-black">
      <div className="w-46 h-24 overflow-hidden">
        <Link to="/dashboard">
          <img
            src={logo}
            alt="logo"
            className="hidden lg:block lg:scale-150 lg:justify-start"
          />
        </Link>
      </div>
      <div className="flex h-full w-full flex-row items-center justify-evenly lg:h-2/5 lg:flex-col">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "relative flex h-full flex-row items-center justify-center text-sm text-purple-500 before:absolute before:bottom-0 before:h-1 before:w-full before:bg-purple-500 dark:text-cyan-500 dark:before:bg-cyan-500 lg:w-full lg:gap-1 lg:text-stone-100 lg:before:bottom-[calc(50%-1.4rem)] lg:before:h-4/6 lg:before:rounded-lg lg:dark:text-stone-100"
              : "flex h-full flex-row items-center gap-1 text-sm text-neutral-500 transition-all hover:text-purple-500 dark:hover:text-cyan-500"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 lg:z-10"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <p className="hidden lg:z-10 lg:block">Dashboard</p>
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive
              ? "relative flex h-full flex-row items-center justify-center text-sm text-purple-500 before:absolute before:bottom-0 before:h-1 before:w-full before:bg-purple-500 dark:text-cyan-500 dark:before:bg-cyan-500 lg:w-full lg:gap-1 lg:text-stone-100 lg:before:bottom-[calc(50%-1.4rem)] lg:before:h-4/6 lg:before:rounded-lg lg:dark:text-stone-100"
              : "flex h-full flex-row items-center gap-1 text-sm text-neutral-500 transition-all hover:text-purple-500 dark:hover:text-cyan-500"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 lg:z-10"
          >
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>

          <p className="hidden lg:z-10 lg:block">Library</p>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "relative flex h-full flex-row items-center justify-center text-sm text-purple-500 before:absolute before:bottom-0 before:h-1 before:w-full before:bg-purple-500 dark:text-cyan-500 dark:before:bg-cyan-500 lg:w-full lg:gap-1 lg:text-stone-100 lg:before:bottom-[calc(50%-1.4rem)] lg:before:h-4/6 lg:before:rounded-lg lg:dark:text-stone-100"
              : "flex h-full flex-row items-center gap-1 text-sm text-neutral-500 transition-all hover:text-purple-500 dark:hover:text-cyan-500"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 lg:z-10"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
          <p className="hidden lg:z-10 lg:block">Search</p>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "relative flex h-full flex-row items-center justify-center text-sm text-purple-500 before:absolute before:bottom-0 before:h-1 before:w-full before:bg-purple-500 dark:text-cyan-500 dark:before:bg-cyan-500 lg:w-full lg:gap-1 lg:text-stone-100 lg:before:bottom-[calc(50%-1.4rem)] lg:before:h-4/6 lg:before:rounded-lg lg:dark:text-stone-100"
              : "flex h-full flex-row items-center gap-1 text-sm text-neutral-500 transition-all hover:text-purple-500 dark:hover:text-cyan-500"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 lg:z-10"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          <p className="hidden lg:z-10 lg:block">Profile</p>
        </NavLink>
        <button
          type="button"
          onClick={() => setIsShow(!isShow)}
          className={
            isShow
              ? "relative flex h-full flex-row items-center gap-1 text-sm text-purple-500 transition-all dark:text-cyan-500"
              : "relative flex h-full flex-row items-center gap-1 text-sm text-neutral-500 transition-all hover:text-purple-500 dark:hover:text-cyan-500"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 lg:z-10"
          >
            <path
              fillRule="evenodd"
              d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
              clipRule="evenodd"
            />
          </svg>
          <p className="hidden lg:z-10 lg:block">Theme</p>
          <div
            className={
              isShow
                ? "absolute -left-10 bottom-14 flex h-full w-24 items-center justify-center gap-2 rounded-lg bg-stone-200 transition-all dark:bg-neutral-900 lg:-bottom-10 lg:-left-7 lg:h-4/6 lg:w-32"
                : "hidden"
            }
          >
            <ThemeSwitcher />
          </div>
        </button>
      </div>
      <button
        onClick={() => handleLogout()}
        type="button"
        className="mb-2 mt-4 hidden h-8 w-fit rounded-lg border-2 border-purple-500 px-4 text-xs text-purple-500 transition-all hover:border-purple-300 hover:text-purple-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-300 dark:hover:text-cyan-300 lg:block"
      >
        Disconnect
      </button>
    </nav>
  );
}
