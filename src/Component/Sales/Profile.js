import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import MainLayout from "../Layout/MainLayout";
const Profile = () => {
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
                                        <Form.Label>Employ Id</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Select Role</Form.Label>
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option disabled>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Select State</Form.Label>
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option disabled>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Control>
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
export default Profile;