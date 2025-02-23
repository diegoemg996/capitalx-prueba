import { UserTable } from "../components/UserTable";
import { ModalForm } from "../components/ModalForm";
import { useState } from "react";
import { Header } from "../components/Header";

export const UserPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <UserTable setVisible={setVisible} />
        <ModalForm isModalOpen={visible} setVisible={setVisible} />
      </div>
    </>
  );
};
