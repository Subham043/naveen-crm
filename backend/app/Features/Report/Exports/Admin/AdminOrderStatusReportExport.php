<?php

namespace App\Features\Report\Exports\Admin;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminOrderStatusReportExport implements FromQuery, WithHeadings, WithMapping
{

	private QueryBuilder $query;
	public function __construct(QueryBuilder $query)
	{
		$this->query = $query;
	}
	public function query()
	{
		return $this->query; // Using cursor() to avoid memory overload
	}

	public function map($data): array
	{
		return [
			$data->period,
			$data->total_orders,
			$data->pending_orders,
			$data->relocate_orders,
			$data->escalation_orders,
			$data->invoice_sent_orders,
			$data->tracking_sent_orders,
			$data->refund_pending_from_yard_orders,
			$data->refund_pending_to_customer_orders,
			$data->cancelled_orders,
			$data->po_sent_orders,
			$data->part_shipped_orders,
			$data->chargeback_orders,
			$data->completed_orders,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Total Orders',
			'Pending Orders',
			'Relocate Orders',
			'Escalation Orders',
			'Invoice Sent Orders',
			'Tracking Sent Orders',
			'Refund Pending From Yard Orders',
			'Refund Pending To Customer Orders',
			'Cancelled Orders',
			'PO Sent Orders',
			'Part Shipped Orders',
			'Chargeback Orders',
			'Completed Orders',
		];
	}
}
