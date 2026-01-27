<?php

namespace App\Features\Timeline\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class TimelineCollection extends JsonResource
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
			'done_by' => $this->user_id ? TimelineUserCollection::make($this->doneBy) : null,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
