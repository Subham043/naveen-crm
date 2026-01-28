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
  orders: {
    paginate: "/api/v1/order/paginate",
    view: "/api/v1/order/view",
    excel: "/api/v1/order/excel",
    approval: "/api/v1/order/approval",
    timeline: "/api/v1/order/timeline",
    publicCreate: "/api/v1/order/public/create",
  },
  sales: {
    orders: {
      paginate: "/api/v1/sales/order/paginate",
      create: "/api/v1/sales/order/create",
      update: "/api/v1/sales/order/update",
      view: "/api/v1/sales/order/view",
      excel: "/api/v1/sales/order/excel",
      submitForApproval: "/api/v1/sales/order/submit-for-approval",
    }
  },
  serviceTeam: {
    orders: {
      paginate: "/api/v1/service-team/order/paginate",
      update: "/api/v1/service-team/order/update",
      view: "/api/v1/service-team/order/view",
      excel: "/api/v1/service-team/order/excel",
    }
  },
  textEditor: {
    imageUpload: "/api/v1/admin/texteditor-image"
  }
} as const;