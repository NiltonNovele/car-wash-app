import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { BsFillCalendarFill } from "react-icons/bs";
import { GrUnorderedList } from "react-icons/gr";
import { MdCreateNewFolder, MdManageAccounts } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const PainelAdmin = () => {
  return (
    <div className="mt-[62px]">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundColor: "rgb(0, 0, 0)",
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={() => {}}
          onCollapse={() => {}}
        >
          <div
            style={{
              color: "white",
              textAlign: "center",
              height: "4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="uppercase">Painel de Administração</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ backgroundColor: "rgb(0, 0, 0)" }}
          >
            <Menu.Item key="1" icon={<GrUnorderedList />}>
              <Link to="/admin/all-bookings">Marcações Recentes</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MdCreateNewFolder />}>
              <Link to="/admin/servicesManagement">Gestão de Serviços</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<BsFillCalendarFill />}>
              <Link to="/admin/slotsManagement">Gestão de Horários</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<MdManageAccounts />}>
              <Link to="/admin/usersManagement">Gestão de Utilizadores</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0", padding: 12 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PainelAdmin;
