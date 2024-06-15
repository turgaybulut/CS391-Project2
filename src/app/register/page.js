'use client'
import { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert, Label } from 'reactstrap';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            // check email availability
            const allUsers = await fetch("https://api.escuelajs.co/api/v1/users",
                { method: "GET" });
            if (!allUsers.ok) {
                throw new Error("Error fetching users");
            }
            const allUsersJson = await allUsers.json();
            if (allUsersJson.some(user => user.email === email)) {
                setError("Email already in use. Please try another.");
                return;
            }

            // register user
            const avatar = "https://i.imgur.com/LDOO4Qs.jpg"; // just for example usage
            const response = await fetch("https://api.escuelajs.co/api/v1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, avatar })
            });

            if (!response.ok) {
                throw new Error("Error registering user");
            }

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error) {
            setError("Failed to register. Please try again.");
        }
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} className="my-form">
                    <h2 className="my-4">Register</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                    {success && <Alert color="success">{success}</Alert>}
                    <Form onSubmit={handleRegister}>
                        <FormGroup>
                            <Input
                                type="text"
                                id="registerName"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="email"
                                id="registerEmail"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                id="registerPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                id="registerConfirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </FormGroup>
                        <Input id="acceptTerms" type="checkbox" className="mt-2" required />
                        <Label for="acceptTerms" className="mt-1">I accept the terms and conditions</Label>
                        <br />
                        <Button color="primary" type="submit" className="mt-3">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
