import deepcopy from "deepcopy";

import React, { useState } from "react";
import { Alert } from 'reactstrap';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table
} from "react-bootstrap";

const FormParametros = ({parametros}, props) => {

  console.info("parametros: " + parametros );
  console.info("parametros: " + parametros.length );

  const [parametrosVazia, setParametrosVazia] = useState(parametros.length == 0);
  const [parametrosLocal, setParametrosLocal] = useState(parametros);

  const [exibirErro, setExibirErro] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fecharErro = () => { setExibirErro(false) };
  const [novoParam, setNovoParam] = useState(() => {
    return {
      nome: props.nome ? props.novoParam.nome : '',
      descricao: props.descricao ? props.novoParam.descricao : '',
      valor: props.valor ? props.novoParam.valor : ''
    }
  });

  const handleNovoParam = e => {
    e.preventDefault();
    const allFieldsFilled = [novoParam.nome, novoParam.valor].every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });
    if (allFieldsFilled) {
      let parametrosNovo = deepcopy(parametros);
      parametrosNovo.push(novoParam);
      setParametrosLocal(parametrosNovo);
      setParametrosVazia(false);
    } else {
      setErrorMsg('Nome e valor são obrigatórios');
      setExibirErro(true);
    }
  }

  const getListagemParams = (listParams) => {
    return listParams.map(item => {
      return (
        <tr key='{item.id}'>
          <th scope="row">{item.id}</th>
          <td>{item.nome}</td>
          <td>{item.descricao}</td>
          <td>{item.valor}</td>
          <td>
            <div>
              <Button variant="danger" size="sm" onClick={() => this.deleteItem()}>Apagar</Button>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
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
      <Row>
        <Col className="pr-1" md="3">
          <Form.Group>
            <label>Nome</label>
            <Form.Control
              placeholder="Nome do parâmetro"
              type="text"
              onChange={e => setNovoParam((prevState) => ({
                ...prevState, nome: e.target.value}))}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="px-1" md="5">
          <Form.Group>
            <label>Descrição</label>
            <Form.Control
              placeholder="Descrição do parâmetro"
              type="text"
              onChange={e => setNovoParam((prevState) => ({
                ...prevState, descricao: e.target.value}))}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="pl-1" md="3">
          <Form.Group>
            <label>Valor</label>
            <Form.Control
              placeholder="Valor do parâmetro"
              type="text"
              onChange={e => setNovoParam((prevState) => ({
                ...prevState, valor: e.target.value}))}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="" md="1">
          <Button variant="secondary" size="sm" onClick={handleNovoParam}>Adicionar</Button>
        </Col>
      </Row>
      <Row>
        {!parametrosVazia ? (
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Nome</th>
                <th className="border-0">Descrição</th>
                <th className="border-0">Valor</th>
                <th className="border-0">Ação</th>
              </tr>
            </thead>
            <tbody>
             {getListagemParams(parametrosLocal)}
            </tbody>
          </Table>
        ) : (
          <p className="message">Não há parâmetros cadastrados.</p>
        )}
      </Row>
    </>
  );
}

export default FormParametros;
