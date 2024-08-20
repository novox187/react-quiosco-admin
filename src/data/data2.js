import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOMBRE", uid: "name", sortable: true},
  {name: "CALIFICACIÓN", uid: "calificacion", sortable: true},
  {name: "ESTADO", uid: "status", sortable: true},

];

const statusOptions = [
  {name: "Activo", uid: "activo"},
  {name: "Despedido", uid: "Despedido"},
  {name: "Vacaciones", uid: "Vacaciones"},
];

export {columns, statusOptions};
