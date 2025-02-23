import { Button } from "antd";
import { useUsersStore } from "../store/usersStore";

interface DeleteButtonProps {
  rfc: string;
  tipoPersona: "fisica" | "moral";
}

export const DeleteButton = ({ rfc, tipoPersona }: DeleteButtonProps) => {
  const { deleteUser } = useUsersStore();

  const handleDelete = () => {
    deleteUser(rfc, tipoPersona);
  };

  return (
    <Button color="danger" variant="outlined" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};
