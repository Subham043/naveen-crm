import TableRowLoading from "@/components/TableRowLoading";
import type { ServiceTeamPerformanceReportType } from "@/utils/types";
import { Table } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import { memo } from "react";

type ServiceTeamPerformanceReportTableProps = {
  serviceTeamPerformanceReports: ServiceTeamPerformanceReportType[];
  loading: boolean;
};

const ServiceTeamPerformanceReportRow = memo(
  ({
    period,
    total_comments,
    orders_handled,
    performance_score,
    avg_comments_per_order,
  }: ServiceTeamPerformanceReportType) => {
    return (
      <Table.Tr key={period}>
        <Table.Td>{period}</Table.Td>
        <Table.Td>{total_comments}</Table.Td>
        <Table.Td>{orders_handled}</Table.Td>
        <Table.Td>{performance_score}</Table.Td>
        <Table.Td>{avg_comments_per_order}</Table.Td>
      </Table.Tr>
    );
  },
);

function ServiceTeamPerformanceReportTable({
  loading,
  serviceTeamPerformanceReports,
}: ServiceTeamPerformanceReportTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PERIOD</Table.Th>
            <Table.Th>TOTAL COMMENTS</Table.Th>
            <Table.Th>ORDERS HANDLED</Table.Th>
            <Table.Th>PERFORMANCE SCORE</Table.Th>
            <Table.Th>AVERAGE COMMENTS PER ORDER</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={5} />
          ) : serviceTeamPerformanceReports.length > 0 ? (
            serviceTeamPerformanceReports.map((item, index) => (
              <ServiceTeamPerformanceReportRow key={index} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={5} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default ServiceTeamPerformanceReportTable;
