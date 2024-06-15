import React from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, CardTitle } from 'reactstrap';

export default function UpdateCategoryForm({ categories, updateCategoryId, setUpdateCategoryId, newCategoryName, setNewCategoryName, handleCategoryUpdate, updateError, updateSuccess }) {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h2">Update Category</CardTitle>
                {updateError && <Alert color="danger">{updateError}</Alert>}
                {updateSuccess && <Alert color="success">{updateSuccess}</Alert>}
                <Form onSubmit={handleCategoryUpdate}>
                    <FormGroup>
                        <Label for="updateCategoryId">Select Category to Update</Label>
                        <Input
                            type="select"
                            id="updateCategoryId"
                            value={updateCategoryId}
                            onChange={(e) => setUpdateCategoryId(e.target.value)}
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
                    <FormGroup>
                        <Input
                            type="text"
                            id="newCategoryName"
                            placeholder="New category name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button color="primary" type="submit" className="mt-3">
                        Update Category
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};
