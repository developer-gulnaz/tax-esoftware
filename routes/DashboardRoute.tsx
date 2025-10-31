//import node modules libraries
import { IconBuildingEstate, IconDatabaseCog, IconFileAnalytics, IconHomeCog, IconLayoutDashboard, IconLogin2, IconReceiptRupee, IconReport } from "@tabler/icons-react";
import { v4 as uuid } from "uuid";

//import custom type
import { MenuItemType } from "types/menuTypes";

export const DashboardMenu: MenuItemType[] = [
  {
    id: uuid(),
    title: "डॅशबोर्ड",
    link: "/dashboard",
    icon: <IconLayoutDashboard size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "मास्टर",
    icon: <IconDatabaseCog size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "फॅमिली मास्टर", link: "familyTree" },
      { id: uuid(), name: "इमारत कर", link: "buildingTax" },
      { id: uuid(), name: "इमारत प्रकार", link: "buildingType" },
      { id: uuid(), name: "योजना", link: "govtScheme" },
    ],
  },
  {
    id: uuid(),
    title: "मालमत्ता",
    icon: <IconBuildingEstate size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "मालमत्ता माहिती", link: "propertyDetails" },
      { id: uuid(), name: "मालमत्तेची (एन्ट्री फॉर्म)", link: "propertyDetails/addProperty" },
      // { id: uuid(), name: "अतिरिक्त मालमत्ता माहिती", link: "milkat_info" },
    ]
  },

  {
    id: uuid(),
    title: "कर माहिती",
    icon: <IconReceiptRupee size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "कर तपशील", link: "taxDetails" },
      { id: uuid(), name: "कराच्या थकबाकीचा तपशील", link: "taxDue/add" },
    ],
  },

  {
    id: uuid(),
    title: "अहवाल",
    icon: <IconReport size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "मूल्यांकन पत्रक (नमुना 8)", link: "valuationRegister" },
      { id: uuid(), name: "डिमांड बिल (नमुना-9 क)", link: "taxDueBill" },
      { id: uuid(), name: "कर संग्रह (नमुना-10)", link: "taxAssessment/add" },
      { id: uuid(), name: "वसूली यादी (नमुना-10 प्रिंट)", link: "taxAssessmentList" },
    ],
  },

  {
    id: uuid(),
    title: "खाते",
    icon: <IconFileAnalytics size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: " जावक (नमुना -15)", link: "paymentPaid" },
      { id: uuid(), name: "डिपॉझिट / उत्पन्न", link: "paymentRecipt" },
      { id: uuid(), name: "वसूली सारांश", link: "taxSummary" },
    ],
  },

  {
    id: uuid(),
    title: "व्यवस्थापन",
    icon: <IconHomeCog size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "प्रोफाइल अद्यतन", link: "updateProfile" },
      { id: uuid(), name: "संकेतशब्द बदला", link: "changePassword" },
      { id: uuid(), name: "वापरकर्ते व्यवस्थापित करा ", link: "manageUsers" },
    ],
  },

  {
    id: uuid(),
    title: "आउट",
    link: "/logout",
    icon: <IconLogin2 size={20} strokeWidth={1.5} />,
  },
];
