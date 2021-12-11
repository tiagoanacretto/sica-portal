import React, { useState, useEffect } from "react";
import deepcopy from "deepcopy";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";

import FormAgendamentos from 'components/Ativos/FormAgendamentos.js';
import FormDadosGerais from 'components/Ativos/FormDadosGerais.js';

import { adicionarAtivo, buscarAtivoPorId } from './AtivoServices.js';

import { Button, Card, Form, Container, Row, Col, Tabs, Tab, Table } from "react-bootstrap";
import { Alert } from 'reactstrap';

const EditAtivos = (props) => {

  const { id } = props.match.params;
  const history = props.history;
  const isAcaoNovo = !id;

  const [redirecionar, setRedirecionar] = useState(false);
  const [exibirErro, setExibirErro] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fecharErro = () => { setExibirErro(false) };
  
  const [ativo, setAtivo] = useState(() => {
    return {
      codigo: props.codigo ? props.ativo.codigo : '',
      descricao: props.descricao ? props.ativo.descricao : '',
      categoria: props.categoria ? props.ativo.categoria : '',
      intervalo: props.intervalo ? props.ativo.intervalo : {},
      valorInicial: props.valorInicial ? props.ativo.valorInicial : '',
      valorAtual: props.valorAtual ? props.ativo.valorAtual : '',
      ativo: props.ativoStatus ? props.ativo.ativoStatus : '',
      dataCadastro: props.dataCadastro ? props.ativo.dataCadastro : '',
      parametros: props.parametros ? props.ativo.parametros : []
    }
  });
  const [listagemParametros, setListagemParametros] = useState(() => {
    return {
      params: props.params ? props.parametros.params : [],
      vazia: props.vazia ? props.parametros.vazia : true
    }
  });
  const [parametroEdicao, setParametroEdicao] = useState(() => {
    return {
      nome: props.nome ? props.parametroEdicao.nome : '',
      descricao: props.descricao ? props.parametroEdicao.descricao : '',
      valor: props.valor ? props.parametroEdicao.valor : ''
    }
  });

  useEffect(() => {
    if (!isAcaoNovo) {
        buscarAtivoPorId(id).then(ativoBd => {
            //const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
            //fields.forEach(field => setValue(field, user[field]));
            alert(ativoBd.data);
            setAtivo(ativoBd.data);
        });
    }
  }, []);

  const handleNovoParam = e => {
    e.preventDefault();
    const allFieldsFilled = [parametroEdicao.nome, parametroEdicao.valor].every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });
    if (allFieldsFilled) {
      let parametrosNovo = deepcopy(listagemParametros.params);
      parametrosNovo.push(parametroEdicao);
      setListagemParametros((prevState) => ({
        params: parametrosNovo,
        vazia: false
      }));
      setExibirErro(false);
    } else {
      setErrorMsg('Nome e valor são obrigatórios');
      setExibirErro(true);
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [ativo.codigo, ativo.descricao, ativo.categoria, ativo.intervalo, ativo.valorInicial];

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
      if (!listagemParametros.vazia) {
        ativoDto.parametros = listagemParametros.params;
      }
      
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
      setErrorMsg('Código, descrição, categoria, intervalo e valor compra são obrigatórios');
      setExibirErro(true);
    }
  };

  const getListagemParams = (listParams) => {
    return listParams.map(item => {
      return (
        <tr key='{item.nome}'>
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
                  <Card.Title as="h4">{isAcaoNovo ? 'Adicionar Ativo' : 'Edição de Ativo'}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="12">
                      <Alert 
                        color="danger"
                        isOpen={exibirErro}
                        toggle={fecharErro}>
                        <span>{errorMsg}</span>
                      </Alert>
                    </Col>
                  </Row>
                  <Form onSubmit={handleOnSubmit}>
                    <Tabs id="uncontrolled-tab-example" className="mb-3 tab-ativos">
                      <Tab eventKey="gerais" title="Ativo">
                        <FormDadosGerais {...props} setAtivo={setAtivo} ativo={ativo} />
                      </Tab>
                      <Tab eventKey="parametros" title="Parâmetros">
                        <Row>
                          <Col className="pr-1" md="3">
                            <Form.Group>
                              <label>Nome</label>
                              <Form.Control
                                placeholder="Nome do parâmetro"
                                type="text"
                                onChange={e => setParametroEdicao((prevState) => ({
                                  ...prevState, nome: e.target.value}))}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Descrição</label>
                              <Form.Control
                                placeholder="Descrição do parâmetro"
                                type="text"
                                onChange={e => setParametroEdicao((prevState) => ({
                                  ...prevState, descricao: e.target.value}))}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="pr-1" md="3">
                            <Form.Group>
                              <label>Valor</label>
                              <Form.Control
                                placeholder="Valor do parâmetro"
                                type="text"
                                onChange={e => setParametroEdicao((prevState) => ({
                                  ...prevState, valor: e.target.value}))}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="botao-tab" md="1">
                            <Button variant="secondary" size="sm" onClick={handleNovoParam}>Adicionar</Button>
                          </Col>
                        </Row>
                        <Row>
                          {!listagemParametros.vazia ? (
                            <Table className="table-hover table-striped">
                              <thead>
                                <tr>
                                  <th className="border-0">Nome</th>
                                  <th className="border-0">Descrição</th>
                                  <th className="border-0">Valor</th>
                                  <th className="border-0">Ação</th>
                                </tr>
                              </thead>
                              <tbody>
                                { getListagemParams(listagemParametros.params) }
                              </tbody>
                            </Table>
                          ) : (
                            <Col>
                            <p className="message">Não há parâmetros cadastrados.</p>
                            </Col>
                          )}
                        </Row>
                      </Tab>
                      {!isAcaoNovo &&
                        <Tab eventKey="manutencoes" title="Manutenções">
                          <FormAgendamentos />
                        </Tab>
                      }
                    </Tabs>
                    <Row>
                      <Col className="direita">
                        <Link to="/admin/ativos/">
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="primary">
                            Voltar
                          </Button>
                        </Link>
                        <span className="separador"/>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="primary">
                          Salvar
                        </Button>
                        <div className="clearfix"></div>
                      </Col>
                    </Row>
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

export { EditAtivos };
