<?php

namespace App\Features\Order\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class OrderTimelineCollection extends JsonResource
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
			'message' => $this->message,
			'comment' => $this->comment,
			'properties' => $this->properties,
			'user_id' => $this->user_id,
			'done_by' => $this->user_id ? OrderUserCollection::make($this->doneBy) : null,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
