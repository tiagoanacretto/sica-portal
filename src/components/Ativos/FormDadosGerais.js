import React  from "react";

import Select from 'react-select';

// react-bootstrap components
import { Form, Row, Col } from "react-bootstrap";

const FormDadosGerais = (props, ativo) => {

  const { id } = props.match.params;
  const isAcaoNovo = !id;

  const opcoesCategoria = [
    { name: 'categoria', value: 'MAQUINA', label: 'Máquina' },
    { name: 'categoria', value: 'EQUIPAMENTO', label: 'Equipamento' },
    { name: 'categoria', value: 'INSUMO', label: 'Insumo' },
    { name: 'categoria', value: 'INVESTIMENTO', label: 'Investimento' },
    { name: 'categoria', value: 'IMOVEL', label: 'Imóvel' },
    { name: 'categoria', value: 'VEICULO', label: 'Veículo' }
  ];

  const opcoesIntervalo = [
    { name: 'intervalo', value: 'DIARIO', label: 'Diário' },
    { name: 'intervalo', value: 'MENSAL', label: 'Mensal' },
    { name: 'intervalo', value: 'ANUAL', label: 'Anual' }, 
    { name: 'intervalo', value: 'EVENTO', label: 'Evento' }, 
    { name: 'intervalo', value: 'NAO_SE_APLICA', label: 'Não se aplica' }
  ];

  const { codigo, descricao, categoria, intervalo, valorCompra, ativoStatus, dataCadastro } =  { ativo } ;

  const handleInputChange = (event) => {
    let name, value;
    if (event.target) {
      name = event.target.name;
      value = event.target.value;
    } else {
      name = event.name;
      value = event;
    }

    switch (name) {
      case 'valorCompra':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          props.setAtivo((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        props.setAtivo((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <>
      <Row>
        {!isAcaoNovo &&
          <Col className="pr-1" md="1">
            <Form.Group>
              <label>Id</label>
              <Form.Control
                type="text"
                name="id"
                value={id}
                readOnly
              ></Form.Control>
            </Form.Group>
          </Col>
        }
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Código</label>
            <Form.Control
              placeholder="Código interno do ativo"
              type="text"
              name="codigo"
              value={codigo}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="pr-1" md="7">
          <Form.Group>
            <label>Descrição</label>
            <Form.Control
              placeholder="Descrição do ativo"
              type="text"
              name="descricao"
              value={descricao}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Categoria</label>
            <Select options={opcoesCategoria} 
              value={categoria}
              onChange={handleInputChange}/>
          </Form.Group>
        </Col>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Intervalo de Manutenção</label>
            <Select options={opcoesIntervalo} 
              onChange={handleInputChange}/>
          </Form.Group>
        </Col>
        <Col className="pr-1" md="2">
          <Form.Group>
            <label>Valor Compra</label>
            <Form.Control
              name="valorCompra"
              placeholder="Valor Compra"
              type="numeric"
              value={valorCompra}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
         </Col>
      </Row>
      {!isAcaoNovo &&
        <Row>
          <Col className="pr-1" md="2">
            <Form.Group>
              <label>Ativo</label>
              <Form.Control
                placeholder="Define se o ativo está disponível para uso"
                type="text"
                name="ativoStatus"
                value={ativoStatus}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col className="pr-1" md="2">
            <Form.Group>
              <label>Data Cadastro</label>
              <Form.Control
                disabled
                placeholder="Data de cadastro do ativo"
                type="text"
                name="dataCadastro"
                value={dataCadastro}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      }
    </>
  );
}

export default FormDadosGerais;
