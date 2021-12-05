import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { Alert } from 'reactstrap';

import { adicionar, buscarPorId } from "./ManutencaoServices.js";

function AddManutencao(props) {

  const { id } = props.match.params;
  const history = props.history;
  const isAcaoNovo = !id;
  
  const [exibirErro, setExibirErro] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fecharErro = () => { setExibirErro(false) };

  const [manutencao, setManutencao] = useState(() => {
    return {
      ativo: props.ativo ? props.manutencao.ativo : '',
      dataRealizada: props.dataRealizada ? props.manutencao.dataRealizada : '',
      agendamento: props.agendamento ? props.manutencao.agendamento : '',
      responsavel: props.responsavel ? props.manutencao.responsavel : '',
      observacao: props.observacao ? props.manutencao.observacao : ''
    }
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [manutencao.ativo, manutencao.dataRealizada, manutencao.responsavel, manutencao.observacao];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      let ativo = manutencao.ativo;
      delete manutencao.ativo;
      manutencao.ativo = {
        id: parseInt(ativo)
      }
      if (!manutencao.agendamento) {
        delete manutencao.agendamento;
      }
      
      adicionar(manutencao)
        .then(res => {
          history.push('.');
        })
        .catch(err => {
          console.error(err);
          setErrorMsg('Falha ao incluir Manutenção. Contate o administrador');
          setExibirErro(true);
        });
    } else {
      setErrorMsg('Todos os campos são obrigatórios');
      setExibirErro(true);
    }
  };


  useEffect(async () => {
    const fetchData = async () => {
      if (!isAcaoNovo) {
          // get user and set form fields
          buscarPorId(id).then(manutencao => {
            const localmanute = {
              id: manutencao.data.id,
              ativo: manutencao.data.ativo.id,
              dataRealizada: manutencao.data.dataRealizada,
              agendamento: manutencao.data.agendamento ? manutencao.data.agendamento : '',
              responsavel: manutencao.data.responsavel,
              observacao: manutencao.data.observacao
            }
            setManutencao(localmanute);
          });
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">{isAcaoNovo ? 'Adicionar Manutenção' : 'Edição de Manutenção'}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col className="pr-1" md="12">
                  <Alert 
                    color="danger"
                    isOpen={exibirErro}
                    toggle={fecharErro}>
                    <span>{errorMsg}</span>
                  </Alert>
                </Col>
              </Row>
              <Form onSubmit={handleOnSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Ativo</label>
                      <Form.Control
                        type="text"
                        value={manutencao.ativo}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, ativo: e.target.value}))}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="3">
                    <Form.Group>
                      <label>Data Manutenção</label>
                      <Form.Control
                        type="text"
                        value={manutencao.dataRealizada}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, dataRealizada: e.target.value}))}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="3">
                    <Form.Group>
                      <label>Agendamento</label>
                      <Form.Control
                        type="text"
                        value={manutencao.agendamento}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, agendamento: e.target.value}))}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pr-1" md="3">
                    <Form.Group>
                      <label>Responsável</label>
                      <Form.Control
                        type="text"
                        value={manutencao.responsavel}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, responsavel: e.target.value}))}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="8">
                    <Form.Group>
                      <label>Observação</label>
                      <Form.Control
                        type="text"
                        value={manutencao.observacao}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, observacao: e.target.value}))}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Link to="/admin/manutencao/">
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info">
                    Voltar
                  </Button>
                </Link>
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info">
                  Salvar
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

export { AddManutencao };