import { Button } from "../../components/ui/button.tsx";
import DashboardItems from "./DashBoardItems.tsx";
const Dashboard = () => {
  return (
    <div className="flex flex-col p-4 max-md:flex-col">
      <div className="flex flex-row justify-between">
        <p className={"text-2xl font-semibold"}>Dashboard</p>
        <Button className="bg-[#F18524]">+ Create New</Button>
      </div>
      <div className="max-h-screen overflow-y-auto mt-4">
       <DashboardItems></DashboardItems>
        <></>
      </div>
    </div>
  );
};

export default  Dashboard;
