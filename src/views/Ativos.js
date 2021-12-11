import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListAtivos } from '../components/Ativos/ListAtivos.js';
import { EditAtivos } from '../components/Ativos/EditAtivos.js';

function Ativos({ match }) {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={path} component={ListAtivos} />
            <Route path={`${path}/msg/:id`} component={ListAtivos} />
            <Route path={`${path}/novo`} component={EditAtivos} />
            <Route path={`${path}/editar/:id`} component={EditAtivos} />
        </Switch>
    );
}

export default Ativos;
