import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../styles/CategoriesAdmin.css';

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
      const response = await api.get('/api/categories');
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
      await api.post('/api/categories', category);
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
      await api.delete(`/api/categories/${categoryId}`);
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
      await api.put(`/api/categories/${category.id}`, category);
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
    <div className='admin-categories'>
      <h1 className='admin-categories__title'>CategoriesAdmin</h1>
      <button className='table__button table__button--add' onClick={toggleModal}>Add Category</button>
      <table className='admin-categories__table table'>
        <thead>
          <tr className='table__row'>
            <th className='table__header'>Category ID</th>
            <th className='table__header'>Category Name</th>
            <th className='table__header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr className='table__row' key={category.id}>
              <td className='table__data'>{category.id}</td>
              <td  className='table__data'>{category.category}</td>
              <td  className='table__data'>
                <button className='table__button table__button--delete' onClick={() => handleDelete(category.id)}>Delete</button>
                <button className='table__button table__button--edit' onClick={() => handleEdit(category)}>Edit</button>
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
            {category.id ? <button className="modal__button modal__button--update" onClick={handleUpdateButton}>Update</button> : <button className="modal__button modal__button--add" onClick={handleAddButton}>Add</button>}
            <button className="modal__button modal__button--close" onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesAdmin