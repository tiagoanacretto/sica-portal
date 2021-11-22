import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Button, Table, Modal } from "react-bootstrap";
import _ from 'lodash';

import { deleteAtivo } from './AtivoServices.js';
import { buscarAtivos } from "../components/Ativos/AtivoServices.js";

function Ativos({listagemAtivos}) {
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [idAtivoDelete, setIdAtivoDelete] = useState(null);
  const [redirecionar, setRedirecionar] = useState(false);

  const [listaAtivos, setListaAtivos] = useState([]);

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

        setUsers(users => users.filter(x => x.id !== id));

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
  }

  {!_.isEmpty(listaAtivos) ? (
    ) : (
      <p className="message">Não há ativos cadastrados.</p>
    )}

  if (redirecionar) {
    return <Redirect to='/admin/ativos'/>;
  } else {
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
            {getListagemAtivos(listagemAtivos)}
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
    );
  }
}

export default Ativos;
