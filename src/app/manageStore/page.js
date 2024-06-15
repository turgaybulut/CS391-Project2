'use client'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UpdateCategoryForm from '../components/UpdateCategoryForm';
import DeleteCategoryForm from '../components/DeleteCategoryForm';
import CreateProductForm from '../components/CreateProductForm';

export default function ManageStore() {
    const [categories, setCategories] = useState([]);
    const [updateCategoryId, setUpdateCategoryId] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [createError, setCreateError] = useState('');
    const [createSuccess, setCreateSuccess] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductCategoryId, setNewProductCategoryId] = useState('');
    // Just for example, you can use any image URL. It is not possible to upload images in this project.
    const newProductImages = ["https://aday.ozyegin.edu.tr/sites/default/files/styles/medium/public/2023-04/article1.png?itok=syiXMQKd", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_GT1JtvzlpRaYvrOai2TNwUThRNjINV98Xvltr-1fA&s"];

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/categories",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const handleCategoryUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${updateCategoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newCategoryName })
            });

            if (!response.ok) {
                throw new Error("Error updating category");
            }

            setUpdateError('');
            setUpdateSuccess("Category updated successfully!");
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
            setUpdateError("Error updating category: " + error.message);
            setUpdateSuccess('');
        }
    };

    const handleCategoryDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${deleteCategoryId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error deleting category');
            }

            setDeleteError('');
            setDeleteSuccess("Category deleted successfully!");
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
            setDeleteError("Error deleting category: " + error.message);
            setDeleteSuccess('');
        }
    };

    const handleProductCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: newProductName,
                    price: newProductPrice,
                    description: newProductDescription,
                    categoryId: newProductCategoryId,
                    images: newProductImages
                })
            });

            if (!response.ok) {
                throw new Error("Error creating product");
            }

            setCreateError('');
            setCreateSuccess("Product created successfully!");
            fetchProducts();
        }
        catch (error) {
            console.error("Error creating product:", error);
            setCreateError("Error creating product: " + error.message);
            setCreateSuccess('');
        }
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={5} className="my-form">
                    <UpdateCategoryForm
                        categories={categories}
                        updateCategoryId={updateCategoryId}
                        setUpdateCategoryId={setUpdateCategoryId}
                        newCategoryName={newCategoryName}
                        setNewCategoryName={setNewCategoryName}
                        updateError={updateError}
                        updateSuccess={updateSuccess}
                        handleCategoryUpdate={handleCategoryUpdate}
                    />
                </Col>
                <Col md={5} className="my-form">
                    <DeleteCategoryForm
                        categories={categories}
                        deleteCategoryId={deleteCategoryId}
                        setDeleteCategoryId={setDeleteCategoryId}
                        deleteError={deleteError}
                        deleteSuccess={deleteSuccess}
                        handleCategoryDelete={handleCategoryDelete}
                    />
                </Col>
                <Col md={5} className="my-form">
                    <CreateProductForm
                        categories={categories}
                        newProductName={newProductName}
                        setNewProductName={setNewProductName}
                        newProductPrice={newProductPrice}
                        setNewProductPrice={setNewProductPrice}
                        newProductDescription={newProductDescription}
                        setNewProductDescription={setNewProductDescription}
                        newProductCategoryId={newProductCategoryId}
                        setNewProductCategoryId={setNewProductCategoryId}
                        createError={createError}
                        createSuccess={createSuccess}
                        handleProductCreate={handleProductCreate}
                    />
                </Col>
            </Row>
        </Container>
    );
};
