const axios = require('axios');

const API_URL = 'https://fakestoreapi.com';

exports.getProducts = async function () {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

exports.getProduct = async function (id) {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching product');
    }
};

exports.createProduct = async function (product) {
    try {
        const response = await axios.post(`${API_URL}/products`, product);
        return response.data;
    } catch (error) {
        throw new Error('Error creating product');
    }
};

exports.updateProduct = async function (id, product) {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, product);
        return response.data;
    } catch (error) {
        throw new Error('Error updating product');
    }
};

exports.deleteProduct = async function (id) {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting product');
    }
};

exports.getCategories = async function () {
    try {
        const response = await axios.get(`${API_URL}/products/categories`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories');
    }
};

exports.getProductsInCategory = async function (category) {
    try {
        const response = await axios.get(`${API_URL}/products/category/${category}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching products in category: ${category}`);
    }
};
