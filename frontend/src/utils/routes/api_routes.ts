/*
 * API routes list
 */

export const api_routes = {
  auth: {
    login: "/api/v1/auth/login",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
  },
  account: {
    get: "/api/v1/account",
    update: "/api/v1/account/update",
    updatePassword: "/api/v1/account/password",
    verify: "/api/v1/account/verify",
    resendVerificationCode: "/api/v1/account/resend-verification",
    refresh: "/api/v1/account/refresh",
    logout: "/api/v1/account/logout",
  },
  roles: "/api/v1/roles",
  dashboard: "/api/v1/dashboard",
  users: {
    paginate: "/api/v1/users/paginate",
    create: "/api/v1/users/create",
    update: "/api/v1/users/update",
    status: "/api/v1/users/status",
    delete: "/api/v1/users/delete",
    view: "/api/v1/users/view",
    verify: "/api/v1/users/verify",
    excel: "/api/v1/users/excel",
  },
  quotations: {
    paginate: "/api/v1/quotation/paginate",
    view: "/api/v1/quotation/view",
    excel: "/api/v1/quotation/excel",
    update: "/api/v1/quotation/update",
    approval: "/api/v1/quotation/approval",
    timeline: "/api/v1/quotation/timeline",
    publicCreate: "/api/v1/quotation/public/create",
  },
  orders: {
    paginate: "/api/v1/order/paginate",
    view: "/api/v1/order/view",
    update: "/api/v1/order/update",
    excel: "/api/v1/order/excel",
  },
  activityLog: {
    paginate: "/api/v1/activity-log/paginate",
    view: "/api/v1/activity-log/view",
    excel: "/api/v1/activity-log/excel",
  },
  reports: {
    salesPerformance: {
      paginate: "/api/v1/report/sales-performance/paginate",
      excel: "/api/v1/report/sales-performance/excel",
    },
    servicePerformance: {
      paginate: "/api/v1/report/service-performance/paginate",
      excel: "/api/v1/report/service-performance/excel",
    },
    orderPayment: {
      paginate: "/api/v1/report/order-payment/paginate",
      excel: "/api/v1/report/order-payment/excel",
    },
    approvalTurnAround: {
      paginate: "/api/v1/report/approval-turn-around/paginate",
      excel: "/api/v1/report/approval-turn-around/excel",
    },
    conversionFunnel: {
      paginate: "/api/v1/report/conversion-funnel/paginate",
      excel: "/api/v1/report/conversion-funnel/excel",
    },
    profitLeaderboard: {
      paginate: "/api/v1/report/profit-leaderboard/paginate",
      excel: "/api/v1/report/profit-leaderboard/excel",
    },
    revenueSummary: {
      paginate: "/api/v1/report/revenue-summary/paginate",
      excel: "/api/v1/report/revenue-summary/excel",
    },
  },
  sales: {
    quotations: {
      paginate: "/api/v1/sales/quotation/paginate",
      create: "/api/v1/sales/quotation/create",
      update: "/api/v1/sales/quotation/update",
      view: "/api/v1/sales/quotation/view",
      excel: "/api/v1/sales/quotation/excel",
      submitForApproval: "/api/v1/sales/quotation/submit-for-approval",
    },
    reports: {
      salesPerformance: {
        paginate: "/api/v1/sales/report/sales-performance/paginate",
        excel: "/api/v1/sales/report/sales-performance/excel",
      },
      salesLeadSourcePerformance: {
        paginate: "/api/v1/sales/report/sales-lead-source-performance/paginate",
        excel: "/api/v1/sales/report/sales-lead-source-performance/excel",
      },
      salesApprovalTurnAroundReport: {
        paginate: "/api/v1/sales/report/sales-approval-turn-around/paginate",
        excel: "/api/v1/sales/report/sales-approval-turn-around/excel",
      },
      salesTrendReport: {
        paginate: "/api/v1/sales/report/sales-trend/paginate",
        excel: "/api/v1/sales/report/sales-trend/excel",
      },
      salesRevenueReport: {
        paginate: "/api/v1/sales/report/sales-revenue/paginate",
        excel: "/api/v1/sales/report/sales-revenue/excel",
      },
      salesPipelineStatusReport: {
        paginate: "/api/v1/sales/report/sales-pipeline-status/paginate",
        excel: "/api/v1/sales/report/sales-pipeline-status/excel",
      },
      profitabilityPerQuotationReport: {
        paginate: "/api/v1/sales/report/profitability-per-quotation/paginate",
        excel: "/api/v1/sales/report/profitability-per-quotation/excel",
      },
    },
  },
  serviceTeam: {
    orders: {
      paginate: "/api/v1/service-team/order/paginate",
      update: "/api/v1/service-team/order/update",
      view: "/api/v1/service-team/order/view",
      excel: "/api/v1/service-team/order/excel",
    },
    reports: {
      servicePerformance: {
        paginate: "/api/v1/service-team/report/service-performance/paginate",
        excel: "/api/v1/service-team/report/service-performance/excel",
      },
    }
  },
  textEditor: {
    imageUpload: "/api/v1/admin/texteditor-image"
  }
} as const;