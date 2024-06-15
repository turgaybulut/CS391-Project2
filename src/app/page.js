'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Spinner, Alert, CardImg } from 'reactstrap';

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const router = useRouter();

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
        fetchCategories();
    }, []);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === categories.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? categories.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const handleCategoryClick = (categoryId) => {
        router.push(`/products?category=${categoryId}`);
    };

    const slides = categories.map((category) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={category.id}
                className="index-carousel-item"
            >
                <div onClick={() => handleCategoryClick(category.id)}>
                    <CardImg src={category.image} alt={category.name} className="d-block w-100" />
                    <CarouselCaption captionHeader={category.name} />
                </div>
            </CarouselItem>
        );
    });

    if (error) {
        return (
            <Container className="my-5">
                <Alert color="danger">{error}</Alert>
            </Container>
        );
    }

    if (!categories.length) {
        return (
            <Container className="my-5">
                <Spinner />
            </Container>
        );
    }

    return (
        <Container className="my-5 carousel-container">
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h1>Welcome to My Store</h1>
                    <h5>Choose a category to start shopping</h5>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4 carousel-row">
                <Col md={8}>
                    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                        <CarouselIndicators items={categories} activeIndex={activeIndex} onClickHandler={goToIndex} className="carousel-indicators" />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} className="carousel-control" />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} className="carousel-control" />
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

