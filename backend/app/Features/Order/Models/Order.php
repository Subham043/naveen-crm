<?php

namespace App\Features\Order\Models;

use App\Features\Roles\Enums\Roles;
use App\Features\Timeline\Models\Timeline;
use App\Features\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class Order extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'country_code',
        'billing_address',
        'part_name',
        'part_description',
        'lead_source',
        'sales_user_id',
        'is_created_by_agent',
        'assigned_at',
        'payment_status',
        'yard_located',
        'total_price',
        'cost_price',
        'shipping_cost',
        'tracking_details',
        'invoice_status',
        'shipment_status',
        'order_status',
        'approval_by_id',
        'approval_at',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
        'phone' => null,
        'country_code' => null,
        'billing_address' => null,
        'part_name' => null,
        'part_description' => null,
        'lead_source' => 1,
        'sales_user_id' => null,
        'is_created_by_agent' => false,
        'assigned_at' => null,
        'payment_status' => 0,
        'yard_located' => false,
        'total_price' => null,
        'cost_price' => null,
        'shipping_cost' => null,
        'tracking_details' => null,
        'invoice_status' => 0,
        'shipment_status' => 1,
        'order_status' => 0,
        'approval_by_id' => null,
        'approval_at' => null,
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'yard_located' => 'boolean',
        'is_created_by_agent' => 'boolean',
        'total_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'assigned_at' => 'datetime',
        'approval_at' => 'datetime',
    ];

    protected $appends = ['sales_tax', 'gross_profit'];

    protected $recordEvents = ['created', 'updated', 'deleted'];

    public function salesTax(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->cost_price ? $this->cost_price * 0.04 : null,
        );
    }

    public function grossProfit(): Attribute
    {
        return Attribute::make(
            get: fn () => !($this->cost_price || $this->shipping_cost || $this->total_price) ? null : ($this->total_price - ($this->cost_price + $this->shipping_cost + $this->sales_tax)),
        );
    }

    public function salesUser()
    {
        return $this->belongsTo(User::class, 'sales_user_id')->withDefault();
    }

    public function approvalBy()
    {
        return $this->belongsTo(User::class, 'approval_by_id')->withDefault();
    }

    public function timelines()
    {
        return $this->hasMany(Timeline::class, 'order_id');
    }

    public function yards()
    {
        return $this->hasMany(Yard::class, 'order_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        $logName = "order_{$this->id}";
        $user = Auth::guard(Guards::API->value())->user();
        if($user){
            $logName .= "_user_{$user->id}";
        }
        return LogOptions::defaults()
        ->useLogName($logName)
        ->setDescriptionForEvent(
            function(string $eventName) use ($user) {
                $description = "Order with id {$this->id} was {$eventName} via Public Form";
                if($user){
                    $role = request()->user()->currentRole() ?? Roles::Sales->value();
                    $doneBy = "{$user->name} <{$user->email}> ({$role})";
                    $description = "Order with id {$this->id} was {$eventName} by {$doneBy}";
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
