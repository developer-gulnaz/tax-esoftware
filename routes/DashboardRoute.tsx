//import node modules libraries
import { IconBuildingEstate, IconDatabaseCog, IconLayoutDashboard, IconLogin2, IconReceiptRupee, IconReport } from "@tabler/icons-react";
import { v4 as uuid } from "uuid";

//import custom type
import { MenuItemType } from "types/menuTypes";

export const DashboardMenu: MenuItemType[] = [
  {
    id: uuid(),
    title: "डॅशबोर्ड",
    link: "/",
    icon: <IconLayoutDashboard size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "मास्टर",
    icon: <IconDatabaseCog size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "फॅमिली मास्टर", link: "family_tree" },
      { id: uuid(), name: "इमारत_कर", link: "building-tax" },
      { id: uuid(), name: "इमारत_प्रकार", link: "building-type" }
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
      { id: uuid(), name: "कर तपशील", link: "tax-detail" },
      { id: uuid(), name: "कराच्या थकबाकीचा तपशील", link: "tax_due/add_new" },
    ],
  },

  {
    id: uuid(),
    title: "अहवाल",
    icon: <IconReport size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "डिमांड बिल (नमुना-9 क)", link: "tax_due_bill" },
      { id: uuid(), name: "कर संग्रह सारांश (नमुना-10)", link: "tax_summury" },
    ],
  },

  {
    id: uuid(),
    title: "आउट",
    link: "/logout",
    icon: <IconLogin2 size={20} strokeWidth={1.5} />,
  },
];
