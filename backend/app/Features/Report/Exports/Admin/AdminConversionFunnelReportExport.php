<?php

namespace App\Features\Report\Exports\Admin;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminConversionFunnelReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->total_quotations,
			$data->approved_quotations,
			$data->rejected_quotations,
		];
	}

	public function headings(): array
	{
		return [
			'Period',
			'Total Quotations',
			'Approved Quotations',
			'Rejected Quotations',
		];
	}
}
