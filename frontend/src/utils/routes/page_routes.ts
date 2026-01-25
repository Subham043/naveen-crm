/*
 * Page routes list
 */
export const page_routes = {
  profile: { link: "/profile", name: "Profile" },
  login: { link: "/login", name: "Login" },
  forgot_password: { link: "/forgot-password", name: "Forgot Password" },
  reset_password: { link: "/reset-password", name: "Reset Password" },
  users: { link: "/users", name: "Users" },
  orders: { link: "/orders", name: "Orders" },
  sales_orders: { link: "/sales/orders", name: "Orders" },
  dashboard: { link: "/", name: "Dashboard" },
} as const;