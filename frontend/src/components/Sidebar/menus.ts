import { page_routes } from "@/utils/routes/page_routes";
import type { AvailableRoles } from "@/utils/types";
import {
  IconFileSpreadsheet,
  IconHome,
  IconUsers,
} from "@tabler/icons-react";



export interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  canAccess: AvailableRoles[];
  links?: {
    label: string;
    link: string;
    canAccess: AvailableRoles[];
  }[];
}

export const menus: LinksGroupProps[] = [
  {
    link: page_routes.dashboard.link,
    label: page_routes.dashboard.name,
    icon: IconHome,
    canAccess: ["Super-Admin", "Sales-Team", "Service-Team"],
  },
  {
    link: page_routes.users.link,
    label: page_routes.users.name,
    icon: IconUsers,
    canAccess: ["Super-Admin"],
  },
  {
    link: page_routes.orders.link,
    label: page_routes.orders.name,
    icon: IconFileSpreadsheet,
    canAccess: ["Super-Admin"],
  },
  {
    link: page_routes.sales_orders.link,
    label: page_routes.sales_orders.name,
    icon: IconFileSpreadsheet,
    canAccess: ["Sales-Team"],
  },
  {
    link: page_routes.service_team_orders.link,
    label: page_routes.service_team_orders.name,
    icon: IconFileSpreadsheet,
    canAccess: ["Service-Team"],
  },
  // {
  //   label: "Admin",
  //   icon: IconUserHexagon,
  //   initiallyOpened: false,
  //   canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //   links: [
  //     {
  //       label: page_routes.users.name,
  //       link: page_routes.users.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.departments.name,
  //       link: page_routes.departments.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.organizations.name,
  //       link: page_routes.organizations.link,
  //       canAccess: ["SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.applications.name,
  //       link: page_routes.applications.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.manageDocs.name,
  //       link: page_routes.manageDocs.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //   ],
  // },
];