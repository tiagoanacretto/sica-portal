import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { Alert } from 'reactstrap';
import Select from 'react-select';
import Datetime from 'react-datetime';
import moment from 'moment';

import { adicionar, buscarPorId, alterar } from "./ManutencaoServices.js";
import { buscarAtivos } from "../Ativos/AtivoServices.js";

function AddManutencao(props) {

  const { id } = props.match.params;
  const history = props.history;
  const isAcaoNovo = !id;
  
  const [exibirErro, setExibirErro] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fecharErro = () => { setExibirErro(false) };
  const [ativoSelecionado, setAtivoSelecionado] = useState({});

  const [opcoesAtivo, setOpcoesAtivo] = useState([]);

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
      const copyDateRealizada = moment(manutencao.dataRealizada);
      if (copyDateRealizada.isValid()) {
        delete manutencao.dataRealizada;
        manutencao.dataRealizada = copyDateRealizada.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      } else {
        setErrorMsg('Data deve estar no formato dd/MM/aaaa hh:mm');
        setExibirErro(true);
        return;
      }

      let ativo = manutencao.ativo;
      delete manutencao.ativo;
      manutencao.ativo = {
        id: parseInt(ativo)
      }
      if (!manutencao.agendamento) {
        delete manutencao.agendamento;
      }
      
      if (isAcaoNovo) {
        adicionar(manutencao)
          .then(res => {
            history.push(`./msg/${res.data.id}`);
          })
          .catch(err => {
            console.error(err);
            setErrorMsg('Falha ao incluir Manutenção. Contate o administrador');
            setExibirErro(true);
          });
      } else {
        alterar(manutencao)
          .then(res => {
            history.push(`../msg/${res.data.id}`);
          })
          .catch(err => {
            console.error(err);
            setErrorMsg('Falha ao alterar Manutenção. Contate o administrador');
            setExibirErro(true);
          });
      }
    } else {
      setErrorMsg('Todos os campos são obrigatórios');
      setExibirErro(true);
    }
  };

  const handleAtivo = (event) => {
    setAtivoSelecionado(event);
    setManutencao((prevState) => ({
      ...prevState, ativo: event.value}))
  }

  const carregarSelectAtivos = async (idAtivo) => {
    const result = await buscarAtivos();
    setOpcoesAtivo(
      result.data.map(ativo => {
        const itemAtivo = { name: 'ativo', value: ativo.id, label: `${ativo.codigo} - ${ativo.descricao}`}
        if (ativo.id == idAtivo) {
          setAtivoSelecionado(itemAtivo)
        }
        return itemAtivo
      })
    )
  };

  useEffect(async () => {
    const fetchData = async () => {
      if (!isAcaoNovo) {
          // get user and set form fields
          buscarPorId(id).then(manutencao => {
            const localmanute = {
              id: manutencao.data.id,
              ativo: manutencao.data.ativo.id,
              dataRealizada: moment(manutencao.data.dataRealizada).valueOf(),
              agendamento: manutencao.data.agendamento ? manutencao.data.agendamento : '',
              responsavel: manutencao.data.responsavel,
              observacao: manutencao.data.observacao
            }
            setManutencao(localmanute);
            carregarSelectAtivos(localmanute.ativo);
          });
      } else {
        carregarSelectAtivos(null);
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
                <Row>
                  {!isAcaoNovo &&
                    <Col className="pr-1" md="1">
                      <Form.Group>
                        <label>Id</label>
                        <Form.Control
                          type="text"
                          value={manutencao.id}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  }
                  <Col className="pr-1" md="4">
                    <Form.Group>
                      <label>Ativo</label>
                      <Select options={opcoesAtivo} 
                        value={ativoSelecionado}
                        onChange={handleAtivo}/>
                    </Form.Group>
                  </Col>
                  <Col className="pr-1" md="3">
                    <Form.Group>
                      <label>Data Manutenção</label>
                      <Datetime 
                        dateFormat="DD/MM/YYYY"
                        timeFormat="HH:mm"
                        value={manutencao.dataRealizada}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, dataRealizada: e}))} />
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
                        as="textarea"
                        value={manutencao.observacao}
                        onChange={e => setManutencao((prevState) => ({
                          ...prevState, observacao: e.target.value}))}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="direita">
                    <Link to="/admin/manutencao/">
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
                  </Col>
                </Row>
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
