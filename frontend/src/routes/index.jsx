import { Routes, Route } from "react-router-dom";

import Home from "../views/home";

import Register from "../views/auth/register";
import Login from "../views/auth/login";

import PostIndex from "../views/posts";
import PostCreate from "../views/posts/create";
import PostEdit from "../views/posts/edit";

export default function RoutesIndex(){
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/posts" element={<PostIndex/>}/>
            <Route path="/posts/create" element={<PostCreate/>}/>
            <Route path="/posts/edit/:id" element={<PostEdit/>}/>
        </Routes>
    )
}

// export default RoutesIndex