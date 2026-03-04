<?php

namespace App\Features\Report\Exports\Admin;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminOrderPaymentReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->paid_orders,
			$data->partial_paid_orders,
			$data->unpaid_orders,
			$data->payment_success_rate,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Total Orders',
			'Paid Orders',
			'Partial Paid Orders',
			'Unpaid Orders',
			'Payment Success Rate',
		];
	}
}
