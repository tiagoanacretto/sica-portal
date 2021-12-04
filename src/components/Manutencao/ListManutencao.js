import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Table, Modal } from "react-bootstrap";

import { buscarTodos } from "./ManutencaoServices.js";

function ListManutencoes() {

  const [manutencoes, setManutencoes] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      const result = await buscarTodos();
      setManutencoes(result.data);
    };
    fetchData();
  }, []);

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
                        <td>{item.dataRealizada}</td>
                        <td>{item.responsavel}</td>
                        <td>
                          <div>
                            <Link to={`/admin/ativos/${item.id}`}>
                              <Button variant="secondary" size="sm">Editar</Button>
                            </Link>
                            {' '}
                            <Button variant="danger" size="sm">Apagar</Button>
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
    </>
  );
}

export { ListManutencoes };
