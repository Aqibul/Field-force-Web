import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import AdminLayout from "../../Layout/AdminLayout";
const AddRoles = () => {
    return (
        <AdminLayout>
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title className="text-center">Role</Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter role name" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>

                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col >
                                <Button variant="primary" >Save</Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>

            </Container>
        </AdminLayout>
    )
}
export default AddRoles;