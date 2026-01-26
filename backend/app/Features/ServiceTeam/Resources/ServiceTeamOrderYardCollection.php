<?php

namespace App\Features\ServiceTeam\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class ServiceTeamOrderYardCollection extends JsonResource
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
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
