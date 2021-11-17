import React, { useState } from "react";

import { Alert } from 'reactstrap';

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";

import { autenticaUsuario } from "../../services/Auth.js";

const Login = (props) => {

  const [login, setLogin] = useState(() => {
    return {
      usuario: props.usuario ? props.login.usuario : '',
      senha: props.senha ? props.login.senha : ''
    }
  });
  const [exibirErro, setExibirErro] = useState(false);

  const fecharErro = () => {
    setExibirErro(false);
  }

  const handleSignUp = async e => {
    e.preventDefault();
    const sucesso = await autenticaUsuario({
      username: login.usuario,
      password: login.senha
    });
    if (sucesso) {
      props.history.push("/");
    } else {
      setExibirErro(true);
    }    
  }

  return (
      <Container fluid className="login-background">
        <Row className="login-container">
          <Col className="offset-md-4 text-center" md="4">
            <Card className="card-login">
              <Card.Header>
                <Card.Title as="h4">POC - SICA</Card.Title>
              </Card.Header>
              <Card.Body>
                <Alert 
                  color="danger"
                  isOpen={exibirErro}
                  toggle={fecharErro}>
                  <span>Usuário ou senha inválidos</span>
                </Alert>
                <Form className="text-left" onSubmit={handleSignUp}>
                  <Form.Group>
                    <label>Usuário</label>
                    <Form.Control
                      placeholder="Usuário"
                      type="text"
                      onChange={e => setLogin((prevState) => ({
                        ...prevState, usuario: e.target.value}))}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <label>Senha</label>
                    <Form.Control
                      placeholder="Senha"
                      type="password"
                      onChange={e => setLogin((prevState) => ({
                        ...prevState, senha: e.target.value}))}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info">
                   Login
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Login;
