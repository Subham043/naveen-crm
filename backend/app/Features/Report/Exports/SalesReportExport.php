<?php

namespace App\Features\Report\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class SalesReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->date,
			$data->total_orders,
			$data->total_sales,
			$data->total_tax,
			$data->total_profit,
		];
	}

	public function headings(): array
	{
		return [
			'Date',
			'Total Orders',
			'Total Sales',
			'Total Tax',
			'Total Profit',
		];
	}
}
