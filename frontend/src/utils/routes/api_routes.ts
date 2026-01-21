/*
 * API routes list
 */

export const api_routes = {
  auth: {
    login: "/api/v1/auth/login",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
    refresh: "/api/v1/auth/refresh",
    logout: "/api/v1/auth/logout",
  },
  account: {
    get: "/api/v1/account",
    update: "/api/v1/account/update",
    updatePassword: "/api/v1/account/password",
    verify: "/api/v1/account/verify",
    resendVerificationCode: "/api/v1/account/resend-verification",
  },
  users: {
    paginate: "/api/v1/user",
    create: "/api/v1/user",
    update: "/api/v1/user",
    status: "/api/v1/user",
    delete: "/api/v1/user",
    view: "/api/v1/user",
    toggleBlock: "/api/v1/user/toggle-block",
    verify: "/api/v1/user/verify",
  },
  textEditor: {
    imageUpload: "/api/v1/admin/texteditor-image"
  }
} as const;