<?php

namespace App\Features\Report\Exports\Admin;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminApprovalTurnAroundReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->salesUser->name,
			$data->salesUser->email,
			$data->salesUser->phone,
			$data->avg_approval_hours,
		];
	}

	public function headings(): array
	{
		return [
			'Sales User Name',
			'Sales User Email',
			'Sales User Phone',
			'Avg Approval Hours',
		];
	}
}
