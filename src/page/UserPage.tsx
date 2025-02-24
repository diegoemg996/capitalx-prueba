import { UserTable } from "../components/UserTable";
import { ModalForm } from "../components/ModalForm";
import { Header } from "../components/Header";

export const UserPage = () => {
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <UserTable />
        <ModalForm />
      </div>
    </>
  );
};
