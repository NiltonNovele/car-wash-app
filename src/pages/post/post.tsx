import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  TimePicker,
  Typography,
  Select,
  Input,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const paymentMethods = ["Dinheiro", "M-Pesa", "Cartão"];

const mockData = [
  {
    key: "1",
    car: "Toyota",
    model: "Corolla 2020",
    plateNumber: "ABC-123-MZ",
    arrivalTime: "09:15",
    serviceName: "Lavagem (Interior e exterior)",
    price: 1500,
    paymentMethod: "M-Pesa",
    employeeName: "João Carlos",
  },
];

const GestaoVeiculos = () => {
  const [entries] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const mostrarModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const confirmarCriacao = () => {
    // just close modal for mockup
    setIsModalVisible(false);
  };

  const cancelarModal = () => setIsModalVisible(false);

  const colunas = [
    { title: "Carro", dataIndex: "car", key: "car" },
    { title: "Modelo", dataIndex: "model", key: "model" },
    { title: "Matrícula", dataIndex: "plateNumber", key: "plateNumber" },
    { title: "Hora de Chegada", dataIndex: "arrivalTime", key: "arrivalTime" },
    { title: "Serviço", dataIndex: "serviceName", key: "serviceName" },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (val: number) => `MZN ${val}`,
    },
    { title: "Pagamento", dataIndex: "paymentMethod", key: "paymentMethod" },
    { title: "Funcionário", dataIndex: "employeeName", key: "employeeName" },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Gestão de Veículos</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={mostrarModal}
        style={{ marginBottom: 16 }}
      >
        Nova Entrada
      </Button>

      <Table dataSource={entries} columns={colunas} rowKey="key" />

      <Modal
        title="Registrar Nova Entrada"
        open={isModalVisible}
        onOk={confirmarCriacao}
        onCancel={cancelarModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="car"
            label="Marca do Carro"
            rules={[{ required: true }]}
          >
            <Input placeholder="Ex: Toyota" />
          </Form.Item>
          <Form.Item name="model" label="Modelo" rules={[{ required: true }]}>
            <Input placeholder="Ex: Corolla 2020" />
          </Form.Item>
          <Form.Item
            name="plateNumber"
            label="Número da Matrícula"
            rules={[{ required: true }]}
          >
            <Input placeholder="ABC-123-MZ" />
          </Form.Item>
          <Form.Item
            name="arrivalTime"
            label="Hora de Chegada"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="service"
            label="Serviço"
            rules={[{ required: true }]}
          >
            <Select placeholder="Selecionar Serviço">
              <Option value="1">Mudança de Óleo</Option>
              <Option value="2">Alinhamento</Option>
              <Option value="3">Revisão Completa</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Preço" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} min={0} prefix="MZN " />
          </Form.Item>
          <Form.Item
            name="paymentMethod"
            label="Método de Pagamento"
            rules={[{ required: true }]}
          >
            <Select placeholder="Selecionar Método">
              {paymentMethods.map((method) => (
                <Option key={method} value={method}>
                  {method}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="employeeName"
            label="Funcionário Responsável"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nome do funcionário" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GestaoVeiculos;
