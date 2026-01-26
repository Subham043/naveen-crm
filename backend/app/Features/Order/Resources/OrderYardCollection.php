<?php

namespace App\Features\Order\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class OrderYardCollection extends JsonResource
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		return [
			'id' => $this->id,
			'yard' => $this->yard,
			'order_id' => $this->order_id,
			'service_team_id' => $this->service_team_id,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
