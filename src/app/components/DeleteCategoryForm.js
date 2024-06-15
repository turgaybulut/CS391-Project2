import React from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, CardTitle } from 'reactstrap';

export default function DeleteCategoryForm({ categories, deleteCategoryId, setDeleteCategoryId, handleCategoryDelete, deleteError, deleteSuccess }) {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h2">Delete Category</CardTitle>
                {deleteError && <Alert color="danger">{deleteError}</Alert>}
                {deleteSuccess && <Alert color="success">{deleteSuccess}</Alert>}
                <Form onSubmit={handleCategoryDelete}>
                    <FormGroup>
                        <Label for="deleteCategoryId">Select Category to Delete</Label>
                        <Input
                            type="select"
                            id="deleteCategoryId"
                            value={deleteCategoryId}
                            onChange={(e) => setDeleteCategoryId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button color="danger" type="submit" className="mt-3">
                        Delete Category
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};

