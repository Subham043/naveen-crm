<?php

namespace App\Features\ServiceTeam\Resources;

use App\Features\Order\Resources\OrderCollection;
use App\Features\ServiceTeam\Resources\ServiceTeamOrderCommentCollection;


class ServiceTeamOrderCollection extends OrderCollection
{
    /**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		$parentArray = parent::toArray($request);
		return array_merge($parentArray, [
            'comments' => ServiceTeamOrderCommentCollection::collection($this->comments),
		]);
	}
}
