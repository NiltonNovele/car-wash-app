import { useState, useEffect } from "react";
import { Card, List } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useGetMyPendingBookingsQuery } from "../../../redux/features/admin/Bookings";

dayjs.extend(duration);

type Booking = {
  key: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
};

const calcularTempoRestante = (date: string, time: string): string => {
  const agora = dayjs();
  const horaAlvo = dayjs(`${date} ${time}`);
  const diferenca = horaAlvo.diff(agora);

  const duracao = dayjs.duration(diferenca);
  return `${duracao.days()}d ${duracao.hours()}h ${duracao.minutes()}m ${duracao.seconds()}s`;
};

const ReservasFuturas = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [temposRestantes, setTemposRestantes] = useState<Record<string, string>>({});

  const { data, isLoading } = useGetMyPendingBookingsQuery(undefined);

  useEffect(() => {
    if (data && data?.data) {
      const reservasTransformadas = data.data.map((reserva: any) => ({
        key: reserva?._id,
        serviceName: reserva?.service?.name || "Sem Serviço",
        date: reserva?.slot?.date,
        startTime: reserva?.slot?.startTime,
        endTime: reserva?.slot?.endTime,
        price: `€${reserva?.service?.price}`,
      }));

      setBookings(reservasTransformadas);

      const temposAtualizados: Record<string, string> = {};
      reservasTransformadas.forEach((reserva) => {
        temposAtualizados[reserva.key] = calcularTempoRestante(reserva.date, reserva.startTime);
      });

      setTemposRestantes(temposAtualizados);
    }
  }, [data]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const temposAtualizados: Record<string, string> = {};

      bookings.forEach((reserva) => {
        temposAtualizados[reserva.key] = calcularTempoRestante(reserva.date, reserva.startTime);
      });

      setTemposRestantes(temposAtualizados);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [bookings]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reservas Futuras</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={bookings}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.serviceName} className="rounded-lg shadow-md">
              <p>
                <strong>Data:</strong> {item.date}
              </p>
              <p>
                <strong>Horário:</strong> {item.startTime} - {item.endTime}
              </p>
              <p>
                <strong>Preço:</strong> {item.price}
              </p>
              <p>
                <strong>Tempo restante:</strong> {temposRestantes[item.key]}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReservasFuturas;
