<?php

namespace App\Features\Report\Exports\SalesTeam;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class SalesPerformanceReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->total_leads,
			$data->converted_leads,
			$data->conversion_rate,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Total Leads',
			'Converted Leads',
			'Conversion Rate',
		];
	}
}
