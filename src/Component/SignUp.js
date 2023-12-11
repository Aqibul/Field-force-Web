import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
    return (
        <Container>
            <Row>
                <Col md={6} mdOffset={3} style={{ marginTop: '20px', marginLeft: '285px' }} >
                    <Card>
                        <Card.Header>
                            <Card.Title className="text-center">Saller Sign Up</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col >
                                    <Button variant="primary" >Submit</Button>
                                    <Button variant="danger" Col md={6} mdOffset={6}>Reset</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card></Col>
            </Row>
        </Container>
    )
}
export default SignUp;