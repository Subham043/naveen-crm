<?php

namespace App\Features\Timeline\Models;

use App\Features\Quotation\Models\Quotation;
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
        'additional_comment',
        'properties',
        'quotation_id',
        'user_id',
    ];

    protected $attributes = [
        'comment' => null,
        'additional_comment' => null,
        'quotation_id' => null,
        'user_id' => null,
    ];

    protected $casts = [
        'properties' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function doneBy()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }

    public function quotation()
    {
        return $this->belongsTo(Quotation::class, 'quotation_id')->withDefault();
    }

}
