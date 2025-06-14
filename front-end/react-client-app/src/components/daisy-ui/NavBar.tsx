import type { NavBarComponent } from "../../utils/types/components-interface";
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import squares from "../../assets/squares.svg"

export function NavBar({title, pages, isLoggedIn, alerts,}:NavBarComponent) {

    function mobileDipdownClick() {
    const activeElement: Element | null =
      document.activeElement as HTMLButtonElement;
    (activeElement as HTMLButtonElement)?.blur();
  }
  return (
    <header>
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost md:hidden">
              <FontAwesomeIcon icon={faBars} />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {pages.map((item) => (
                <li onClick={mobileDipdownClick} key={item.name}>
                  <NavLink to={item.url}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden flex px-2 flex-row items-center gap-2 text-xl font-bold text-primary">
            <Link to="home">{title}</Link>
          </div>
          <div className="hidden md:flex px-2 flex-row items-center gap-2 text-xl font-bold text-primary">
            <Link className="flex gap-2" to="home">
              <img className="w-6 h-6 fill-primary" src={squares} alt="Company logo" />
              {title}
            </Link>
          </div>
          
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            {pages.map((item) => (
              <li key={item.name}>
                <NavLink className={({isActive})=> isActive ? 'underline' : ''} to={item.url}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <FontAwesomeIcon icon={faBell} size="xl" />
                  {alerts && (
                    <span className="badge badge-xs badge-primary indicator-item">
                      4
                    </span>
                  )}
                </div>
              </button>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost">
                  <FontAwesomeIcon icon={faUserTie} size="xl" />
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-25 p-2 shadow"
                >
                  <li onClick={mobileDipdownClick}>
                    <NavLink to={"/logout"}>Log out</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <NavLink style={({isActive})=>isActive ?{display: 'none'} : {}} to={"login"} className="btn btn-secondary">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )

}