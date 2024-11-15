import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BreadCrumb from './BreadCrumb';

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://alev-backend-vercel.vercel.app/usersAdmin'); // Adjust the URL as needed
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())));
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, users]);

  // Calculate indices for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
      <div className='flex justify-center pb-3'>
      <BreadCrumb/>
      </div>
      
      <h2 className="text-2xl font-semibold text-center mb-4">Administrar Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar por username..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-10 border-b text-center">Username</th>
            <th className="py-2 px-4 border-b text-center">Rol</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td className="py-2 border-b text-center">{user.username}</td>
              <td className="py-2 px-4 border-b text-center">{user.rol}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleConvertToEmployee(user.id_usuario)}
                >
                  Convertir a Empleado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination controls */}
      <div className="flex justify-center mt-4 pb-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-blue-500 rounded"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-blue-500 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const handleConvertToEmployee = async (userId) => {
  try {
    await axios.post(`https://alev-backend-vercel.vercel.app/convertToEmployee/${userId}`);
    alert('Usuario convertido a empleado.');
    // Optionally, you can refresh the user list here
  } catch (error) {
    console.error('Error converting user:', error);
  }
};

export default AdminProfile;
