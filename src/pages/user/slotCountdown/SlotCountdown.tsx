import { useState, useEffect } from "react";
import moment from "moment";
import { useGetSlotAvailabilityQuery } from "../../../redux/features/admin/SlotApi";

type Booking = {
  id: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
};

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ContagemDecrescenteSlots = () => {
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);
  const [countdowns, setCountdowns] = useState<Record<string, TimeRemaining>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { data, isLoading } = useGetSlotAvailabilityQuery(undefined);

  const calculateTimeRemaining = (date: string, startTime: string): TimeRemaining => {
    const bookingTime = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");
    const now = moment();
    const duration = moment.duration(bookingTime.diff(now));

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  useEffect(() => {
    if (data && data?.data && data?.data?.length > 0) {
      const NovaLista: Booking[] = data?.data?.map((item: any) => ({
        id: item?._id,
        serviceName: item?.service?.name || "Sem Serviço",
        date: item?.date,
        startTime: item?.startTime,
        endTime: item?.endTime,
      }));

      setBookings(NovaLista);
    }
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const novosTempos: Record<string, TimeRemaining> = {};
      let proximaReserva: Booking | null = null;

      bookings.forEach((booking) => {
        const tempoRestante = calculateTimeRemaining(booking.date, booking.startTime);
        novosTempos[booking.id] = tempoRestante;

        const bookingTime = moment(`${booking.date} ${booking.startTime}`);
        const nextTime = proximaReserva
          ? moment(`${proximaReserva.date} ${proximaReserva.startTime}`)
          : null;

        if (
          (!nextTime || bookingTime.isBefore(nextTime)) &&
          bookingTime.isAfter(moment())
        ) {
          proximaReserva = booking;
        }
      });

      setCountdowns(novosTempos);
      setNextBooking(proximaReserva);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bookings]);

  if (!data) {
    return <p>A carregar os dados dos horários... {isLoading ? "Sim" : "Não"}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contagem Decrescente de Serviços</h1>

      {nextBooking && (
        <div className="mb-6 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Próxima Reserva: {nextBooking.serviceName}</h2>
          <p className="text-gray-600">
            {nextBooking.date} | {nextBooking.startTime} - {nextBooking.endTime}
          </p>
          <p className="text-red-500 font-semibold">
            Tempo restante: {countdowns[nextBooking.id]?.days}d {countdowns[nextBooking.id]?.hours}h{" "}
            {countdowns[nextBooking.id]?.minutes}m {countdowns[nextBooking.id]?.seconds}s
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Todas as Próximas Reservas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
            <p className="text-gray-600">
              {booking.date} | {booking.startTime} - {booking.endTime}
            </p>
            <p className="text-red-500 font-semibold">
              Tempo restante: {countdowns[booking.id]?.days}d {countdowns[booking.id]?.hours}h{" "}
              {countdowns[booking.id]?.minutes}m {countdowns[booking.id]?.seconds}s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContagemDecrescenteSlots;
