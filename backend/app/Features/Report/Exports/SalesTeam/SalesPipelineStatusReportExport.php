<?php

namespace App\Features\Report\Exports\SalesTeam;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class SalesPipelineStatusReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->quotation_status,
			$data->total_sales,
			$data->total_revenue,
		];
	}

	public function headings(): array
	{
		return [
			'Quotation Status',
			'Total Sales',
			'Total Revenue',
		];
	}
}
