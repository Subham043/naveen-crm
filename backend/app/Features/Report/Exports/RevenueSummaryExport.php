<?php

namespace App\Features\Report\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class RevenueSummaryExport implements FromQuery, WithHeadings, WithMapping
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
			$data->total_revenue,
			$data->total_cost,
			$data->total_shipping,
			$data->total_tax,
			$data->total_profit,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Total Revenue',
			'Total Cost',
			'Total Shipping',
			'Total Tax',
			'Total Profit',
		];
	}
}
