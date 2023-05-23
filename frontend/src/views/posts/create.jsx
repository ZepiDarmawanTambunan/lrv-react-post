import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api"

export default function PostCreate(){
    
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [content, setContent] = useState('');
    
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage));
        }else{
            setImage(null);
            setPreviewImage(null);
        }
    };

    const storePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);
    
        await api.post('/api/posts',formData)
        .then(() => {
            navigate('/posts')
        })
        .catch(error => {
            setErrors(error.response.data)
        });
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePost}>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control"/>
                                    {previewImage && (
                                        <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="mt-2"
                                        style={{ maxWidth: "200px" }}
                                        />
                                    )}
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.image[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Title</label>
                                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Title Post"/>
                                    {
                                        errors.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.title[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Content</label>
                                    <textarea className="form-control" onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Content Post"></textarea>
                                    {
                                        errors.content && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.content[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}