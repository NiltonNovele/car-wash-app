import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  Popconfirm,
  Typography,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";


const { Title } = Typography;
const { Option } = Select;

interface Slot {
  key: string;
  _id: string;
  service: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface TService {
  _id: string;
  name: string;
}

const mockServicos: TService[] = [
  { _id: "s001", name: "Lavagem Completa" },
  { _id: "s002", name: "Apenas Exterior" },
  { _id: "s003", name: "Apenas Interior" },
  { _id: "s004", name: "Polimento" },
  { _id: "s005", name: "Lavagem de Motor" },
];

const mockSlotsIniciais: Slot[] = [
  {
    key: "0",
    _id: "slot001",
    service: "s001",
    serviceName: "Lavagem Completa",
    date: "2025-07-08",
    startTime: "08:00",
    endTime: "09:00",
    isBooked: false,
  },
  {
    key: "1",
    _id: "slot002",
    service: "s002",
    serviceName: "Apenas Exterior",
    date: "2025-07-08",
    startTime: "09:00",
    endTime: "09:30",
    isBooked: true,
  },
  {
    key: "2",
    _id: "slot003",
    service: "s003",
    serviceName: "Apenas Interior",
    date: "2025-07-08",
    startTime: "10:00",
    endTime: "10:45",
    isBooked: false,
  },
];

const GestaoSlots = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setSlots(mockSlotsIniciais);
  }, []);

  const mostrarModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const confirmarCriacao = async () => {
    try {
      const valores = await form.validateFields();
      const servicoSelecionado = mockServicos.find(
        (s) => s._id === valores.service
      );

      if (servicoSelecionado) {
        const novoSlot: Slot = {
          key: `${Date.now()}`,
          _id: `slot-${Date.now()}`,
          service: servicoSelecionado._id,
          serviceName: servicoSelecionado.name,
          date: valores.date.format("YYYY-MM-DD"),
          startTime: valores.startTime.format("HH:mm"),
          endTime: valores.endTime.format("HH:mm"),
          isBooked: false,
        };
        setSlots((prev) => [...prev, novoSlot]);
        message.success("Slot adicionado com sucesso!");
        setIsModalVisible(false);
      }
    } catch {
      message.error("Falha ao adicionar o slot. Tente novamente.");
    }
  };

  const alternarEstado = async (key: string) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.key === key
          ? { ...slot, isBooked: !slot.isBooked }
          : slot
      )
    );
    message.success("Estado do slot atualizado com sucesso!");
  };

  const cancelarModal = () => setIsModalVisible(false);

  const colunas = [
    {
      title: "Serviço",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hora de Início",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Hora de Fim",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Estado",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (isBooked: boolean, record: Slot) => (
        <Select
          value={isBooked ? "booked" : "available"}
          onChange={() => alternarEstado(record.key)}
          style={{ width: 130 }}
        >
          <Option value="available">DISPONÍVEL</Option>
          <Option value="booked">RESERVADO</Option>
        </Select>
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (_: any, record: Slot) => (
        <Popconfirm
          title="Tem a certeza que deseja alterar o estado deste slot?"
          onConfirm={() => alternarEstado(record.key)}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="link">Alternar Estado</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Gestão de Slots</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={mostrarModal}
        style={{ marginBottom: 16 }}
      >
        Adicionar Slot
      </Button>

      <Table dataSource={slots} columns={colunas} rowKey="_id" />

      <Modal
        title="Adicionar Slot"
        open={isModalVisible}
        onOk={confirmarCriacao}
        onCancel={cancelarModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="service"
            label="Serviço"
            rules={[{ required: true, message: "Selecione um serviço!" }]}
          >
            <Select
              placeholder="Selecionar Serviço"
              options={mockServicos.map((s) => ({
                value: s._id,
                label: s.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="Data"
            rules={[{ required: true, message: "Selecione uma data!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Hora de Início"
            rules={[{ required: true, message: "Selecione a hora de início!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="Hora de Fim"
            rules={[{ required: true, message: "Selecione a hora de fim!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GestaoSlots;
