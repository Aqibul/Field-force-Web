import MainLayout from "../Layout/MainLayout";
import NavBar from "../Layout/NavBar";
import { Button, Card, Row, Col, Container, Form, CardFooter } from "react-bootstrap";
const Home = () => {
    return (
        <MainLayout>
            <Row>
            <Col md={3} bg="light" >
                <Card  className="text-white bg-primary">
                    <Card.Header style={{border:'none'}} >
                        <Card.Title>Dealer</Card.Title>
                    </Card.Header>
                    <Card.Body style={{border:'none'}}>
                        1
                    </Card.Body>
                    <CardFooter style={{border:'none'}}>
                        <a>View</a>
                    </CardFooter>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="card mb-4 text-white bg-info">
                    <Card.Header style={{border:'none'}}>
                        <Card.Title>Sub Dealer</Card.Title>
                    </Card.Header>
                    <Card.Body style={{border:'none'}}>
                        1
                    </Card.Body>
                    <CardFooter style={{border:'none'}}>
                        <a>View</a>
                    </CardFooter>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="card mb-4 text-white bg-warning">
                    <Card.Header style={{border:'none'}}>
                        <Card.Title>User</Card.Title>
                    </Card.Header>
                    <Card.Body style={{border:'none'}}>
                        1
                    </Card.Body>
                    <CardFooter style={{border:'none'}}>
                        <a>View</a>
                    </CardFooter>
                </Card>
            </Col>
            <Col md={3} className="p1"> 
                <Card className="card mb-4 text-white bg-danger">
                    <Card.Header style={{border:'none'}}>
                        <Card.Title>Quotation</Card.Title>
                    </Card.Header>
                    <Card.Body style={{border:'none'}}>
                        1
                    </Card.Body>
                    <CardFooter style={{border:'none'}}>
                        <a>View</a>
                    </CardFooter>
                </Card>
            </Col>
            </Row>
        </MainLayout>
    )
}
const cardStyle ={
    border: 'none',
}
export default Home;