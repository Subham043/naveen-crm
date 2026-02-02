<?php

namespace App\Features\Order\Models;

use App\Features\Roles\Enums\Roles;
use App\Features\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class Yard extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'yards';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'yard',
        'order_id',
        'service_team_id',
    ];

    protected $attributes = [
        'order_id' => null,
        'service_team_id' => null,
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $recordEvents = ['created', 'updated', 'deleted'];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'service_team_id')->withDefault();
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id')->withDefault();
    }

    public function getActivitylogOptions(): LogOptions
    {
        $logName = "order_{$this->order_id}_yard_{$this->id}";
        $user = Auth::guard(Guards::API->value())->user();
        if($user){
            $logName .= "_user_{$user->id}";
        }
        return LogOptions::defaults()
        ->useLogName($logName)
        ->setDescriptionForEvent(
            function(string $eventName) use ($user){
                $description = "Order with id {$this->order_id} & Yard with id {$this->id} was {$eventName}";
                if($user){
                    $role = request()->user()->currentRole() ?? Roles::Service->value();
                    $doneBy = "{$user->name} <{$user->email}> ({$role})";
                    $description = "Order with id {$this->order_id} & Yard with id {$this->id} was {$eventName} by {$doneBy}";
                }
                return $description;
            }
        )
        ->logFillable()
        ->logExcept(['updated_at', 'created_at'])
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
    }

}
