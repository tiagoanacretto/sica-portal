import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import { Alert } from 'reactstrap';
import moment from 'moment';

import { buscarTodos, apagar } from "./ManutencaoServices.js";

function ListManutencoes(props) {

  const [manutencoes, setManutencoes] = useState([]);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [idApagar, setIdApagar] = useState(null);
  const { id } = props.match.params;

  const [mensagem, setMensagem] = useState(() => {
    return {
      exibir: false,
      mensagem: '',
      icone: 'danger'
    }
  })
  const fecharErro = () => { setMensagem({exibir:false}) };

  useEffect(async () => {
    const fetchData = async () => {
      const result = await buscarTodos();
      setManutencoes(result.data);
      if (id) {
        setMensagem({exibir: true, mensagem: `Item ${id} salvo com sucesso`, icone: 'success'});
      }
    };
    fetchData();
  }, []);

  const confirmaRemocao = (idApagar) => {
    apagar(idApagar)
      .then(res => {
        setShowModalConfirmacao(false);
        setManutencoes(listaManutencao => listaManutencao.filter(x => x.id !== idApagar));
        setMensagem({exibir: true, mensagem: `Item ${idApagar} apagado com sucesso`, icone: 'success'});
      })
      .catch(err => {
        console.error(err);
        setShowModalConfirmacao(false);
        setMensagem({exibir: true, mensagem: `Erro ao apagar item ${idApagar}`, icone: 'danger'});
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Link to="/admin/manutencao/novo">
                <Button
                  className="btn-fill pull-right btn-adicionar"
                  type="submit"
                  variant="primary">
                  <span className="tit-btn-adicionar" title="Adicionar"></span>
                </Button>
              </Link>
              <Card.Header >
                <Card.Title as="h4">Cadastro de Manutenções</Card.Title>
                <p className="card-category">
                  Listagem das manutenções dos ativos
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Row className="no-margin">
                  <Col md="12">
                    <Alert 
                      color={mensagem.icone}
                      isOpen={mensagem.exibir}
                      toggle={fecharErro}>
                      <span>{mensagem.mensagem}</span>
                    </Alert>
                  </Col>
                </Row>
                {!_.isEmpty(manutencoes) ? (
                  <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Código Ativo</th>
                      <th className="border-0">Data</th>
                      <th className="border-0">Responsável</th>
                      <th className="border-0">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manutencoes.map(item =>
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.ativoCodigo}</td>
                        <td>{moment(item.dataRealizada).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{item.responsavel}</td>
                        <td>
                          <div>
                            <Link to={`/admin/manutencao/editar/${item.id}`}>
                              <Button variant="secondary" size="sm">Editar</Button>
                            </Link>
                            {' '}
                            <Button variant="danger" size="sm" onClick={() => {setShowModalConfirmacao(true); setIdApagar(item.id)}}>Apagar</Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                ) : (
                  <p className="message">Não há manutenções cadastradas.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        className="modal-primary"
        show={showModalConfirmacao}
        onHide={() => setShowModalConfirmacao(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
            <i className="nc-icon nc-bulb-63"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Deseja realmente apagar o item {idApagar}?</p>
        </Modal.Body>
        <div className="modal-footer btns-modal">
          <Button
            variant="danger" size="sm"
            onClick={() => setShowModalConfirmacao(false)}>
            Não
          </Button>
          <Button
            variant="success" size="sm"
            onClick={() => confirmaRemocao(idApagar)}>
            Sim
          </Button>
        </div>
      </Modal>
    </>
  );
}

export { ListManutencoes };
