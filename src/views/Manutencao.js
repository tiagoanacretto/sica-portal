import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListManutencoes } from '../components/Manutencao/ListManutencao.js';
import { AddManutencao } from '../components/Manutencao/AddManutencao.js';

function Manutencao({ match }) {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={path} component={ListManutencoes} />
            <Route path={`${path}/msg/:id`} component={ListManutencoes} />
            <Route path={`${path}/novo`} component={AddManutencao} />
            <Route path={`${path}/editar/:id`} component={AddManutencao} />
        </Switch>
    );
}

export default Manutencao;
