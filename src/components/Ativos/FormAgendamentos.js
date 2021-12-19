import React, { useState, useEffect } from "react";
import deepcopy from "deepcopy";

import Select from 'react-select';

// react-bootstrap components
import {
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

const FormAgendamentos = (props) => {
 
  const [dataSelecionada, setDataSelecionada] = useState({});

  const handleInputChange = e => {
    setDataSelecionada(e);
    setAgendamento((prevState) => ({
      ...prevState,
      dataAgendada: e.value
    }))
  }

  const [agendamento, setAgendamento] = useState(() => {
    return {
      dataAgendada: props.dataAgendada ? props.agendamento.dataAgendada : '',
      status: props.status ? props.agendamento.status : '',
      observacao: props.observacao ? props.agendamento.observacao : ''
    }
  });

  const handleNovoAgenda = (e) => {
    e.preventDefault();
    const allFieldsFilled = [agendamento.dataAgendada, agendamento.observacao].every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });
    if (allFieldsFilled) {
      agendamento.status = 'AGENDADA';
      let listaAgendamentos = deepcopy(props.listagemAgendamentos);
      listaAgendamentos.push(agendamento);
      props.setListagemAgendamentos(listaAgendamentos);
      props.setExibirErro(false);
    } else {
      props.setErrorMsg('Data Agendada e Observação são obrigatórios');
      props.setExibirErro(true);
    }
  }

  const cancelarAgendamento = (id) => {
    let listaAgendamentos = deepcopy(props.listagemAgendamentos)
    Array.from(listaAgendamentos).forEach(agenda => {
      if (agenda.id === id) {
        agenda.status = 'CANCELADA';
      }
    })
    props.setListagemAgendamentos(listaAgendamentos);
  }

  const apagarAgendamento = (id) => {
    const copyListAgenda = props.listagemAgendamentos.filter(x => x.id !== id);
    props.setListagemAgendamentos(copyListAgenda);
  }
  
  return (
    <>
      <Row>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Data Agendada</label>
            <Select options={props.opcoesData}
              value={dataSelecionada}
              onChange={handleInputChange}/>
          </Form.Group>
        </Col>
        <Col className="pr-1" md="4">
          <Form.Group>
            <label>Observação</label>
            <Form.Control
              placeholder="Observações sobre a manutenção"
              type="text"
              onChange={e => setAgendamento((prevState) => ({
                ...prevState, observacao: e.target.value}))}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="botao-tab" md="1">
          <Button variant="secondary" size="sm" onClick={handleNovoAgenda}>Adicionar</Button>
        </Col>
      </Row>
      <Row>
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th className="border-0">ID</th>
              <th className="border-0">Data Agendada</th>
              <th className="border-0">Status</th>
              <th className="border-0">Observação</th>
              <th className="border-0">Ação</th>
            </tr>
          </thead>
          <tbody>
            {props.listagemAgendamentos.map(agenda =>
              <tr key='{agenda.id}'>
                <th scope="row">{agenda.id}</th>
                <td>{agenda.dataAgendada}</td>
                <td>{agenda.status}</td>
                <td>{agenda.observacao}</td>
                <td>
                  <div>
                    <Button variant="danger" size="sm" onClick={() => cancelarAgendamento(agenda.id)}>Cancelar</Button>
                    {' '}
                    <Button variant="danger" size="sm" onClick={() => apagarAgendamento(agenda.id)}>Apagar</Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        
      </Row>
    </>
  );
}

export default FormAgendamentos;
