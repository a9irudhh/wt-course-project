import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");  // Added for role
  const [starlab, setStarlab] = useState("");  // Added for starlab
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setSubmitting(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setErrorMsg("Passwords do not match");
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 3000);
      setSubmitting(false);
      event.stopPropagation();
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role, // Sending role
        starlab, // Sending starlab
      })
      .then((res) => {
        setSubmitting(false);
        navigate("/login");
      })
      .catch((err) => {
        setSubmitting(false);
        setError(true);
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setError(false);
          setErrorMsg("");
        }, 3000);
      });

    setValidated(true);
  };

  return (
    <Container className="signup-container">
      <Card>
        <Card.Body>
          <Card.Title>Signup</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter password
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please confirm password
              </Form.Control.Feedback>
            </Form.Group>

            {/* Added role and starlab fields */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide role
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>StarLab</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter StarLab"
                value={starlab}
                onChange={(e) => setStarlab(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide starlab
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                type="submit"
                {...(submitting ? { disabled: true } : {})}
              >
                {submitting ? (
                  <Spinner as="span" animation="border" role="status" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
          <div className="error">{error && <p>{errorMsg}</p>}</div>
        </Card.Body>
      </Card>
    </Container>
  );
}
