import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          QuickHire
        </Link>
        <div className="space-x-6">
          <Link to="/">Jobs</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}