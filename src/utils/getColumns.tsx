import dayjs from "dayjs";
import { DeleteButton } from "../components/DeleteButton";
import { useUsers } from "../store/usersStore";
export const PersonaMoralColumns = () => {
  const deletePersonaMoral = useUsers((state) => state.deletePersonaMoral);
  return [
    { title: "RFC", dataIndex: "rfc", key: "rfc" },
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
        <DeleteButton rfc={record.rfc} deletePersona={deletePersonaMoral} />
      ),
    },
  ];
};

export const PersonaFisicaColumns = () => {
  const deletePersonaFisica = useUsers((state) => state.deletePersonaFisica);
  return [
    { title: "RFC", dataIndex: "rfc", key: "rfc" },
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
      dataIndex: "fechaNacimiento",
      key: "fechaNacimiento",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Acciones",
      key: "action",
      render: (_: string, record: any) => (
        <DeleteButton rfc={record.rfc} deletePersona={deletePersonaFisica} />
      ),
    },
  ];
};
