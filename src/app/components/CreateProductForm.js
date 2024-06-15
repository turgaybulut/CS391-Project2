import React from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, CardTitle } from 'reactstrap';

export default function CreateProductForm({ categories, newProductName, setNewProductName, newProductPrice, setNewProductPrice, newProductDescription, setNewProductDescription, newProductCategoryId, setNewProductCategoryId, handleProductCreate, createError, createSuccess }) {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h2">Create Product</CardTitle>
                {createError && <Alert color="danger">{createError}</Alert>}
                {createSuccess && <Alert color="success">{createSuccess}</Alert>}
                <Form onSubmit={handleProductCreate}>
                    <FormGroup>
                        <Input
                            type="text"
                            id="newProductName"
                            placeholder="Product name"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="number"
                            id="newProductPrice"
                            placeholder="Product price"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                            required
                            min={0}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            id="newProductDescription"
                            placeholder="Product description"
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="newProductCategoryId">Select Product Category</Label>
                        <Input
                            type="select"
                            id="newProductCategoryId"
                            value={newProductCategoryId}
                            onChange={(e) => setNewProductCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button color="success" type="submit" className="mt-3">
                        Create Product
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
}