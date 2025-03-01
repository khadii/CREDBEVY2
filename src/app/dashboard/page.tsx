// import NavBar from "../navBar/NavBar";
import Dashboard from "../components/Dashboard/Dashboard";
import Layout from "../components/Layout/Layout";
import TopBar from "../components/Layout/navBar/NavBar";
import { Sidebar } from "../components/Layout/SideBar/SIdeBar";

export default function Page() {
  return (
    <Layout>
      <div className="flex w-full">
        <Dashboard />
      </div>
    </Layout>
  );
}
