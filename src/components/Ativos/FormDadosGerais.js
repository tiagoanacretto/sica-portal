import React  from "react";

import Select from 'react-select';
import Toggle from 'react-toggle';

import { Form, Row, Col } from "react-bootstrap";

const FormDadosGerais = (props) => {

  const { id } = props.match.params;
  let ativo = props.ativo;
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
    { name: 'intervaloManutencao', value: 'DIARIO', label: 'Diário' },
    { name: 'intervaloManutencao', value: 'MENSAL', label: 'Mensal' },
    { name: 'intervaloManutencao', value: 'ANUAL', label: 'Anual' }, 
    { name: 'intervaloManutencao', value: 'EVENTO', label: 'Evento' }, 
    { name: 'intervaloManutencao', value: 'NAO_SE_APLICA', label: 'Não se aplica' }
  ];

  let { codigo, descricao, valorCompra, statusAtivo, dataCadastro } =  ativo;
  const categoria = opcoesCategoria.map(cat => {
    if (cat.value == ativo.categoria) {
      return cat;
    }
  });
  const intervaloManutencao = opcoesIntervalo.map(intervalo => {
    if (intervalo.value == ativo.intervaloManutencao) {
      return intervalo;
    }
  });

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
        {!isAcaoNovo &&
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
              value={intervaloManutencao}
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
        {!isAcaoNovo &&
          <Col className="pr-1" md="2">
            <Form.Group>
              <label>Ativo</label>
              <div className="toggle-component">
                <Toggle
                  inactiveLabel="Não"
                  activeLabel="Sim"
                  value={statusAtivo}
                  onToggle={(value) => {
                    statusAtivo = !value;
                    props.setAtivo((prevState) => ({
                      ...prevState,
                      statusAtivo: !value
                    }));
                  }}/>
                </div>
            </Form.Group>
          </Col>
        }
      </Row>
    </>
  );
}



export default FormDadosGerais;
