import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOMBRE", uid: "name", sortable: true},
  {name: "ROL", uid: "role", sortable: true},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions", sortable: true},
];

const statusOptions = [
  {name: "Activo", uid: "activo"},
  {name: "Despedido", uid: "despedido"},
  {name: "Vacaciones", uid: "vacaciones"},
];

export {columns, statusOptions};
