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
const BlockedLayout = React.lazy(() => import("@/layouts/BlockedLayout"));
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
const ActivityLog = React.lazy(() => import("@/pages/ActivityLog/index.tsx"));
const Order = React.lazy(() => import("@/pages/Order/index.tsx"));
const OrderView = React.lazy(
  () => import("@/pages/Order/OrderViewPage/index.tsx"),
);
const Quotation = React.lazy(() => import("@/pages/Quotation/index.tsx"));
const QuotationView = React.lazy(
  () => import("@/pages/Quotation/QuotationViewPage/index.tsx"),
);
const SalesQuotation = React.lazy(() => import("@/pages/SalesQuotation"));
const SalesQuotationView = React.lazy(
  () => import("@/pages/SalesQuotation/SalesQuotationViewPage"),
);
const ServiceTeamOrder = React.lazy(
  () => import("@/pages/ServiceTeamOrder/index.tsx"),
);
const ServiceTeamOrderView = React.lazy(
  () => import("@/pages/ServiceTeamOrder/ServiceTeamOrderViewPage/index.tsx"),
);
const QuotationPublicForm = React.lazy(
  () => import("@/pages/QuotationPublicForm"),
);
const AdminConversionFunnelReport = React.lazy(
  () => import("@/pages/Report/AdminConversionFunnelReport"),
);
const AdminRevenueSummaryReport = React.lazy(
  () => import("@/pages/Report/AdminRevenueSummaryReport"),
);
const AdminSalesPerformanceReport = React.lazy(
  () => import("@/pages/Report/AdminSalesPerformanceReport"),
);
const AdminServicePerformanceReport = React.lazy(
  () => import("@/pages/Report/AdminServicePerformanceReport"),
);
const AdminOrderPaymentReport = React.lazy(
  () => import("@/pages/Report/AdminOrderPaymentReport"),
);
const AdminApprovalTurnAroundReport = React.lazy(
  () => import("@/pages/Report/AdminApprovalTurnAroundReport"),
);
const AdminProfitLeaderboardReport = React.lazy(
  () => import("@/pages/Report/AdminProfitLeaderboardReport"),
);
const SalesTeamApprovalTurnAroundReport = React.lazy(
  () => import("@/pages/Report/SalesTeamApprovalTurnAroundReport"),
);
const SalesTeamTrendReport = React.lazy(
  () => import("@/pages/Report/SalesTeamTrendReport"),
);
const SalesTeamProfitabilityPerQuotationReport = React.lazy(
  () => import("@/pages/Report/SalesTeamProfitabilityPerQuotationReport"),
);
const SalesTeamRevenueReport = React.lazy(
  () => import("@/pages/Report/SalesTeamRevenueReport"),
);
const SalesTeamPipelineStatusReport = React.lazy(
  () => import("@/pages/Report/SalesTeamPipelineStatusReport"),
);
const SalesTeamLeadSourcePerformanceReport = React.lazy(
  () => import("@/pages/Report/SalesTeamLeadSourcePerformanceReport"),
);
const SalesTeamPerformanceReport = React.lazy(
  () => import("@/pages/Report/SalesTeamPerformanceReport"),
);
const ServiceTeamPerformanceReport = React.lazy(
  () => import("@/pages/Report/ServiceTeamPerformanceReport"),
);

function App() {
  return (
    <BrowserRouter basename={env.BASE_PREFIX}>
      <Routes>
        <Route element={<AuthPersistLayout />}>
          <Route element={<ProtectedLayout />}>
            <Route element={<BlockedLayout />}>
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
                      <Route
                        path={page_routes.activity_logs.link}
                        element={<ActivityLog />}
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
                        path={page_routes.sales_quotations.link}
                        element={<SalesQuotation />}
                      />
                      <Route
                        path={`${page_routes.sales_quotations.link}/:id`}
                        element={<SalesQuotationView />}
                      />
                      <Route
                        path={
                          page_routes.sales_team_approval_turn_around_report
                            .link
                        }
                        element={<SalesTeamApprovalTurnAroundReport />}
                      />
                      <Route
                        path={page_routes.sales_team_trend_report.link}
                        element={<SalesTeamTrendReport />}
                      />
                      <Route
                        path={
                          page_routes
                            .sales_team_profitability_per_quotation_report.link
                        }
                        element={<SalesTeamProfitabilityPerQuotationReport />}
                      />
                      <Route
                        path={page_routes.sales_team_revenue_report.link}
                        element={<SalesTeamRevenueReport />}
                      />
                      <Route
                        path={
                          page_routes.sales_team_pipeline_status_report.link
                        }
                        element={<SalesTeamPipelineStatusReport />}
                      />
                      <Route
                        path={page_routes.sales_team_lead_source_report.link}
                        element={<SalesTeamLeadSourcePerformanceReport />}
                      />
                      <Route
                        path={page_routes.sales_team_performance_report.link}
                        element={<SalesTeamPerformanceReport />}
                      />
                    </Route>
                    <Route
                      element={
                        <PermittedLayout
                          outletType="outlet"
                          allowedRoles={["Service-Team"]}
                          allowLoading={true}
                          display403={true}
                        />
                      }
                    >
                      <Route
                        path={page_routes.service_team_orders.link}
                        element={<ServiceTeamOrder />}
                      />
                      <Route
                        path={`${page_routes.service_team_orders.link}/:id`}
                        element={<ServiceTeamOrderView />}
                      />
                      <Route
                        path={page_routes.service_team_performance_report.link}
                        element={<ServiceTeamPerformanceReport />}
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
                      <Route
                        path={page_routes.conversion_funnel_reports.link}
                        element={<AdminConversionFunnelReport />}
                      />
                      <Route
                        path={page_routes.revenue_summary_reports.link}
                        element={<AdminRevenueSummaryReport />}
                      />
                      <Route
                        path={page_routes.sales_performance_reports.link}
                        element={<AdminSalesPerformanceReport />}
                      />
                      <Route
                        path={page_routes.order_payment_reports.link}
                        element={<AdminOrderPaymentReport />}
                      />
                      <Route
                        path={page_routes.service_performance_reports.link}
                        element={<AdminServicePerformanceReport />}
                      />
                      <Route
                        path={page_routes.approval_turn_around_reports.link}
                        element={<AdminApprovalTurnAroundReport />}
                      />
                      <Route
                        path={page_routes.profit_leaderboard_reports.link}
                        element={<AdminProfitLeaderboardReport />}
                      />
                      <Route
                        path={page_routes.orders.link}
                        element={<Order />}
                      />
                      <Route
                        path={`${page_routes.orders.link}/:id`}
                        element={<OrderView />}
                      />
                      <Route
                        path={page_routes.quotations.link}
                        element={<Quotation />}
                      />
                      <Route
                        path={`${page_routes.quotations.link}/:id`}
                        element={<QuotationView />}
                      />
                    </Route>
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
            path={page_routes.public_quotations.link}
            element={<QuotationPublicForm />}
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
