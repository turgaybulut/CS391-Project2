'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, Alert, FormGroup, Input, Form, Label, Modal, ModalBody, ModalHeader, ModalFooter, CardFooter } from 'reactstrap';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [addToCartModal, setAddToCartModal] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products")
                .then(response => response.json())
                .then(data => setProducts(data));
        } catch (error) {
            setError("Error fetching products");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/categories")
                .then(response => response.json())
                .then(data => setCategories(data));
        } catch (error) {
            setError("Error fetching categories");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
    }, [category]);

    useEffect(() => {
        const filterProducts = async () => {
            try {
                const response = await fetch("https://api.escuelajs.co/api/v1/products");
                const data = await response.json();
                const filteredProducts = data.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedCategory === '' || product.category.id === parseInt(selectedCategory))
                );
                setProducts(filteredProducts);
            } catch (error) {
                setError("Error fetching products");
            }
        };

        filterProducts();
    }, [searchTerm, selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        router.push(`/products?category=${e.target.value}`);
    };

    const handleReset = () => {
        setSelectedCategory('');
        setSearchTerm('');
        fetchProducts();
        router.push("/products");
    };

    return (
        <Container className="products-page">
            <Row>
                <Col>
                    <h2 className="my-4">Products</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Form className="filter-form">
                        <FormGroup>
                            <Input
                                type="text"
                                id="search"
                                placeholder="Search Products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Filter by Category</Label>
                            <Input type="select" id="category" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Button color="secondary" type="button" className="ml-2" onClick={handleReset}>Reset Filters</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {products.map(product => (
                    <Col xl={4} md={6} xs={12} key={product.id} className="product-card">
                        <Card>
                            <Link href={`/products/${product.id}`} passHref>
                                <CardImg top width="100%" src={product.images[0]} alt={product.title} />
                            </Link>
                            <CardBody>
                                <Link href={`/products/${product.id}`} passHref>
                                    <CardTitle tag="h5">{product.title}</CardTitle>
                                </Link>
                                <CardText className="product-price">💲{product.price}</CardText>
                                <CardText className="text-truncate">{product.description}</CardText>
                            </CardBody>
                            <CardFooter>
                                <Link href={`/products/${product.id}`} passHref>
                                    <Button color="primary">View Details</Button>
                                </Link>
                                <Button color="warning" onClick={() => setAddToCartModal(true)} className="ml-2">Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal isOpen={addToCartModal} toggle={() => setAddToCartModal(false)}>
                <ModalHeader toggle={() => setAddToCartModal(false)}>Add to Cart</ModalHeader>
                <ModalBody>
                    Product has been added to your cart!
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setAddToCartModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};
