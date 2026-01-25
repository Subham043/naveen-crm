import { page_routes } from "@/utils/routes/page_routes";
import { Menu } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router";

const OrderViewBtn = ({ id }: { id: number }) => {
  return (
    <Menu.Item
      leftSection={<IconEye size={16} stroke={1.5} />}
      type="button"
      component={Link}
      to={`${page_routes.orders.link}/${id}`}
    >
      View
    </Menu.Item>
  );
};

export default OrderViewBtn;
