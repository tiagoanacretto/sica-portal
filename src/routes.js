import Dashboard from "views/Dashboard.js";
import Ativos from "views/Ativos.js";
import Manutencao from "views/Manutencao";

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
