'use client'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            setSuccess("Login successful! Redirecting to home...");
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }
    }, [userId, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                const userResponse = await fetch("https://api.escuelajs.co/api/v1/users");
                const users = await userResponse.json();
                const user = users.find((user) => user.email === email && user.password === password);
                setUserId(user.id);
                setEmail('');
                setPassword('');
                setError('');
            } else {
                throw new Error(data.message || "Invalid email or password");
            }
        } catch (error) {
            setError("Invalid email or password!");
        }
    }

    const handleRegister = () => {
        router.push("/register");
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} className="my-form">
                    <h2 className="my-4">Login</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                    {success && <Alert color="success">{success}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Input
                                type="email"
                                id="loginEmail"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                id="loginPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit" className="mt-3 btn-space">
                            Login
                        </Button>
                        <Button color="secondary" className="mt-3 btn-space" onClick={handleRegister}>
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
