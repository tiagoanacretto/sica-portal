import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import {Link } from "react-router-dom";

import { buscarAtivos, deleteAtivo } from "../components/Ativos/AtivoServices.js";

// react-bootstrap components
import { Card, Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
 
function Ativos() {

  const [listaAtivos, setListaAtivos] = useState([]);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [idAtivoDelete, setIdAtivoDelete] = useState(null);

  useEffect(async () => {
    const fetchData = async () => {
      const result = await buscarAtivos();
      setListaAtivos(result.data);
    };
    fetchData();
  }, []);

  const confirmaRemocao = (idAtivoDelete) => {
    deleteAtivo(idAtivoDelete)
      .then(res => {
        setShowModalConfirmacao(false);
        setListaAtivos(listaAtivos => listaAtivos.filter(x => x.id !== idAtivoDelete));
      })
      .catch(err => {
        console.log(err);
        setShowModalConfirmacao(false);
        alert('Falha ao apagar');
      });
  };

  const getListagemAtivos = (listagemAtivos) => {
    return listagemAtivos.map(item => {
      const classCondicao = item.condicao == 'EM_DIA' ? 'condicao-em-dia' : 'condicao-atrasada';
      const iconCondicao = item.condicao == 'EM_DIA' ? 'nc-icon nc-check-2' : 'nc-icon nc-watch-time';
  
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.codigo}</td>
          <td>{item.descricao}</td>
          <td>{item.categoria}</td>
          <td className={classCondicao}>{item.ultimaManutencao} <span className={iconCondicao} /></td>
          <td>{item.proximaManutencao}</td>
          <td>
            <div>
              <Button variant="secondary" size="sm" onClick={() => this.editarAtivo(item.id)}>Editar</Button>
              {' '}
              <Button variant="danger" size="sm" onClick={() => {setShowModalConfirmacao(true); setIdAtivoDelete(item.id)}}>Apagar</Button>
            </div>
          </td>
        </tr>
      )
    })
  };

  const listagemAtivos = (listaAtivos) => {
    return (
      <>
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th className="border-0">ID</th>
            <th className="border-0">Código</th>
            <th className="border-0">Descrição</th>
            <th className="border-0">Categoria</th>
            <th className="border-0">Última Manutenção</th>
            <th className="border-0">Próxima Manutenção</th>
            <th className="border-0">Ações</th>
          </tr>
        </thead>
        <tbody>
          {getListagemAtivos(listaAtivos)}
        </tbody>
      </Table>
      {/* Mini Modal */}
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
          <p>Deseja realmente apagar o item {idAtivoDelete}?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            variant="danger" size="sm"
            onClick={() => setShowModalConfirmacao(false)}
          >
            Não
          </Button>
          <Button
            variant="success" size="sm"
            onClick={() => confirmaRemocao(idAtivoDelete)}
          >
            Sim
          </Button>
        </div>
      </Modal>
      {/* End Modal */}
      </>
    )
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Link to="/admin/ativos/novo">
                <Button
                  className="btn-fill pull-right btn-adicionar"
                  type="submit"
                  variant="primary">
                  <span className="tit-btn-adicionar" title="Adicionar"></span>
                </Button>
              </Link>
              <Card.Header >
                <Card.Title as="h4">Cadastro de Ativos</Card.Title>
                <p className="card-category">
                  Listagem dos ativos da empresa
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!_.isEmpty(listaAtivos) ? (
                  listagemAtivos(listaAtivos)
                ) : (
                  <p className="message">Não há ativos cadastrados.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Ativos;
