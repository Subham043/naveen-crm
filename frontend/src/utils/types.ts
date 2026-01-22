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

export type SalesOrderType = {
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
  is_created_by_agent: boolean;
  assigned_at?: string;
  order_status: number;
  order_status_info?: string;
  approval_by_id?: number;
  approval_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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

export type ExtendedModalProps<T> =
  | {
    show: boolean;
    type: "create";
  }
  | ({
    show: boolean;
    type: "update";
  } & T);