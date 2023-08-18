import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function PostShow() {
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState({});
    const { id } = useParams();

    const fetchDetailPost = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/api/posts/${id}`);
            setPost(response.data.data);
        } catch (error) {
            alert(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailPost();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            {isLoading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="font-weight-bold mb-2">{post.title}</h4>
                                    <hr className="my-2" />
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/posts/${post.image}`}
                                        height={200}
                                        alt={post.title}
                                        className="card-img-top"
                                    />
                                    <p className="text-muted mt-3">{post.content}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}