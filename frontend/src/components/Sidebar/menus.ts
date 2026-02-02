import { page_routes } from "@/utils/routes/page_routes";
import type { AvailableRoles } from "@/utils/types";
import {
  IconChartBar,
  IconFileSpreadsheet,
  IconHome,
  IconLogs,
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
    label: "Reports",
    icon: IconChartBar,
    initiallyOpened: false,
    canAccess: ["Super-Admin"],
    links: [
      {
        label: page_routes.sales_reports.name,
        link: page_routes.sales_reports.link,
        canAccess: ["Super-Admin"],
      },
      {
        label: page_routes.agent_performance_reports.name,
        link: page_routes.agent_performance_reports.link,
        canAccess: ["Super-Admin"],
      },
      {
        label: page_routes.revenue_summary_reports.name,
        link: page_routes.revenue_summary_reports.link,
        canAccess: ["Super-Admin"],
      },
    ],
  },
  {
    link: page_routes.activity_logs.link,
    label: page_routes.activity_logs.name,
    icon: IconLogs,
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
];