import { Link, useLocation } from "react-router-dom";

function Cabecera({ children }) {
  const location = useLocation();

  return (
    <div className="anime-header">
      <h1>Tu Appnime</h1>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "enlaceActivo" : ""}
        >
          Home
        </Link>

        <Link
          to="/favoritos"
          className={location.pathname === "/favoritos" ? "enlaceActivo" : ""}
        >
          Favoritos
        </Link>
      </div>

      {children}
    </div>
  );
}

export default Cabecera;
