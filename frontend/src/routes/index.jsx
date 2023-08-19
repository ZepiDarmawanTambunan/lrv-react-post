import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/home";

import Register from "../views/auth/register";
import Login from "../views/auth/login";

import PostIndex from "../views/posts";
import PostShow from "../views/posts/show";
import PostCreate from "../views/posts/create";
import PostEdit from "../views/posts/edit";
import { useAuth } from "../components/context/AuthProvider";

export default function RoutesIndex() {
    const { user, loadingFetchUser } = useAuth();
  
    const renderPostRoute = (element) => {
      if (loadingFetchUser) {
        return null;
      }
      if (user.name) {
        return element;
      }
      return <Navigate to="/" />;
    };
  
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/posts"
          element={renderPostRoute(<PostIndex />)}
        />
        <Route
          path="/posts/create"
          element={renderPostRoute(<PostCreate />)}
        />
        <Route
          path="/posts/edit/:id"
          element={renderPostRoute(<PostEdit />)}
        />
        <Route path="/posts/show/:id" element={<PostShow />} />
      </Routes>
    );
  }