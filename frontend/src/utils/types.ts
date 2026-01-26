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

export type OrderType = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  country_code?: string;
  phone_number?: string;
  billing_address?: string;
  part_name?: string;
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
  payment_status: number;
  payment_status_info?: string;
  yard_located: boolean;
  total_price?: number;
  cost_price?: number;
  shipping_cost?: number;
  sales_tax?: number;
  gross_profit?: number;
  tracking_details?: string;
  invoice_status: number;
  invoice_status_info?: string;
  shipment_status: number;
  shipment_status_info?: string;
  order_status: number;
  order_status_info?: string;
  approval_by_id?: number;
  approval_by_info: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  } | null;
  approval_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type SalesOrderType = OrderType;

export type ServiceTeamOrderType = OrderType & {
  yards: {
    id: number;
    yard: string;
    created_at: string;
    updated_at: string;
  }[];
  comments: {
    id: number;
    comment: string;
    created_at: string;
    updated_at: string;
  }[];
};

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