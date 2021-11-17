import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import AtivosTable from '../components/Ativos/AtivosTable.js';
import {Link } from "react-router-dom";

import { buscarAtivos } from "../components/Ativos/AtivoServices.js";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
 
function Ativos() {

  const [listaAtivos, setListaAtivos] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      const result = await buscarAtivos();
      setListaAtivos(result.data);
    };
    fetchData();
  }, []);

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
                  <AtivosTable listagemAtivos={listaAtivos} />
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
