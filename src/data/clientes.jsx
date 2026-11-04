export const clientes = [
  {
    id: 1,
    nombre: "Ana García López",
    telefono: "555-123-4567",
    correo: "ana.garcia@email.com",
    pedidos: [
      { id: "PED-001", fecha: "2026-10-15", total: "$598.00", estado: "Entregado" },
      { id: "PED-002", fecha: "2026-11-02", total: "$299.00", estado: "En proceso" },
    ],
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    telefono: "555-987-6543",
    correo: "carlos.m@email.com",
    pedidos: [
      { id: "PED-003", fecha: "2026-10-20", total: "$299.00", estado: "Entregado" },
    ],
  },
  {
    id: 3,
    nombre: "María Fernanda Ruiz",
    telefono: "555-456-7890",
    correo: "mafe.ruiz@email.com",
    pedidos: [], // Cliente sin pedidos (para probar el caso vacío)
  },
  {
    id: 4,
    nombre: "Juan Pablo Pérez",
    telefono: "555-111-2222",
    correo: "juanp.perez@email.com",
    pedidos: [
      { id: "PED-004", fecha: "2026-11-01", total: "$897.00", estado: "Enviado" },
    ],
  },
];