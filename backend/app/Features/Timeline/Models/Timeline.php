<?php

namespace App\Features\Timeline\Models;

use App\Features\Order\Models\Order;
use App\Features\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;

    protected $table = 'timelines';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'message',
        'comment',
        'properties',
        'order_id',
        'user_id',
    ];

    protected $attributes = [
        'comment' => null,
        'order_id' => null,
        'user_id' => null,
        'properties' => '[]',
    ];

    protected $casts = [
        'properties' => 'collection',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function doneBy()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id')->withDefault();
    }

}
