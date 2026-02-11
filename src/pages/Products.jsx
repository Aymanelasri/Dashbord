import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', description: '', available: true, stock: 0
  });

  useEffect(() => {
    setProducts(dataService.getProducts());
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: '', description: '', available: true, stock: 0 });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingProduct) {
      dataService.updateProduct(editingProduct.id, formData);
    } else {
      dataService.addProduct(formData);
    }
    setProducts(dataService.getProducts());
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dataService.deleteProduct(id);
      setProducts(dataService.getProducts());
    }
  };

  const getCategoryColor = (category) => {
    return category === 'Electronics' ? 'primary' : 'warning';
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Products Management</h1>
          <p className="text-muted mb-0">Manage your product inventory</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon style={{width: '18px', height: '18px'}} className="me-2" />
          Add Product
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Total Products</h6>
              <h3 className="fw-bold mb-0">{products.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Available</h6>
              <h3 className="fw-bold mb-0 text-success">{products.filter(p => p.available).length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Categories</h6>
              <h3 className="fw-bold mb-0">{[...new Set(products.map(p => p.category))].length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Avg Price</h6>
              <h3 className="fw-bold mb-0">${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="fw-semibold">{product.name}</div>
                    <small className="text-muted">{product.description}</small>
                    <div className="small text-info">Stock: {product.stock} | Sold: {product.sold}</div>
                  </td>
                  <td><span className={`badge bg-${getCategoryColor(product.category)}`}>{product.category}</span></td>
                  <td className="fw-bold text-success">${product.price}</td>
                  <td>
                    <span className={`badge ${product.available ? 'bg-success' : 'bg-danger'}`}>
                      {product.available ? 'Available' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-outline-warning" onClick={() => handleEdit(product)}>
                        <PencilIcon style={{width: '16px', height: '16px'}} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                        <TrashIcon style={{width: '16px', height: '16px'}} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingProduct ? 'Edit Product' : 'Add Product'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input type="number" step="0.01" className="form-control" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select className="form-control" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                        <option value="">Select</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} required />
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" checked={formData.available} onChange={(e) => setFormData({...formData, available: e.target.checked})} />
                    <label className="form-check-label">Available</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingProduct ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;