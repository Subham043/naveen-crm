/*
 * Page routes list
 */
export const page_routes = {
  profile: { link: "/profile", name: "Profile" },
  login: { link: "/login", name: "Login" },
  forgot_password: { link: "/forgot-password", name: "Forgot Password" },
  reset_password: { link: "/reset-password", name: "Reset Password" },
  users: { link: "/users", name: "Users" },
  quotations: { link: "/quotations", name: "Quotations" },
  orders: { link: "/orders", name: "Orders" },
  activity_logs: { link: "/activity-logs", name: "Activity Logs" },
  sales_reports: { link: "/reports/sales", name: "Sales Reports" },
  agent_performance_reports: { link: "/reports/agent-performance", name: "Agent Performance Reports" },
  revenue_summary_reports: { link: "/reports/revenue-summary", name: "Revenue Summary Reports" },
  public_quotations: { link: "/public/quotation", name: "Quotations" },
  sales_quotations: { link: "/sales/quotations", name: "Quotations" },
  service_team_orders: { link: "/service-team/orders", name: "Orders" },
  dashboard: { link: "/", name: "Dashboard" },
} as const;