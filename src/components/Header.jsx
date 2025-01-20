import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold">📚 Book Inventory Dashboard</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="text-2xl hover:text-green-400 transition">
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to="/add-book"
              className="text-2xl hover:text-green-400 transition"
            >
              Add Book
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
