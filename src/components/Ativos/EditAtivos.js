import React, { useState, useEffect } from "react";
import axios from 'axios';
import deepcopy from "deepcopy";
import { Redirect } from 'react-router';

import FormAgendamentos from 'components/Ativos/FormAgendamentos.js';
import FormDadosGerais from 'components/Ativos/FormDadosGerais.js';
import FormParametros from 'components/Ativos/FormParametros.js';

import { adicionarAtivo } from './AtivoServices.js';

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
  Tabs,
  Tab
} from "react-bootstrap";

const EditAtivos = (props) => {

  const [redirecionar, setRedirecionar] = useState(false);
  const [parametros, setParametros] = useState([]);
  const [ativo, setAtivo] = useState(() => {
    return {
      codigo: props.codigo ? props.ativo.codigo : '',
      descricao: props.descricao ? props.ativo.descricao : '',
      categoria: props.categoria ? props.ativo.categoria : '',
      intervalo: props.intervalo ? props.ativo.intervalo : {},
      valorInicial: props.valorInicial ? props.ativo.valorInicial : '',
      valorAtual: props.valorAtual ? props.ativo.valorAtual : '',
      ativo: props.ativoStatus ? props.ativo.ativoStatus : '',
      dataCadastro: props.dataCadastro ? props.ativo.dataCadastro : ''
    }
  });
  const acao = props.match.params.acao;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [ativo.codigo, ativo.descricao, ativo.categoria, ativo.intervalo, ativo.valorInicial];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      let ativoDto = deepcopy(ativo);
      ativoDto.categoria = ativoDto.categoria.value;
      ativoDto.intervalo = ativoDto.intervalo.value;
      delete ativoDto.ativo;
      delete ativoDto.dataCadastro;
      
      adicionarAtivo(ativoDto)
        .then(res => {
          alert('Sucesso ao criar');
          setRedirecionar(true);
        })
        .catch(err => {
          console.log(err);
          alert('Falha ao apagar');
        });
    } else {
      errorMsg = 'Please fill out all the fields.';
      console.warn(errorMsg, ativo);
    }
    
  };
  if (redirecionar) {
    return <Redirect to='/admin/ativos'/>;
  } else {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  {acao == 'novo' ? (
                    <Card.Title as="h4">Adicionar Ativo</Card.Title>
                  ) : (
                    <Card.Title as="h4">Edição de Ativo</Card.Title>
                  )}
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleOnSubmit}>
                    <Tabs id="uncontrolled-tab-example" className="mb-3">
                      <Tab eventKey="gerais" title="Ativo">
                        <FormDadosGerais {...props} setAtivo={setAtivo} ativo={ativo} />
                      </Tab>
                      <Tab eventKey="parametros" title="Parâmetros">
                        <FormParametros {...props} parametros={parametros} />
                      </Tab>
                      {acao != 'novo' &&
                        <Tab eventKey="manutencoes" title="Manutenções">
                          <FormAgendamentos />
                        </Tab>
                      }
                    </Tabs>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info">
                      Voltar
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info">
                      Adicionar
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditAtivos;
