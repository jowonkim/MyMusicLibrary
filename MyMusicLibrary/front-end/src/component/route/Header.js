import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        crossOrigin="anonymous"
      />

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Music App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/music">Home</Nav.Link>
              <Nav.Link href="/music/list">Music List</Nav.Link>
              <NavDropdown title="My Page" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/music/add">Add Music</NavDropdown.Item>
                <NavDropdown.Item href="/music/cart">Cart</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/music/purchase">Purchase</NavDropdown.Item>
                <NavDropdown.Item href="/music/refund">Refund</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Community" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/community/board">Board</NavDropdown.Item>
                <NavDropdown.Item href="/community/qna">Q&A</NavDropdown.Item>
                <NavDropdown.Item href="/community/notice">Notice</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/community/find">Find Us</NavDropdown.Item>
                <NavDropdown.Item href="/community/contact">Contact</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#" disabled>
                Login
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search Music"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavScrollExample;
