import React, { useState, useEffect } from "react";
import deepcopy from "deepcopy";
import { Link } from "react-router-dom";

import FormAgendamentos from 'components/Ativos/FormAgendamentos.js';
import FormDadosGerais from 'components/Ativos/FormDadosGerais.js';

import { adicionarAtivo, buscarAtivoPorId, alterar } from './AtivoServices.js';
import { dataManutencaoDisponivel } from '../Manutencao/ManutencaoServices';

import { Button, Card, Form, Container, Row, Col, Tabs, Tab, Table } from "react-bootstrap";
import { Alert } from 'reactstrap';

const EditAtivos = (props) => {

  const { id } = props.match.params;
  const history = props.history;
  const isAcaoNovo = !id;

  const [exibirErro, setExibirErro] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fecharErro = () => { setExibirErro(false) };
  
  const [ativo, setAtivo] = useState(() => {
    return {
      codigo: props.codigo ? props.ativo.codigo : '',
      descricao: props.descricao ? props.ativo.descricao : '',
      categoria: props.categoria ? props.ativo.categoria : '',
      intervaloManutencao: props.intervaloManutencao ? props.ativo.intervaloManutencao : {},
      valorCompra: props.valorInicial ? props.ativo.valorInicial : '',
      statusAtivo: props.statusAtivo ? props.ativo.statusAtivo : '',
      dataCadastro: props.dataCadastro ? props.ativo.dataCadastro : '',
      parametros: props.parametros ? props.ativo.parametros : []
    }
  });
  const [listagemParametros, setListagemParametros] = useState([]);
  const [listagemAgendamentos, setListagemAgendamentos] = useState([]);
  const [opcoesData, setOpcoesData] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState({});
  const [parametroEdicao, setParametroEdicao] = useState(() => {
    return {
      nome: props.nome ? props.parametroEdicao.nome : '',
      descricao: props.descricao ? props.parametroEdicao.descricao : '',
      valor: props.valor ? props.parametroEdicao.valor : ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isAcaoNovo) {
        buscarAtivoPorId(id).then(ativoBd => {
            setAtivo(ativoBd.data);
            if (ativoBd.data.parametros) {
              setListagemParametros(ativoBd.data.parametros);
            }
            if (ativoBd.data.agendamentos) {
              setListagemAgendamentos(ativoBd.data.agendamentos);
            }
            carregarOpcoesData(ativoBd.data.categoria);
        });
      }
    };
    fetchData();
  }, []);

  const carregarOpcoesData = (categoria) => {
    dataManutencaoDisponivel(categoria).then(datasDisponiveis => {
      setOpcoesData(
        datasDisponiveis.data.map(data => {
          return  { name: 'opcaoData', value: data, label: data };
        })
      );
    });
  }

  const handleNovoParam = e => {
    e.preventDefault();
    const allFieldsFilled = [parametroEdicao.nome, parametroEdicao.valor].every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });
    if (allFieldsFilled) {
      let parametrosNovo = deepcopy(listagemParametros);
      parametrosNovo.push(parametroEdicao);
      setListagemParametros(parametrosNovo);
      setExibirErro(false);
    } else {
      setErrorMsg('Nome e valor s??o obrigat??rios');
      setExibirErro(true);
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [ativo.codigo, ativo.descricao, ativo.categoria, ativo.intervaloManutencao, ativo.valorCompra];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      let ativoDto = deepcopy(ativo);
      ativoDto.categoria = ativoDto.categoria.value;
      ativoDto.intervaloManutencao = ativoDto.intervaloManutencao.value;

      ativoDto.parametros = listagemParametros;
      
      if (isAcaoNovo) {
        delete ativoDto.ativo;
        delete ativoDto.dataCadastro;
        adicionarAtivo(ativoDto)
          .then(res => {
            history.push(`./msg/${res.data.id}`);
          })
          .catch(err => {
            console.error(err);
            setErrorMsg('Erro ao salvar Ativo. Contate o administrador.');
            setExibirErro(true);
          });
      } else {
        if (listagemAgendamentos && listagemAgendamentos.length) {
          ativoDto.agendamentos = listagemAgendamentos
        } else {        
          delete ativoDto.agendamentos
        }
        if (ativoDto.parametros && !ativoDto.parametros.length) {
          delete ativoDto.parametros
        }
        alterar(ativoDto)
          .then(res => {
            history.push(`../msg/${res.data.id}`);
          })
          .catch(err => {
            console.error(err);
            setErrorMsg('Falha ao alterar Ativo. Contate o administrador');
            setExibirErro(true);
          });
      }
    } else {
      setErrorMsg('C??digo, descri????o, categoria, intervalo e valor compra s??o obrigat??rios');
      setExibirErro(true);
    }
  };

  const deleteItem = (nome) => {
    const copyListParam = listagemParametros.filter(x => x.nome !== nome);
    setListagemParametros(copyListParam);
  }

  const getListagemParams = (listParams) => {
    return listParams.map(item => {
      return (
        <tr key='{item.nome}'>
          <td>{item.id}</td>
          <td>{item.nome}</td>
          <td>{item.descricao}</td>
          <td>{item.valor}</td>
          <td>
            <div>
              <Button variant="danger" size="sm" onClick={() => deleteItem(item.nome)}>Apagar</Button>
            </div>
          </td>
        </tr>
      )
    })
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{isAcaoNovo ? 'Adicionar Ativo' : 'Edi????o de Ativo'}</Card.Title>
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
                      <FormDadosGerais {...props} setAtivo={setAtivo} ativo={ativo} carregarOpcoesData={carregarOpcoesData} />
                    </Tab>
                    <Tab eventKey="parametros" title="Par??metros">
                      <Row>
                        <Col className="pr-1" md="3">
                          <Form.Group>
                            <label>Nome</label>
                            <Form.Control
                              placeholder="Nome do par??metro"
                              type="text"
                              onChange={e => setParametroEdicao((prevState) => ({
                                ...prevState, nome: e.target.value}))}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>Descri????o</label>
                            <Form.Control
                              placeholder="Descri????o do par??metro"
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
                              placeholder="Valor do par??metro"
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
                        <Table className="table-hover table-striped">
                          <thead>
                            <tr>
                              <th className="border-0">Id</th>
                              <th className="border-0">Nome</th>
                              <th className="border-0">Descri????o</th>
                              <th className="border-0">Valor</th>
                              <th className="border-0">A????o</th>
                            </tr>
                          </thead>
                          <tbody>
                            { getListagemParams(listagemParametros) }
                          </tbody>
                        </Table>
                      </Row>
                    </Tab>
                    {!isAcaoNovo &&
                      <Tab eventKey="agendamentos" title="Agendamentos">
                        <FormAgendamentos {...props} 
                          setListagemAgendamentos={setListagemAgendamentos} listagemAgendamentos={listagemAgendamentos}
                          exibirErro={exibirErro} setExibirErro={setExibirErro}
                          errorMsg={errorMsg} setErrorMsg={setErrorMsg}
                          fecharErro={fecharErro} opcoesData={opcoesData}
                          setOpcoesData={setOpcoesData} dataSelecionada={dataSelecionada}
                          setDataSelecionada={setDataSelecionada} />
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

export { EditAtivos };
