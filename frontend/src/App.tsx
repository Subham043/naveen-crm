import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { env } from "@/config/env.ts";
import { page_routes } from "@/utils/routes/page_routes.ts";

import SuspenseOutlet from "@/components/SuspenseOutlet/index.tsx";

//Providers
const DeleteProvider = React.lazy(
  () => import("@/contexts/DeleteProvider.tsx"),
);

//Layouts
const AuthPersistLayout = React.lazy(
  () => import("@/layouts/AuthPersistLayout"),
);
const DashboardLayout = React.lazy(
  () => import("@/layouts/DashboardLayout/index.tsx"),
);
const AuthLayout = React.lazy(() => import("@/layouts/AuthLayout/index.tsx"));
const ProtectedLayout = React.lazy(() => import("@/layouts/ProtectedLayout"));
const VerifiedLayout = React.lazy(() => import("@/layouts/VerifiedLayout"));
const PermittedLayout = React.lazy(() => import("@/layouts/PermittedLayout"));
const GuestLayout = React.lazy(() => import("@/layouts/GuestLayout.tsx"));

//Pages
const PageNotFound = React.lazy(() => import("@/pages/PageNotFound/index.tsx"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard/index.tsx"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const Login = React.lazy(() => import("@/pages/Auth/Login"));
const ForgotPassword = React.lazy(() => import("@/pages/Auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/Auth/ResetPassword"));
const User = React.lazy(() => import("@/pages/User/index.tsx"));
const Order = React.lazy(() => import("@/pages/Order/index.tsx"));
const OrderView = React.lazy(
  () => import("@/pages/Order/OrderViewPage/index.tsx"),
);
const SalesOrder = React.lazy(() => import("@/pages/SalesOrder/index.tsx"));
const SalesOrderView = React.lazy(
  () => import("@/pages/SalesOrder/SalesOrderViewPage/index.tsx"),
);
const OrderPublicForm = React.lazy(
  () => import("@/pages/OrderPublicForm/index.tsx"),
);

function App() {
  return (
    <BrowserRouter basename={env.BASE_PREFIX}>
      <Routes>
        <Route element={<AuthPersistLayout />}>
          <Route element={<ProtectedLayout />}>
            <Route element={<VerifiedLayout />}>
              <Route element={<DeleteProvider />}>
                <Route element={<DashboardLayout />}>
                  <Route
                    element={
                      <PermittedLayout
                        outletType="outlet"
                        allowedRoles={[
                          "Super-Admin",
                          "Sales-Team",
                          "Service-Team",
                        ]}
                        allowLoading={true}
                        display403={true}
                      />
                    }
                  >
                    <Route
                      path={page_routes.dashboard.link}
                      element={<Dashboard />}
                    />
                    <Route
                      path={page_routes.profile.link}
                      element={<Profile />}
                    />
                  </Route>
                  <Route
                    element={
                      <PermittedLayout
                        outletType="outlet"
                        allowedRoles={["Sales-Team"]}
                        allowLoading={true}
                        display403={true}
                      />
                    }
                  >
                    <Route
                      path={page_routes.sales_orders.link}
                      element={<SalesOrder />}
                    />
                    <Route
                      path={`${page_routes.sales_orders.link}/:id`}
                      element={<SalesOrderView />}
                    />
                  </Route>
                  <Route
                    element={
                      <PermittedLayout
                        outletType="outlet"
                        allowedRoles={["Super-Admin"]}
                        allowLoading={true}
                        display403={true}
                      />
                    }
                  >
                    <Route path={page_routes.users.link} element={<User />} />
                    <Route path={page_routes.orders.link} element={<Order />} />
                    <Route
                      path={`${page_routes.orders.link}/:id`}
                      element={<OrderView />}
                    />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route element={<GuestLayout />}>
            <Route element={<AuthLayout />}>
              <Route path={page_routes.login.link} element={<Login />} />
              <Route
                path={page_routes.forgot_password.link}
                element={<ForgotPassword />}
              />
              <Route
                path={`${page_routes.reset_password.link}/:token`}
                element={<ResetPassword />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path={page_routes.public_orders.link}
            element={<OrderPublicForm />}
          />
        </Route>
        <Route element={<SuspenseOutlet />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
