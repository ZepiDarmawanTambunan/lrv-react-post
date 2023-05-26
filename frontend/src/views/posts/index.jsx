import { useState, useEffect } from "react"

import api from '../../api';

import { Link } from "react-router-dom";

export default function PostIndex() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchDataPosts = async (page=1) => {
        await api.get('/api/posts', {
            params:{
                page
            },
        })
        .then(response => {
            setPosts(response.data.data.data);
            setCurrentPage(response.data.data.current_page);
            setTotalPage(response.data.data.last_page);
        });
    };

    useEffect(() => {
        fetchDataPosts();
    }, []);

    const deletePost = async (id) => {
        await api.post(`api/posts/${id}`, { _method: "DELETE" })
          .then(() => {
            fetchDataPosts();
          });
      };
    
    const changePage = async (page) => {
        if (page < 1 || page > totalPage) {
            return;
        }
        await fetchDataPosts(page);
    };

    const renderPagination = () => {
        if (totalPage <= 1) {
            return null;
        }

        const pageNumbers = [];
        for (let i = 1; i <= totalPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => changePage(i)}>{i}</button>
                </li>
            );
        }

        return (
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => changePage(currentPage - 1)}>Previous</button>
                    </li>
                    {pageNumbers}
                    <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => changePage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/posts/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW POST</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Content</th>
                                        <th scope="col" style={{'width': '15%'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.length > 0
                                        ? posts.map((post, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <img src={"http://localhost:8000/storage/posts/"+post.image} alt={post.title} width="200" className="rounded" />
                                                </td>
                                                <td>{post.title}</td>
                                                <td>{post.content}</td>
                                                <td className="text-center">
                                                    <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                    <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                <div className="alert alert-danger mb-0">
                                                    Data belum tersedia !
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            {totalPage > 1 ? renderPagination() : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}