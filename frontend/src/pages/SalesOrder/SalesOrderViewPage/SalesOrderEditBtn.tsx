import PermittedLayout from "@/layouts/PermittedLayout";
import type { ExtendedModalProps } from "@/utils/types";
import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import SalesOrderForm from "../SalesOrderForm";

type Props = {
  is_active: boolean;
  id: number;
};

function SalesOrderEditBtn({ is_active, id }: Props) {
  const [modal, setModal] = useState<
    ExtendedModalProps<{ id: undefined }, { id: number }>
  >({
    show: false,
    type: "create",
    id: undefined,
  });

  const handleModalClose = useCallback(
    () => setModal({ show: false, type: "create", id: undefined }),
    [],
  );

  const handleModalUpdate = useCallback(() => {
    setModal({ show: true, type: "update", id });
  }, [id]);
  return (
    <PermittedLayout
      outletType="children"
      allowedRoles={["Sales-Team"]}
      additionalCondition={!is_active}
    >
      <Button
        leftSection={<IconEdit size={16} />}
        variant="filled"
        color="teal"
        type="button"
        onClick={handleModalUpdate}
      >
        Edit
      </Button>
      <SalesOrderForm modal={modal} handleModalClose={handleModalClose} />
    </PermittedLayout>
  );
}

export default SalesOrderEditBtn;
