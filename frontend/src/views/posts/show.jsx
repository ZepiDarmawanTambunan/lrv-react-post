import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import api from "../../api"

export default function PostShow() {
    
    
  const [post, setPost] = useState({});

    const {id} = useParams();

    const fetchDetailPost = async () => {
        await api.get(`/api/posts/${id}`)
        .then(response => {
            setPost(response.data.data);
        })
        .catch(error => {
            alert(error.response.data)
        });
    }

    useEffect(() => {
        fetchDetailPost();
    }, []);

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">{post.title}</h4>
                            <hr />
                            <img src={"http://localhost:8000/storage/posts/"+post.image} height={200} alt={post.title} className="card-img-top"/>
                            <p className="card-text mt-3">{post.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}