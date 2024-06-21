//import Link from react router dom
import { Link } from "react-router-dom";
import Routes from './routes';
import { useAuth } from "./components/context/AuthProvider";

//import routes

function App() {
  const {user, logout} = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="/" className="navbar-brand">HOME</Link>
            <button
              className="navbar-toggler bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                  user.name
                  ? (
                    <>
                    <li className="nav-item">
                      <Link to="/posts" className="nav-link active" aria-current="page">
                        POSTS
                      </Link>
                    </li>
                      {
                        user.role === 'admin' && (
                          <li className="nav-item">
                            <Link to="/users" className="nav-link active" aria-current="page">
                              USERS
                            </Link>
                          </li>
                        )
                      }
                    </>
                  )
                  :
                  (
                    <>
                      <li className="nav-item">
                        <Link to="/login" className="nav-link active" aria-current="page">
                          LOGIN
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/register" className="nav-link active" aria-current="page">
                          REGISTER
                        </Link>
                      </li>
                    </>
                  )
                }
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
                <a
                  href="https://www.instagram.com/zepi_darmawan/"
                  target="_blank"
                  className="btn btn-primary"
                  >Kontak</a
                >
                <div className="px-2 py-1"></div>
                {
                    user.name && (
                      <a
                      href="#"
                      onClick={handleLogout}
                      className="btn btn-danger"
                      >Logout</a>
                    )
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Routes />
    </>
  )
}

export default App
