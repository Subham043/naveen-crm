<?php

namespace App\Features\Report\Exports\Admin;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminServicePerformanceReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->doneBy->name,
			$data->doneBy->email,
			$data->doneBy->phone,
			$data->total_comments,
			$data->orders_handled,
			$data->performance_percentage,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Service User Name',
			'Service User Email',
			'Service User Phone',
			'Total Comments',
			'Orders Handled',
			'Performance Percentage',
		];
	}
}
