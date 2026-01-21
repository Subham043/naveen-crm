import CustomLoading from "@/components/CustomLoading";
import SuspenseOutlet from "@/components/SuspenseOutlet";
import PageNotPermitted from "@/pages/PageNotPermitted";
import { useAuthStore } from "@/stores/auth.store";
import type { AvailableRoles } from "@/utils/types";
import type { FC } from "react";

type Props = {
  children?: React.ReactNode;
  allowedRoles?: AvailableRoles[];
  outletType?: "children" | "outlet";
  allowLoading?: boolean;
  display403?: boolean;
  additionalCondition?: boolean;
};

/*
 * Layout to display items based on the available permission of the logged in user.
 */
const PermittedLayout: FC<Props> = ({
  children,
  allowedRoles = ["Super-Admin"],
  outletType = "children",
  additionalCondition = true,
  allowLoading = false,
  display403 = false,
}) => {
  const authUser = useAuthStore((state) => state.authUser);

  if (!authUser) return null;

  if (!authUser && !allowLoading) return null;

  if (!authUser && allowLoading) {
    return <CustomLoading size="md" color="blue" />;
  }

  if (
    allowedRoles &&
    allowedRoles.includes(authUser ? authUser.role : "Sales-Team") &&
    additionalCondition
  ) {
    return outletType === "children" ? children : <SuspenseOutlet />;
  } else {
    return display403 ? <PageNotPermitted /> : null;
  }
};

export default PermittedLayout;
