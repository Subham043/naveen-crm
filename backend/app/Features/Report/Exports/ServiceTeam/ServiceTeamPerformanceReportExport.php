<?php

namespace App\Features\Report\Exports\ServiceTeam;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class ServiceTeamPerformanceReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->total_comments,
			$data->orders_handled,
			$data->performance_score,
			$data->avg_comments_per_order,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Total Comments',
			'Orders Handled',
			'Performance Score',
			'Average Comments Per Order',
		];
	}
}
