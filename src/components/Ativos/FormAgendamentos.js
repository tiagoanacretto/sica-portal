import React from "react";

import Select from 'react-select';

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

function FormAgendamentos() {
  const opcoesStatus = [
    { value: 'AGENDADA', label: 'Agendada' },
    { value: 'EM_EXECUCAO', label: 'Em execução' },
    { value: 'REALIZADA', label: 'Realizada' },
    { value: 'CANCELADA', label: 'Cancelada' }
  ]
  
  return (
    <>
      <Row>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Data Agendada</label>
            <Form.Control
              placeholder="Data agendada para a manutenção"
              type="text"
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Data Realizada</label>
            <Form.Control
              placeholder="Data em que a manutenção foi realizada"
              type="text"
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Status</label>
            <Select options={opcoesStatus} />
          </Form.Group>
        </Col>
        <Col className="pr-1" md="3">
          <Form.Group>
            <label>Observação</label>
            <Form.Control
              placeholder="Observações sobre a manutenção"
              type="text"
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="" md="1">
          <Button variant="secondary" size="sm" onClick={() => this.deleteItem(item.id)}>Editar</Button>
        </Col>
      </Row>
      <Row>
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
            <tr key='{item.id}'>
              <th scope="row">item.id</th>
              <td>item.nome</td>
              <td>item.descricao</td>
              <td>item.valor</td>
              <td>
                <div>
                  <Button variant="danger" size="sm" onClick={() => this.deleteItem()}>Apagar</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        
      </Row>
    </>
  );
}

export default FormAgendamentos;
