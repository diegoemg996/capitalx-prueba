import { Button, Table, Tabs, Tooltip } from "antd";
import { PersonaFisicaColumns, PersonaMoralColumns } from "../utils/getColumns";
import { UserAddOutlined } from "@ant-design/icons";
import { useUsersStore } from "../store/usersStore";

interface UserTableProps {
  setVisible: (visible: boolean) => void;
}

export const UserTable = ({ setVisible }: UserTableProps) => {
  const { personasFisicas, personasMorales, activeTab, setActiveTab } =
    useUsersStore();

  const items = [
    {
      key: "fisica",
      label: "Persona Física",
      children: (
        <Table
          columns={PersonaFisicaColumns}
          size="small"
          dataSource={personasFisicas}
          rowKey={(record) => record.rfc}
        />
      ),
    },
    {
      key: "moral",
      label: "Persona Moral",
      children: (
        <Table
          columns={PersonaMoralColumns}
          size="small"
          dataSource={personasMorales}
          rowKey={(record) => record.rfc}
        />
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          padding: 16,
          backgroundColor: "#fff",
          position: "relative",
          borderRadius: 10,
        }}
      >
        <Tooltip title="Agregar Usuario" placement="bottom">
          <Button
            style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
            type="primary"
            shape="circle"
            icon={<UserAddOutlined />}
            size="large"
            onClick={() => setVisible(true)}
          />
        </Tooltip>
        <Tabs
          defaultActiveKey="persona-fisica"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as "fisica" | "moral")}
          items={items}
          type="card"
        />
      </div>
    </>
  );
};
