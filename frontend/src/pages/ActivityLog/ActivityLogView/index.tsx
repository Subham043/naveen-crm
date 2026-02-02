import {
  Box,
  Divider,
  Kbd,
  List,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import type { ActivityLogType, ModalProps } from "@/utils/types";
import Datetime from "@/components/Datetime";
import { useMemo } from "react";

type Props = {
  modal: ModalProps<{ data: ActivityLogType }>;
  handleModalClose: () => void;
};

/*
 * Activity Log View Modal
 */
export default function ActivityLogView({ modal, handleModalClose }: Props) {
  const changesMade = useMemo(() => {
    if (
      modal.show &&
      modal.data &&
      modal.data.properties &&
      modal.data.properties.attributes &&
      modal.data.properties.old !== undefined
    ) {
      return Object.keys(modal.data.properties.attributes).map((key, index) => (
        <List.Item key={index}>
          The field named <Kbd>{key}</Kbd> was modified from{" "}
          <Kbd>
            {modal.data.properties.old![key]
              ? modal.data.properties.old![key]
              : "NULL"}
          </Kbd>{" "}
          to{" "}
          <Kbd>
            {modal.data.properties.attributes![key]
              ? modal.data.properties.attributes![key]
              : "NULL"}
          </Kbd>
        </List.Item>
      ));
    }
    if (
      modal.show &&
      modal.data &&
      modal.data.properties &&
      modal.data.properties.attributes &&
      modal.data.properties.old === undefined
    ) {
      return Object.keys(modal.data.properties.attributes).map((key, index) => (
        <List.Item key={index}>
          The field named <Kbd>{key}</Kbd> was added with value{" "}
          <Kbd>
            {modal.data.properties.attributes![key]
              ? modal.data.properties.attributes![key]
              : "NULL"}
          </Kbd>
        </List.Item>
      ));
    }
    return [];
  }, [modal]);
  return (
    <Modal
      opened={modal.show}
      onClose={handleModalClose}
      title={`Activity Log`}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="xl"
    >
      {modal.show && (
        <Paper mb="xs" withBorder>
          <Box bg="var(--mantine-color-blue-1)">
            <Title order={5} ta="center" p="xs">
              Log Information
            </Title>
          </Box>
          <Divider />
          <Box p="xs" pos="relative">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Box>
                <Text fw={600} c="blue">
                  ID
                </Text>
                <Text size="sm" c="dimmed">
                  {modal.data.id}
                </Text>
              </Box>
              <Box>
                <Text fw={600} c="blue">
                  Log Name
                </Text>
                <Text size="sm" c="dimmed">
                  {modal.data.log_name}
                </Text>
              </Box>
              <Box>
                <Text fw={600} c="blue">
                  Event
                </Text>
                <Text size="sm" c="dimmed">
                  {modal.data.event}
                </Text>
              </Box>
              <Box>
                <Text fw={600} c="blue">
                  Done At
                </Text>
                <Text size="sm" c="dimmed">
                  <Datetime value={modal.data.created_at} />
                </Text>
              </Box>
            </SimpleGrid>
            <Box mt="sm">
              <Text fw={600} c="blue">
                Description
              </Text>
              <Text size="sm" c="dimmed">
                {modal.data.description}
              </Text>
            </Box>
          </Box>
          {changesMade.length > 0 && (
            <>
              <Box bg="var(--mantine-color-blue-1)">
                <Title order={5} ta="center" p="xs">
                  Attributes Modified
                </Title>
              </Box>
              <Divider />
              <Box p="xs" pos="relative">
                <List>{changesMade}</List>
              </Box>
            </>
          )}
          {modal.data.causer && (
            <>
              <Box bg="var(--mantine-color-blue-1)">
                <Title order={5} ta="center" p="xs">
                  Done By
                </Title>
              </Box>
              <Divider />
              <Box p="xs" pos="relative">
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <Box>
                    <Text fw={600} c="blue">
                      ID
                    </Text>
                    <Text size="sm" c="dimmed">
                      {modal.data.causer.id}
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} c="blue">
                      Name
                    </Text>
                    <Text size="sm" c="dimmed">
                      {modal.data.causer.name}
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} c="blue">
                      Email
                    </Text>
                    <Text size="sm" c="dimmed">
                      {modal.data.causer.email}
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} c="blue">
                      Role
                    </Text>
                    <Text size="sm" c="dimmed">
                      {modal.data.causer.role}
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} c="blue">
                      Phone
                    </Text>
                    <Text size="sm" c="dimmed">
                      {modal.data.causer.phone}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </>
          )}
        </Paper>
      )}
    </Modal>
  );
}
