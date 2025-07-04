/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";

// Tipo de dados para uma marcação
type Booking = {
  id: string;
  userName: string;
  service: string;
  date: string;
  timeSlot: string;
};

// Dados simulados de marcações em Moçambique
const mockBookings: Booking[] = [
  { id: "B001", userName: "Carlos Mucavel", service: "Lavagem Completa", date: "2025-07-08", timeSlot: "08:00 - 09:00" },
  { id: "B002", userName: "Elisa Matusse", service: "Polimento", date: "2025-07-08", timeSlot: "09:00 - 10:00" },
  { id: "B003", userName: "João Mucambe", service: "Apenas Exterior", date: "2025-07-08", timeSlot: "10:00 - 10:30" },
  { id: "B004", userName: "Fatima Bila", service: "Lavagem de Tapetes", date: "2025-07-09", timeSlot: "11:00 - 11:30" },
  { id: "B005", userName: "Inácio Langa", service: "Detalhamento Completo", date: "2025-07-09", timeSlot: "12:00 - 13:00" },
  { id: "B006", userName: "Luciana Maússe", service: "Aspiração Profunda", date: "2025-07-09", timeSlot: "14:00 - 15:00" },
  { id: "B007", userName: "Abel Simbine", service: "Lavagem de Motor", date: "2025-07-10", timeSlot: "08:30 - 09:00" },
  { id: "B008", userName: "Marta Ussene", service: "Lavagem Premium", date: "2025-07-10", timeSlot: "10:00 - 11:00" },
  { id: "B009", userName: "Nelson Machava", service: "Apenas Interior", date: "2025-07-10", timeSlot: "11:00 - 12:00" },
  { id: "B010", userName: "Paula Nhantumbo", service: "Enceramento", date: "2025-07-11", timeSlot: "09:00 - 09:45" },
  { id: "B011", userName: "Isaque Zimba", service: "Lavagem Completa", date: "2025-07-11", timeSlot: "10:00 - 11:00" },
  { id: "B012", userName: "Lúcia Zandamela", service: "Polimento", date: "2025-07-11", timeSlot: "12:00 - 13:00" },
  { id: "B013", userName: "Celso Mugabe", service: "Apenas Interior", date: "2025-07-12", timeSlot: "13:30 - 14:30" },
  { id: "B014", userName: "Sara Maússe", service: "Lavagem de Motor", date: "2025-07-12", timeSlot: "08:00 - 09:00" },
  { id: "B015", userName: "Fernando Alage", service: "Aspiração Profunda", date: "2025-07-12", timeSlot: "09:00 - 10:00" },
  { id: "B016", userName: "Odete Tamele", service: "Lavagem de Tapetes", date: "2025-07-13", timeSlot: "10:00 - 10:30" },
  { id: "B017", userName: "Samuel Matavele", service: "Lavagem Premium", date: "2025-07-13", timeSlot: "11:00 - 12:00" },
  { id: "B018", userName: "Gracinda Muianga", service: "Detalhamento Completo", date: "2025-07-13", timeSlot: "12:00 - 13:00" },
  { id: "B019", userName: "Manuel Sithole", service: "Lavagem Completa", date: "2025-07-14", timeSlot: "13:00 - 14:00" },
  { id: "B020", userName: "Tânia Bila", service: "Enceramento", date: "2025-07-14", timeSlot: "14:30 - 15:00" },
  { id: "B021", userName: "Adelino Malate", service: "Apenas Exterior", date: "2025-07-14", timeSlot: "08:00 - 08:30" },
  { id: "B022", userName: "Sandra Uamusse", service: "Lavagem Premium", date: "2025-07-14", timeSlot: "09:00 - 10:00" },
  { id: "B023", userName: "Aldo Cuambe", service: "Detalhamento Completo", date: "2025-07-15", timeSlot: "10:00 - 11:00" },
  { id: "B024", userName: "Nadine Mabjaia", service: "Lavagem de Tapetes", date: "2025-07-15", timeSlot: "11:00 - 11:30" },
  { id: "B025", userName: "Edson Mabote", service: "Apenas Interior", date: "2025-07-15", timeSlot: "12:00 - 13:00" },
  { id: "B026", userName: "Ivandro Massango", service: "Aspiração Profunda", date: "2025-07-15", timeSlot: "13:00 - 14:00" },
  { id: "B027", userName: "Tatiana Mazoio", service: "Polimento", date: "2025-07-15", timeSlot: "14:00 - 15:00" },
  { id: "B028", userName: "Beto Cuamba", service: "Lavagem de Motor", date: "2025-07-16", timeSlot: "08:30 - 09:00" },
  { id: "B029", userName: "Rosa Nhaca", service: "Enceramento", date: "2025-07-16", timeSlot: "09:30 - 10:00" },
  { id: "B030", userName: "Henrique Juma", service: "Lavagem Completa", date: "2025-07-16", timeSlot: "10:00 - 11:00" },
  { id: "B031", userName: "Carla Muchanga", service: "Lavagem Premium", date: "2025-07-16", timeSlot: "11:00 - 12:00" },
  { id: "B032", userName: "Pedro Zaqueu", service: "Apenas Exterior", date: "2025-07-17", timeSlot: "12:00 - 12:30" },
  { id: "B033", userName: "Helena Muthemba", service: "Detalhamento Completo", date: "2025-07-17", timeSlot: "13:00 - 14:00" },
  { id: "B034", userName: "Faizal Hossane", service: "Polimento", date: "2025-07-17", timeSlot: "14:30 - 15:00" },
  { id: "B035", userName: "Julieta Zimba", service: "Aspiração Profunda", date: "2025-07-18", timeSlot: "08:00 - 09:00" },
  { id: "B036", userName: "Arão Mabjaia", service: "Apenas Interior", date: "2025-07-18", timeSlot: "09:30 - 10:30" },
  { id: "B037", userName: "Anabela Jamal", service: "Lavagem de Tapetes", date: "2025-07-18", timeSlot: "11:00 - 11:30" },
  { id: "B038", userName: "Cremildo Massango", service: "Enceramento", date: "2025-07-18", timeSlot: "12:00 - 12:30" },
  { id: "B039", userName: "Sílvia Matola", service: "Lavagem de Motor", date: "2025-07-18", timeSlot: "13:00 - 13:30" },
  { id: "B040", userName: "Benvinda Langa", service: "Lavagem Premium", date: "2025-07-18", timeSlot: "14:00 - 15:00" },
  { id: "B041", userName: "Gerson Caetano", service: "Lavagem Completa", date: "2025-07-19", timeSlot: "08:00 - 09:00" },
  { id: "B042", userName: "Raquel Mucavele", service: "Apenas Exterior", date: "2025-07-19", timeSlot: "09:00 - 09:30" },
  { id: "B043", userName: "Eduardo Ussene", service: "Detalhamento Completo", date: "2025-07-19", timeSlot: "10:00 - 11:00" },
  { id: "B044", userName: "Mónica Nhantumbo", service: "Lavagem de Tapetes", date: "2025-07-19", timeSlot: "11:30 - 12:00" },
  { id: "B045", userName: "Tomás Sibindy", service: "Polimento", date: "2025-07-19", timeSlot: "13:00 - 14:00" },
  { id: "B046", userName: "Vanda Bila", service: "Lavagem Premium", date: "2025-07-20", timeSlot: "08:30 - 09:30" },
  { id: "B047", userName: "Jaime Malua", service: "Lavagem Completa", date: "2025-07-20", timeSlot: "10:00 - 11:00" },
  { id: "B048", userName: "Lina Mussagy", service: "Enceramento", date: "2025-07-20", timeSlot: "11:00 - 11:30" },
  { id: "B049", userName: "Mateus Tamele", service: "Aspiração Profunda", date: "2025-07-20", timeSlot: "12:00 - 13:00" },
  { id: "B050", userName: "Tânia Massango", service: "Lavagem de Motor", date: "2025-07-20", timeSlot: "13:30 - 14:00" },
];


const TodasMarcacoes = () => {
  const [marcacoes, setMarcacoes] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // Simula um carregamento de API com delay
    setTimeout(() => {
      try {
        setMarcacoes(mockBookings);
        setLoading(false);
      } catch (e) {
        setErro("Erro ao obter as marcações.");
        setLoading(false);
      }
    }, 800); // 800ms delay
  }, []);

  const colunas = [
    {
      title: "ID da Marcação",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome do Cliente",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Serviço",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Horário",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
  ];

  if (loading) return <div className="flex justify-center p-10"><Spin size="large" /></div>;
  if (erro) return <Alert message={erro} type="error" showIcon />;

  return (
    <Table
      columns={colunas}
      dataSource={marcacoes}
      rowKey="id"
      pagination={{ pageSize: 20 }}
    />
  );
};

export default TodasMarcacoes;
