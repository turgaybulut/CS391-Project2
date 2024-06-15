'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Spinner, Alert, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CardImg, Modal, ModalBody, ModalHeader, ModalFooter, CardFooter } from 'reactstrap';

export default function ProductDetails({ params }) {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [buyNowModal, setBuyNowModal] = useState(false);
    const [addToCartModal, setAddToCartModal] = useState(false);
    const id = params.id;

    useEffect(() => {
        if (id) {
            fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data))
                .catch(error => {
                    console.error("Error fetching product: ", error);
                    setError("Failed to fetch product. Please try again.");
                });
        }
    }, [id]);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === product.images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? product.images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = product ? product.images.map((image, index) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
            >
                <CardImg src={image} alt={`Slide ${index}`} className="d-block w-100" />
            </CarouselItem>
        );
    }) : null;

    if (!product) {
        return (
            <Container className="my-5">
                {error ? <Alert color="danger">{error}</Alert> : <Spinner />}
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="mb-3">
                <Col>
                    <Button color="info" onClick={() => router.back()}>Back to Products</Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                            <CarouselIndicators items={product.images} activeIndex={activeIndex} onClickHandler={goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} className="carousel-control" />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} className="carousel-control" />
                        </Carousel>
                        <CardBody>
                            <CardTitle tag="h5">{product.title}</CardTitle>
                            <CardText className="product-category">{product.category.name}</CardText>
                            <CardText className="product-price">💲{product.price}</CardText>
                            <CardText>{product.description}</CardText>
                        </CardBody>
                        <CardFooter>
                            <Button color="success" className="btn-space" onClick={() => setBuyNowModal(true)}>Buy Now</Button>
                            <Button color="warning" className="ml-2 btn-space" onClick={() => setAddToCartModal(true)}>Add to Cart</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={buyNowModal} toggle={() => setBuyNowModal(false)}>
                <ModalHeader toggle={() => setBuyNowModal(false)}>Buy Now</ModalHeader>
                <ModalBody>
                    Your purchase has been completed!
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setBuyNowModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
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

