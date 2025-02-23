import dayjs from "dayjs";
import { DeleteButton } from "../components/DeleteButton";
export const PersonaMoralColumns = [
  {
    title: "Nombre Comercial",
    dataIndex: "nombreComercial",
    key: "nombreComercial",
  },
  {
    title: "Giro",
    dataIndex: "giro",
    key: "giro",
  },
  {
    title: "Fecha de Constitución",
    dataIndex: "fechaConstitucion",
    key: "fechaConstitucion",
    render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: string, record: any) => (
      <DeleteButton rfc={record.rfc} tipoPersona="moral" />
    ),
  },
];

export const PersonaFisicaColumns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "Fecha de Nacimiento",
    dataIndex: "Fecha de Nacimiento",
    key: "fechaNacimiento",
    render: (_: string, record: any) => {
      return dayjs(record.fechaNacimiento).format("DD/MM/YYYY");
    },
  },
  {
    title: "Acciones",
    key: "action",
    render: (_: string, record: any) => (
      <DeleteButton rfc={record.rfc} tipoPersona="fisica" />
    ),
  },
];
