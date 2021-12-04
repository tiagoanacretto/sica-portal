import Dashboard from "views/Dashboard.js";
import Ativos from "views/Ativos.js";
import Manutencao from "views/Manutencao";
import EditAtivos from "components/Ativos/EditAtivos.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/ativos",
    name: "Ativos",
    icon: "nc-icon nc-bus-front-12",
    component: Ativos,
    layout: "/admin",
    exactRoute: true,
  },
  {
    path: "/ativos/:acao",
    name: "Ativos",
    icon: "nc-icon nc-circle-09",
    component: EditAtivos,
    layout: "/admin",
    redirect: true
  },
  {
    path: "/manutencao",
    name: "Manutenção",
    icon: "nc-icon nc-settings-tool-66",
    component: Manutencao,
    layout: "/admin",

  },
];

export default dashboardRoutes;
