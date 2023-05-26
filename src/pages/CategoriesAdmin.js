import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/CategoriesAdmin.css';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState({
    id: null,
    category: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/admin/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/categories', category);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
    setCategory({
      id: null,
    category: '',
    });
    toggleModal();
  }

  const handleCloseButton = async (e) => {
    setCategory({
      id: null,
    category: '',
    });
    toggleModal();
  }

  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/api/admin/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category) => {
    setCategory(category);
    toggleModal();
  }

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/categories/${category.id}`, category);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
    setCategory({
      id: null,
    category: '',
    });
    toggleModal();
  }

  console.log(category);

  return (
    <>
      <div>CategoriesAdmin</div>
      <button onClick={toggleModal}>Add Category</button>
      <table>
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.category}</td>
              <td>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
                <button onClick={() => handleEdit(category)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Category</h2>
            <input className="modal__input" type="text" placeholder='Category Name' onChange={handleChange} value={category.category} name='category'/>
            {category.id ? <button onClick={handleUpdateButton}>Update</button> : <button onClick={handleAddButton}>Add</button>}
            <button onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
      </>
  )
}

export default CategoriesAdmin