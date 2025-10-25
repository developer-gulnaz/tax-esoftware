//import node modules libraries
import {
  IconArrowLeftBar,
  IconFile,
  IconFiles,
  IconLogin2,
  IconNews,
  IconShoppingBag
} from "@tabler/icons-react";
import { v4 as uuid } from "uuid";

//import custom type
import { MenuItemType } from "types/menuTypes";

export const DashboardMenu: MenuItemType[] = [
  {
    id: uuid(),
    title: "डॅशबोर्ड",
    link: "/",
    icon: <IconFiles size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "मास्टर",
    icon: <IconShoppingBag size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "फॅमिली मास्टर", link: "family_tree" },
      { id: uuid(), name: "इमारत_कर", link: "building-tax" },
      { id: uuid(), name: "इमारत_प्रकार", link: "building-type" }
    ],
  },
  {
    id: uuid(),
    title: "मालमत्ता",
    icon: <IconNews size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "मालमत्ता माहिती", link: "ecommerce" },
      { id: uuid(), name: "मालमत्तेची (एन्ट्री फॉर्म)", link: "add_property" },
      // { id: uuid(), name: "अतिरिक्त मालमत्ता माहिती", link: "milkat_info" },
    ]
  },

  {
    id: uuid(),
    title: "कर माहिती",
    icon: <IconFile size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "कर तपशील", link: "tax-detail" },
      { id: uuid(), name: "कराच्या थकबाकीचा तपशील", link: "tax_due/add_new" },
    ],
  },

  {
    id: uuid(),
    title: "अहवाल",
    icon: <IconFile size={20} strokeWidth={1.5} />,
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
