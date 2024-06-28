const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getCategories, 
    getProductsInCategory 
} = require('../api/fakestore');

jest.mock('axios');
const axios = require('axios');

describe('Fake Store API Integration Tests', () => {
    test('should fetch all products', async () => {
        axios.get.mockResolvedValue({ data: [{ id: 1, title: 'Product 1' }] });
        const products = await getProducts();
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
    });

    test('should fetch a single product by ID', async () => {
        axios.get.mockResolvedValue({ data: { id: 1, title: 'Product 1' } });
        const product = await getProduct(1);
        expect(product).toBeDefined();
        expect(product.id).toBe(1);
    });

    test('should create a new product', async () => {
        const newProduct = {
            title: 'Test Product',
            price: 29.99,
            description: 'This is a test product',
            image: 'https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-looking-down-on-white-stair-7oCKwO0TPhE',
            category: 'test'
        };
        axios.post.mockResolvedValue({ data: newProduct });
        const createdProduct = await createProduct(newProduct);
        expect(createdProduct).toBeDefined();
        expect(createdProduct.title).toBe(newProduct.title);
    });

    test('should update an existing product', async () => {
        const updatedProductData = {
            title: 'Updated Test Product',
            price: 39.99,
            description: 'This is an updated test product',
            image: 'https://unsplash.com/photos/person-hands-on-both-pockets-with-crossbody-bag-near-white-rock-HY1fq4ZtLTE',
            category: 'test-updated'
        };
        axios.put.mockResolvedValue({ data: updatedProductData });
        const updatedProduct = await updateProduct(1, updatedProductData);
        expect(updatedProduct).toBeDefined();
        expect(updatedProduct.title).toBe(updatedProductData.title);
    });

    test('should delete an existing product', async () => {
        axios.delete.mockResolvedValue({ data: { id: 1 } });
        const response = await deleteProduct(1);
        expect(response).toBeDefined();
        expect(response.id).toBe(1);
    });

    test('should fetch all categories', async () => {
        axios.get.mockResolvedValue({ data: ['category1', 'category2'] });
        const categories = await getCategories();
        expect(categories).toBeDefined();
        expect(categories.length).toBeGreaterThan(0);
    });

    test('should fetch products in a specific category', async () => {
        const category = 'electronics';
        axios.get.mockResolvedValue({ data: [{ id: 1, category: 'electronics' }] });
        const products = await getProductsInCategory(category);
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].category).toBe(category);
    });

    // Testes de erro
    test('should throw an error when fetching all products fails', async () => {
        axios.get.mockRejectedValue(new Error('Error fetching products'));
        await expect(getProducts()).rejects.toThrow('Error fetching products');
    });

    test('should throw an error when fetching a product by ID fails', async () => {
        axios.get.mockRejectedValue(new Error('Error fetching product'));
        await expect(getProduct(1)).rejects.toThrow('Error fetching product');
    });

    test('should throw an error when creating a product fails', async () => {
        axios.post.mockRejectedValue(new Error('Error creating product'));
        await expect(createProduct({ title: 'Test Product' })).rejects.toThrow('Error creating product');
    });

    test('should throw an error when updating a product fails', async () => {
        axios.put.mockRejectedValue(new Error('Error updating product'));
        await expect(updateProduct(1, { title: 'Updated Test Product' })).rejects.toThrow('Error updating product');
    });

    test('should throw an error when deleting a product fails', async () => {
        axios.delete.mockRejectedValue(new Error('Error deleting product'));
        await expect(deleteProduct(1)).rejects.toThrow('Error deleting product');
    });

    test('should throw an error when fetching categories fails', async () => {
        axios.get.mockRejectedValue(new Error('Error fetching categories'));
        await expect(getCategories()).rejects.toThrow('Error fetching categories');
    });

    test('should throw an error when fetching products in a category fails', async () => {
        const category = 'electronics';
        axios.get.mockRejectedValue(new Error(`Error fetching products in category: ${category}`));
        await expect(getProductsInCategory(category)).rejects.toThrow(`Error fetching products in category: ${category}`);
    });
});
