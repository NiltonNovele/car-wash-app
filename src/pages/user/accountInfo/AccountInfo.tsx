import { useEffect, useState } from "react";
import { Button, Input, Form, Avatar, message } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useUpdateUSerMutation } from "../../../redux/features/admin/UserManagementApi";
import { updateUser } from "../../../redux/features/auth/AuthSlice";

const InformacaoConta = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state?.auth?.user);

  const [updateUserMutation, { isLoading }] = useUpdateUSerMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      });
    }
  }, [user, form]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const updatedUser = await updateUserMutation({ id: user?._id, ...values }).unwrap();
      dispatch(updateUser({ data: updatedUser }));
      message.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      message.error("Falha ao atualizar o perfil. Por favor, tente novamente.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  if (!user) {
    return <p>A carregar os dados do utilizador...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md">
      <div className="flex items-center mb-6">
        <Avatar size={64} icon={<UserOutlined />} />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="mt-2"
            onClick={handleEditClick}
          >
            Editar Perfil
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={user}
          onFinish={handleFormSubmit}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Por favor, introduza o seu nome" }]}
          >
            <Input placeholder="Introduza o seu nome" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Por favor, introduza o seu email" },
              { type: "email", message: "Introduza um email válido" },
            ]}
          >
            <Input placeholder="Introduza o seu email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telemóvel"
            rules={[{ required: true, message: "Por favor, introduza o seu número de telemóvel" }]}
          >
            <Input placeholder="Introduza o seu número de telemóvel" />
          </Form.Item>

          <Form.Item name="address" label="Morada">
            <Input placeholder="Introduza a sua morada" />
          </Form.Item>

          <div className="flex justify-end space-x-4">
            <Button type="default" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Guardar Alterações
            </Button>
          </div>
        </Form>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p>{user.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Telemóvel</h2>
            <p>{user.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Morada</h2>
            <p>{user.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformacaoConta;
