import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pagination.css';
import Unauthorized from './Unauthorized';

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4100/api/users?page=${page}&search=${searchTerm}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUsers(data.users);
          toast.success("Data Retreived Successfully")
        } else {
          toast.error("You are not authenticated buddy..")
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("You are not authenticated buddy..")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      fontWeight: "bold",
      fontFamily: "cursive",
      fontSize: "2rem",
    }}>Loading...</div>;
  }

  if(!localStorage.getItem("jwtToken")) {
    return <Unauthorized />
  } else {

 return (
   <div className="pagination-container">
  <h1 className="pagination-header">Users List</h1>
  <div>
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={handleSearch}
      className="pagination-input"
    />
  </div>
  <ul className="pagination-list">
    {users.map((user) => (
      <li key={user.id} className="pagination-item">
        {user.email}
      </li>
    ))}
  </ul>
  <div>
    <button onClick={handlePrevPage} disabled={page === 1} className="pagination-button">
      Previous
    </button>
    <span> </span>
    <span className="pagination-info">Page {page}</span>
    <span> </span>
    <button onClick={handleNextPage} className="pagination-button">
      Next
    </button>
  </div>
</div>
);
    }
};


export default Pagination;
