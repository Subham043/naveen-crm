import { type ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type AuthType = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  verified: "VERIFIED" | "VERIFICATION PENDING";
  email_verified_at: string;
  is_blocked: boolean;
  role: AvailableRoles;
  created_at: string;
  updated_at: string;
}

export type ProfileType = AuthType;

export type UserType = {
  email: string;
  name: string;
  phone?: string;
  id: number;
  verified: "VERIFIED" | "VERIFICATION PENDING";
  email_verified_at: string;
  is_blocked: boolean;
  role: AvailableRoles;
  created_at: string;
  updated_at: string;
}

export type RoleType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type QuotationType = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  country_code?: string;
  phone_number?: string;
  billing_address?: string;
  shipping_address?: string;
  part_year?: number;
  part_model?: string;
  part_make?: string;
  part_name?: string;
  part_number?: string;
  part_description?: string;
  lead_source: number;
  lead_source_info?: string;
  sales_user_id?: number;
  sales_user_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
  is_created_by_agent: boolean;
  assigned_at?: string;
  sale_price?: number;
  cost_price?: number;
  shipping_cost?: number;
  sales_tax?: number;
  gross_profit?: number;
  quotation_status: number;
  quotation_status_info?: string;
  approval_by_id?: number;
  approval_by_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
  approval_at?: string;
  quotation_sent: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type SalesQuotationType = QuotationType;

export type OrderType = {
  id: number;
  quotation_id?: number;
  quotation_info: QuotationType | null;
  payment_status: number;
  payment_status_info?: string;
  payment_card_type: number;
  payment_card_type_info?: string;
  payment_gateway: number;
  payment_gateway_info?: string;
  transaction_id?: string;
  yard_located: boolean;
  tracking_details?: string;
  tracking_status: number;
  tracking_status_info?: string;
  invoice_status: number;
  invoice_status_info?: string;
  po_status: number;
  po_status_info?: string;
  order_status: number;
  order_status_info?: string;
  created_at: string;
  updated_at: string;
  yards: {
    id: number;
    yard: string;
    created_at: string;
    updated_at: string;
  }[];
}

export type ServiceTeamOrderType = OrderType;

export type TimelineType = {
  id: number;
  order_id: number;
  comment?: string;
  additional_comment?: string;
  message: string;
  properties: Record<string, { old: string | number | boolean | null, new: string | number | boolean | null }>[];
  user_id: number;
  done_by: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: AvailableRoles;
  };
  created_at: string;
  updated_at: string;
}

export type ActivityLogType = {
  id: number;
  causer_id: number | null;
  description: string;
  event: string;
  log_name: string;
  subject_id: number;
  properties: {
    "old"?: Record<string, string | number | boolean | null>,
    "attributes": Record<string, string | number | boolean | null>
  };
  causer: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: AvailableRoles;
  } | null;
  created_at: string;
  updated_at: string;
}

export type AdminSalesPerformanceReportType = {
  period: string;
  sales_user_id: number;
  total_leads: number;
  total_revenue: number;
  total_profit: number;
  converted_leads: number;
  conversion_rate: number;
  sales_user_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
}

export type AdminRevenueSummaryReportType = {
  period: string;
  total_revenue: number;
  total_cost: number;
  total_shipping: number;
  total_tax: number;
  total_profit: number;
  profit_margin_percent: number;
}

export type AdminApprovalTurnAroundReportType = {
  sales_user_id: number;
  avg_approval_hours: number;
  sales_user_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
}

export type AdminConversionFunnelReportType = {
  period: string;
  total_quotations: number;
  approved_quotations: number;
  rejected_quotations: number;
}

export type AdminProfitLeaderboardReportType = {
  sales_user_id: number;
  total_revenue: number;
  total_profit: number;
  sales_user_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
}

export type AdminServicePerformanceReportType = {
  period: string;
  user_id: number;
  total_comments: number;
  orders_handled: number;
  performance_percentage: number;
  user_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
}

export type AdminOrderPaymentReportType = {
  period: string;
  total_orders: number;
  paid_orders: number;
  partial_paid_orders: number;
  unpaid_orders: number;
  payment_success_rate: number;
}

export type SalesTeamPipelineStatusReportType = {
  quotation_status: string;
  total_sales: number;
  total_revenue: number;
}

export type SalesTeamPerformanceReportType = {
  period: string;
  total_leads: number;
  converted_leads: number;
  conversion_rate: number;
}

export type SalesTeamProfitabilityPerQuotationReportType = {
  id: number;
  sale_price: number;
  cost_price: number;
  shipping_cost: number;
  tax: number;
  gross_profit: number;
}

export type SalesTeamTrendReportType = {
  period: string;
  total_sales: number;
  total_revenue: number;
}

export type SalesTeamRevenueReportType = {
  period: string;
  total_revenue: number;
  total_cost: number;
  total_shipping: number;
  total_tax: number;
  total_profit: number;
  profit_margin_percent: number;
}

export type SalesTeamLeadSourcePerformanceReportType = {
  lead_source: string;
  total_leads: number;
  approved: number;
  total_revenue: number;
}

export type SalesTeamApprovalTurnAroundReportType = {
  date: string;
  avg_approval_hours: number;
}

export type ServiceTeamPerformanceReportType = {
  period: string;
  total_comments: number;
  orders_handled: number;
  performance_score: number;
  avg_comments_per_order: number;
}

export type TexteditorImageType = {
  id: number;
  image: string;
  image_link: string;
  created_at: string;
  updated_at: string;
};

export type AvailableRoles = "Super-Admin" | "Sales-Team" | "Service-Team";


export type AxiosErrorResponseType = {
  message: string;
  errors?: Record<string, string[]>;
};

export type PaginationLinkType = {
  first: string | null;
  next: string | null;
  last: string | null;
  prev: string | null;
};

export type PaginationMetaType = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  to: number;
  total: number;
};

export type PaginationType<T> = {
  data: T[];
  links: PaginationLinkType;
  meta: PaginationMetaType;
};

export type PaginationQueryType = {
  page?: number;
  total?: number;
  search?: string;
}

export type ModalProps<T> =
  | {
    show: false;
  }
  | ({
    show: true;
  } & T);

export type ExtendedModalProps<T, N> =
  | ({
    show: boolean;
    type: "create";

  } & T)
  | ({
    show: boolean;
    type: "update";
  } & N);