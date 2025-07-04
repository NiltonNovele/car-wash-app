import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Typography,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface Service {
  _id: string;
  key?: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

// Mock inicial de serviços
const mockServicosIniciais: Service[] = [
  {
    _id: "s001",
    name: "Lavagem Completa",
    description: "Lavagem interior e exterior do veículo.",
    price: 600,
    duration: 60,
    isDeleted: false,
  },
  {
    _id: "s002",
    name: "Apenas Exterior",
    description: "Lavagem da parte exterior do carro.",
    price: 300,
    duration: 30,
    isDeleted: false,
  },
  {
    _id: "s003",
    name: "Apenas Interior",
    description: "Aspiração e limpeza interna completa.",
    price: 350,
    duration: 40,
    isDeleted: false,
  },
  {
    _id: "s004",
    name: "Polimento",
    description: "Polimento da carroçaria para brilho extra.",
    price: 800,
    duration: 90,
    isDeleted: false,
  },
  {
    _id: "s005",
    name: "Lavagem de Tapetes",
    description: "Lavagem detalhada de tapetes e carpetes.",
    price: 250,
    duration: 20,
    isDeleted: false,
  },
  {
    _id: "s006",
    name: "Lavagem de Motor",
    description: "Limpeza detalhada do compartimento do motor.",
    price: 500,
    duration: 40,
    isDeleted: false,
  },
];

const GestaoServicos = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setServices(mockServicosIniciais);
  }, []);

  const mostrarModal = (
    modoEdicao: boolean = false,
    servico: Service | null = null
  ) => {
    setIsEditMode(modoEdicao);
    setCurrentService(servico);
    if (modoEdicao && servico) {
      form.setFieldsValue(servico);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const guardarServico = async () => {
    try {
      const valores = await form.validateFields();
      if (isEditMode && currentService) {
        const atualizado = services.map((s) =>
          s._id === currentService._id ? { ...s, ...valores } : s
        );
        setServices(atualizado);
        message.success("Serviço atualizado com sucesso!");
      } else {
        const novoServico: Service = {
          _id: `s${Date.now()}`,
          ...valores,
          isDeleted: false,
        };
        setServices([...services, novoServico]);
        message.success("Serviço adicionado com sucesso!");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Falha ao guardar o serviço. Tente novamente.");
    }
  };

  const cancelar = () => {
    setIsModalVisible(false);
  };

  const apagarServico = async (id: string) => {
    try {
      const atualizados = services.map((s) =>
        s._id === id ? { ...s, isDeleted: true } : s
      );
      setServices(atualizados);
      message.success("Serviço removido com sucesso.");
    } catch (error) {
      message.error("Erro ao eliminar o serviço.");
    }
  };

  const colunas = [
    {
      title: "Nome do Serviço",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preço (MZN)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duração (min)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Ações",
      key: "action",
      render: (_: any, registo: Service) => (
        <span>
          {!registo.isDeleted && (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => mostrarModal(true, registo)}
              />
              <Popconfirm
                title="Tem a certeza que pretende apagar este serviço?"
                onConfirm={() => apagarServico(registo._id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button type="link" icon={<DeleteOutlined />} />
              </Popconfirm>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Gestão de Serviços</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => mostrarModal()}
        style={{ marginBottom: 16 }}
      >
        Adicionar Serviço
      </Button>
      <Table
        dataSource={services.filter((servico) => !servico.isDeleted)}
        columns={colunas}
        rowKey="_id"
      />

      <Modal
        title={isEditMode ? "Editar Serviço" : "Adicionar Serviço"}
        open={isModalVisible}
        onOk={guardarServico}
        onCancel={cancelar}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nome do Serviço"
            rules={[{ required: true, message: "Insira o nome do serviço!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ required: true, message: "Insira a descrição!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Preço (MZN)"
            rules={[{ required: true, message: "Insira o preço!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duração (minutos)"
            rules={[{ required: true, message: "Insira a duração!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GestaoServicos;
