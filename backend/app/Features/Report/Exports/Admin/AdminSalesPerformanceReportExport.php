<?php

namespace App\Features\Report\Exports\Admin;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminSalesPerformanceReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->salesUser->name,
			$data->salesUser->email,
			$data->salesUser->phone,
			$data->total_leads,
			$data->converted_leads,
			$data->total_revenue,
			$data->total_profit,
			$data->conversion_rate,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Sales User Name',
			'Sales User Email',
			'Sales User Phone',
			'Total Leads',
			'Converted Leads',
			'Total Revenue',
			'Total Profit',
			'Conversion Rate',
		];
	}
}
