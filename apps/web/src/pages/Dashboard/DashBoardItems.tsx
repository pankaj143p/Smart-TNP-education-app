import { BsPerson } from "react-icons/bs";
import { HiOutlineChartPie } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import { MdOutlineTaskAlt } from "react-icons/md";
// import { Button } from "@/components/ui/button";
import FilterButtons, {
  useFilterGoalsData,
} from "../../hooks/useFilterGoalsData";
import { useEffect } from "react";
// import GoalDataTable from "../../components/core/Goals/GoalDataTable";
import GoalDataTable from "../../components/core/Goals/GoalDataTable.tsx";
import {
  Table,
  TableBody,
  //   TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import DashboardLayout from "@/components/reusable/layout/DashboardLayout.tsx";
import { cn } from "../../lib/utils";
const goalsStatusAndTypes = [
  {
    icon: (
      <div className="rounded-full bg-sky-400 p-1 text-white flex ">
        <span className="rounded-full bg-sky-700 p-1 flex">
          <BsPerson size={20} />
        </span>
      </div>
    ),
    type: "Personal",
    number: "8",
  },
  {
    icon: (
      <div className="rounded-full bg-orange-400 p-1 text-white flex">
        <span className="rounded-full bg-orange-700 p-1 flex">
          <HiOutlineChartPie size={20} />
        </span>
      </div>
    ),
    type: "Financial",
    number: "14",
  },
  {
    icon: (
      <div className="rounded-full bg-blue-600 p-1 text-white flex">
        <span className="rounded-full bg-blue-900 p-1 flex">
          <HiOutlineShoppingBag size={20} />
        </span>
      </div>
    ),
    type: "Profesional",
    number: "9",
  },
  {
    icon: (
      <div className="rounded-full bg-yellow-300 p-1 text-white flex">
        <span className="rounded-full bg-yellow-600 p-1 flex">
          <IoMdTime size={20} />
        </span>
      </div>
    ),
    type: "On-Going",
    number: "4",
  },
  {
    icon: (
      <div className="rounded-full bg-teal-300 p-1 text-white flex">
        <span className="rounded-full bg-teal-600 p-1 flex">
          <MdOutlineTaskAlt size={20} />
        </span>
      </div>
    ),
    type: "Complete",
    number: "23",
  },
];

type GoalTypes = "Personal" | "Financial" | "Profesional" | "Live Event";
type GoalStatus = "On-Going" | "Complete" | "In Progress" | "Pending";
export interface DashboardItems {
  name: string;
  type: GoalTypes;
  start: Date;
  deadline: Date;
  status: GoalStatus;
}

const goalsData: DashboardItems[] = [
  {
    name: "Cooking class",
    type: "Personal",
    start: new Date(),
    deadline: new Date(),
    status: "On-Going",
  },
  {
    name: "Cooking class",
    type: "Profesional",
    start: new Date(),
    deadline: new Date(),
    status: "Complete",
  },
  {
    name: "Cooking class",
    type: "Financial",
    start: new Date(),
    deadline: new Date(),
    status: "In Progress",
  },
  {
    name: "Cooking class",
    type: "Live Event",
    start: new Date(),
    deadline: new Date(),
    status: "On-Going",
  },
  //   {
  //     name: "Cooking class",
  //     type: "Profesional",
  //     start: new Date(),
  //     deadline: new Date(),
  //     status: "Complete",
  //   },
  //   {
  //     name: "Cooking class",
  //     type: "Live Event",
  //     start: new Date(),
  //     deadline: new Date(),
  //     status: "Pending",
  //   },
  //   {
  //     name: "Cooking class",
  //     type: "Personal",
  //     start: new Date(),
  //     deadline: new Date(),
  //     status: "Pending",
  //   },
];

const DashboardItems = () => {
  const { selectedData, selectedDuration } = useFilterGoalsData();
  useEffect(() => {
  }, [selectedData, selectedDuration]);

  return (
    <div className="flex flex-col gap-6 overflow-y-scroll max-h-screen max-md:mb-8 max-sm:mb-6 pb-8">
      <div className="flex gap-2 flex-col mt-4">
        <div className="flex flex-row justify-between">
          {/* <p className="text-2xl font-semibold">My Courses</p> */}
          {/* <Button>+ Create New Goals</Button> */}
        </div>
        <div className=" rounded-xl mr-6 py-6 bg-white grid grid-cols-5 max-md:grid-cols-3">
          {goalsStatusAndTypes.map((goal) => (
            <div
              className="flex flex-row justify-center items-center gap-3 max-sm:flex-col"
              key={goal.type}
            >
              {goal.icon}
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg opacity-35">{goal.type}</p>
                <p className="text-3xl font-semibold">{goal.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className={"text-2xl font-semibold"}>Nearby Goals</p>
      <div className="pb-32 flex flex-col  lg:px-0 md:px-6 sm:px-2">
        <FilterButtons />
        <div className=" py-4 flex flex-col px-1 gap-1">
          <Table className="bg-white my-2">
            {/* <TableCaption className="">A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-white">
              <TableRow className="bg-[#F1F2F4]">
                <TableHead className="">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start</TableHead>
                <TableHead className="">Deadline</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(null, "max-h-screen overflow-y-auto")}>
              {goalsData.map((goal) => (
                <GoalDataTable goal={goal} key={goal.name} />
              ))}
            </TableBody>
            <div className="place-self-center w-full">
              <p className="px-4 cursor-pointer pb-2  font-semibold text-lg">View All</p>
            </div>

            <TableFooter className="flex flex-row justify-center items-center ">

            </TableFooter>
          </Table>
          <p className={"text-2xl py-3 font-semibold"}>Nearby Goals</p>
          <DashboardLayout></DashboardLayout>
          {/* <Calendar></Calendar> */}
        </div>
      </div>
    </div>

  );
};

export default DashboardItems;


//still no need -- > 
{/* <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination> */}


