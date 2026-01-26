import PermittedLayout from "@/layouts/PermittedLayout";
import type { ExtendedModalProps } from "@/utils/types";
import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import ServiceTeamOrderForm from "../ServiceTeamOrderForm";

type Props = {
  id: number;
};

function ServiceTeamOrderEditBtn({ id }: Props) {
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
    <PermittedLayout outletType="children" allowedRoles={["Service-Team"]}>
      <Button
        leftSection={<IconEdit size={16} />}
        variant="filled"
        color="teal"
        type="button"
        onClick={handleModalUpdate}
      >
        Edit
      </Button>
      <ServiceTeamOrderForm modal={modal} handleModalClose={handleModalClose} />
    </PermittedLayout>
  );
}

export default ServiceTeamOrderEditBtn;
