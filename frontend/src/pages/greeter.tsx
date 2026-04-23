import { Link } from 'react-router-dom';

export default function page() {
  return (
    <main>
      <div className="flex flex-col items-center gap-20">
        <p className="text-8xl font-bold tracking-normal text-secondary">
          Hunter <br />
          Poster
        </p>
        <Link
          to="/auth/login"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
