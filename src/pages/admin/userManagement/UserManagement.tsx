import React, { useState, useEffect } from "react";
import { Table, Button, Select, Typography, Popconfirm, message } from "antd";
// import { useGetUsersQuery, useUpdateUSerMutation } from "../../../redux/features/admin/UserManagementApi";
import { TUser } from "../../../types/User";

const { Title } = Typography;
const { Option } = Select;

// Mock Data for Mozambican Users — now includes all required fields
const mockMozUsers: TUser[] = [
  {
    _id: "1",
    name: "Carlos Mucavel",
    email: "carlos.mucavel@example.co.mz",
    phone: "+258841234567",
    role: "user",
    password: "",
    address: "Maputo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "2",
    name: "Elisa Matusse",
    email: "elisa.matusse@example.co.mz",
    phone: "+258842345678",
    role: "admin",
    password: "",
    address: "Matola",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "3",
    name: "João Mucambe",
    email: "joao.mucambe@example.co.mz",
    phone: "+258843456789",
    role: "user",
    password: "",
    address: "Beira",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "4",
    name: "Fatima Bila",
    email: "fatima.bila@example.co.mz",
    phone: "+258844567890",
    role: "user",
    password: "",
    address: "Nampula",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
];

const GestaoUtilizadores: React.FC = () => {
  // const { data, isLoading, error, refetch } = useGetUsersQuery(undefined); 
  // const [updateUser] = useUpdateUSerMutation(); 
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setUsers(mockMozUsers);
    }, 500);
  }, []);

  const alterarFuncaoUtilizador = async (userId: string, novaFuncao: "user" | "admin") => {
    try {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: novaFuncao } : u))
      );
      message.success("Função do utilizador atualizada com sucesso!");
      // refetch && refetch();
    } catch {
      message.error("Falha ao atualizar a função. Por favor, tente novamente.");
    }
  };

  const alternarFuncao = async (userId: string) => {
    const user = users.find((u) => u?._id === userId);
    if (!user) return;
    const novaFuncao = user.role === "user" ? "admin" : "user";
    try {
      await alterarFuncaoUtilizador(userId, novaFuncao);
    } catch {
      message.error("Não foi possível alternar a função do utilizador.");
    }
  };

  const colunas = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Função",
      dataIndex: "role",
      key: "role",
      render: (role: "user" | "admin", record: TUser) => (
        <Select
          value={role}
          style={{ width: 120 }}
          onChange={(valor: "user" | "admin") => alterarFuncaoUtilizador(record._id, valor)}
        >
          <Option value="user">Utilizador</Option>
          <Option value="admin">Administrador</Option>
        </Select>
      ),
    },
    {
      title: "Ação",
      key: "action",
      render: (_: any, record: TUser) => (
        <Popconfirm
          title={`Tem a certeza que deseja alterar a função de ${record.name} para ${
            record.role === "user" ? "Administrador" : "Utilizador"
          }?`}
          onConfirm={() => alternarFuncao(record._id)}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="link">Alternar Função</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Gestão de Utilizadores</Title>
      <Table
        loading={users.length === 0}
        dataSource={users}
        columns={colunas}
        rowKey="_id"
      />
    </div>
  );
};

export default GestaoUtilizadores;
