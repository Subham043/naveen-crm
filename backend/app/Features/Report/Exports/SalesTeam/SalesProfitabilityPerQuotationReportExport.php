<?php

namespace App\Features\Report\Exports\SalesTeam;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class SalesProfitabilityPerQuotationReportExport implements FromQuery, WithHeadings, WithMapping
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
			$data->id,
			$data->sale_price,
			$data->cost_price,
			$data->shipping_cost,
			$data->tax,
			$data->gross_profit,
		];
	}

	public function headings(): array
	{
		return [
			'Quotation ID',
			'Sale Price',
			'Cost Price',
			'Shipping Cost',
			'Tax',
			'Gross Profit',
		];
	}
}
