//import node modules libraries
import {
  IconArrowBarUp,
  IconBuildingBank,
  IconBuildingWarehouse,
  IconCashBanknote,
  IconListDetails,
} from "@tabler/icons-react";
import { v4 as uuid } from "uuid";

//import custom types
import {
  ActivityLogType,
  DashboardStatType,
  EventType,
  Task,
  TeamsProps
} from "types/DashboardTypes";

export const DashboardStatsData: DashboardStatType[] = [
  {
    id: uuid(),
    title: "मूल्यांकन पत्रक (नमुना 8)",
    icon: <IconListDetails size={35} strokeWidth={1.5} />, // Assessment Document
    bgColor: "bg-gradient-success",
    textColor: "text-success-emphasis",
    link: "/valuationRegister",
  },
  {
    id: uuid(),
    title: "कर संग्रह (नमुना-10)",
    icon: <IconCashBanknote size={35} strokeWidth={1.5} />, // Tax Collection
    bgColor: "bg-gradient-info",
    textColor: "text-danger-emphasis",
    link: "/taxAssessment/"
  },
  {
    id: uuid(),
    title: "डिपॉझिट / उत्पन्न",
    icon: <IconBuildingBank size={35} strokeWidth={1.5} />, // Deposit / Income
    bgColor: "bg-gradient-success",
    textColor: "text-info-emphasis",
    link: "/paymentRecipt"
  },
  {
    id: uuid(),
    title: "जावक (नमुना -15)",
    icon: <IconArrowBarUp size={35} strokeWidth={1.5} />, // Outgoing/Expense
    bgColor: "bg-gradient-warning",
    textColor: "text-warning-emphasis",
    link: "/paymentPaid"
  },
  {
    id: uuid(),
    title: "मालमत्तेची यादी (मालमता एन्ट्री फोर्म)",
    icon: <IconBuildingWarehouse size={35} strokeWidth={1.5} />, // Property list/Entry
    bgColor: "bg-gradient-warning",
    textColor: "text-warning-emphasis",
    link: "/milkitDetails"
  },
];


export const teamMembers: TeamsProps[] = [
  {
    name: "Gulnaz Sheikh",
    role: "Developer",
    avatar: "",
    tasksAssigned: 2,
  },
];

