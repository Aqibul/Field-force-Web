import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import MainLayout from "../../Layout/MainLayout";
const Architect = () => {
    return (
        <MainLayout>
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title className="text-center">Saller Profile</Card.Title>
                    </Card.Header>
                    <Card.Body>
                       
                            <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Architect</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Geotagged Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="number" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Designation</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                </Row>
                            </Form>
                        
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col >
                                <Button variant="primary" >Update</Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>

            </Container>
        </MainLayout>
    )
}
export default Architect;