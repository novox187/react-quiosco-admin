const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "USUARIO", uid: "responsable", sortable: true},
  {name: "ROL", uid: "rol", sortable: true},
  {name: "ACCION", uid: "accion", sortable: true},
  {name: "OPCIONES", uid: "opciones", sortable: true},
];

const statusOptions = [
  {name: "Entregas", uid: "entrega"},
  {name: "Cobros", uid: "cobro"},
  {name: "Preparaciones", uid: "preparacion"},
  {name: "Eliminados", uid: "eliminar"},
  {name: "Cambios de estado", uid: "cambiar_estado"},
  {name: "Cambios de categoria", uid: "cambiar_categoria"},
  {name: "Ediciones", uid: "editar"},
  {name: "Crear", uid: "crear"},
];

export {columns, statusOptions};
