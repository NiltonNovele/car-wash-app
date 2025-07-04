import { useState, useEffect } from "react";
import { Table } from "antd";
import { useGetMyBookingsQuery } from "../../../redux/features/admin/Bookings";

type Booking = {
  _id: string;
  service: {
    name: string;
  };
  date: string;
  time: string;
  price: string;
  status: string;
};

const ReservasPassadas = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data, isLoading } = useGetMyBookingsQuery(undefined);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString("pt-PT")}`;
  };

  useEffect(() => {
    if (data && data?.data) {
      const bookingData: any = data?.data?.map((booking: any) => ({
        key: booking?._id,
        serviceName: booking?.service?.name || "Sem Serviço",
        date: formatDate(booking?.createdAt),
        time: `${booking?.slot?.startTime} - ${booking?.slot?.endTime}`,
        price: booking?.service?.price,
        status: booking?.status,
      }));

      setBookings(bookingData);
    }
  }, [data]);

  const columns = [
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
      title: "Horário",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Preço (€)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reservas Passadas</h1>
      <Table
        dataSource={bookings}
        columns={columns}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ReservasPassadas;
