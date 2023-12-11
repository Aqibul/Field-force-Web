import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import MainLayout from "../Layout/MainLayout";
const Pjb = () => {
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
                                    <Form.Group controlId="category">
                                        <Form.Label>Select Category</Form.Label>
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option disabled>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="list">
                                        <Form.Label>Select List</Form.Label>
                                        <Form.Control as="select" defaultValue="Choose...">
                                            <option disabled>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="concernedPerson">
                                        <Form.Label>Concerned Perosn</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="date">
                                        <Form.Label>Select date </Form.Label>
                                        <Form.Control type="date" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>


                                <Col md={6}>
                                    <Form.Group controlId="samvat">
                                        <Form.Label>Samvat </Form.Label>
                                        <Form.Control type="date" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="remarks">
                                        <Form.Label>Remarks </Form.Label>
                                        <Form.Control type="date" placeholder="Enter your name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Label>Payments </Form.Label>
                                        <Row>
                                            <Col md={6}>

                                                <Form.Check
                                                    type="radio"
                                                    label="Option 1"
                                                    name="radioGroup" // Add a common name for the radio button group
                                                    id="radio1"
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Option 2"
                                                    name="radioGroup" // Same name as the first radio button to group them
                                                    id="radio2"
                                                />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Form>

                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col >
                                <Button variant="primary" >Submit</Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>

            </Container>
        </MainLayout>
    )
}
export default Pjb;