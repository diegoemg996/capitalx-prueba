import { Button } from "antd";

interface DeleteButtonProps {
  rfc: string;
  deletePersona: (rfc: string) => void;
}

export const DeleteButton = ({ rfc, deletePersona }: DeleteButtonProps) => {
  const handleDelete = () => {
    deletePersona(rfc);
  };

  return (
    <Button color="danger" variant="outlined" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};
