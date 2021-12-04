import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListManutencoes } from '../components/Manutencao/ListManutencao.js';

function Manutencao({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={ListManutencoes} />
        </Switch>
    );
}

export default Manutencao;
