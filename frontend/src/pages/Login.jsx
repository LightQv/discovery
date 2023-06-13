import { Link } from "react-router-dom";
import logo from "../assets/images/logo-wt.svg";

const AUTH_FULL_URL = `${import.meta.env.VITE_AUTH_URL}client_id=${
  import.meta.env.VITE_CLIENT_ID
}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&redirect_uri=${
  import.meta.env.VITE_REDIRECT_URI
}&scope=${import.meta.env.VITE_SCOPE}`;

export default function Login() {
  return (
    <main className="relative z-20 flex h-screen w-screen flex-col items-center justify-center bg-stone-100 text-neutral-950 dark:bg-neutral-950 dark:text-stone-100">
      <div className="flex w-full flex-col items-center justify-evenly lg:w-2/5 lg:rounded-lg lg:px-16 lg:py-12">
        <div className="h-48 w-60 overflow-hidden">
          <img src={logo} alt="logo" className="scale-150" />
        </div>
        <Link to={AUTH_FULL_URL}>
          <button
            type="button"
            className="mb-2 mt-4 h-10 w-44 rounded-lg bg-purple-500 text-stone-100 shadow-lg shadow-purple-500/50 transition-all hover:bg-purple-300"
          >
            Connect with Spotify
          </button>
        </Link>
        <div className="text-xs">
          Need to create an account ?{" "}
          <a
            href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwih0rriq47_AhXATaQEHewKAbcQFnoECAoQAQ&url=https%3A%2F%2Fwww.spotify.com%2Fus%2Fsignup&usg=AOvVaw0M0Bx5WvPsxcYC6xeJONKM"
            className="text-xs text-cyan-500 decoration-current"
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>
        </div>
      </div>
    </main>
  );
}
