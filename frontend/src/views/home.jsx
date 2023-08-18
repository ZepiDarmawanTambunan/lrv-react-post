import { useState, useEffect } from "react"

import api from '../api';

import { Link } from "react-router-dom";

export default function Home(){
    const [posts, setPosts] = useState([]);

    const fetchDataPosts = async () => {
        await api.get('/api/posts')
        .then(response => {
            setPosts(response.data.data.data);
        });
    };

    useEffect(() => {
        fetchDataPosts();
    }, []);

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Selamat datang diblog pribadi saya</h1>
                <p className="col-md-8 fs-4">blog ini akan menampilkan informasi seputar tutorial dan berita terkait teknologi informasi.</p>
                <br />
                <h3 className="fw-bold">Popular Post</h3>
                <hr />
                <div className="row">
                {
                    posts.length > 0
                    ? posts.map((post, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="card">
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/posts/${post.image}`} height={200} alt={post.title} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <Link to={`/posts/show/${post.id}`} className="btn btn-primary">READ MORE</Link>
                            </div>
                        </div>
                    </div>
                    )) : (
                        <div className="alert alert-danger mb-0">
                            Data Kosong!
                        </div>
                        )
                }
                </div>
            </div>
        </div>
    )
}