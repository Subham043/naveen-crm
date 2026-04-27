<?php

namespace App\Features\Quotation\Models;

use App\Features\Order\Models\Order;
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

class Quotation extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'quotations';

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
        'shipping_address',
        'part_year',
        'part_model',
        'part_make',
        'part_name',
        'part_number',
        'part_description',
        'part_warranty',
        'part_vin',
        'lead_source',
        'sales_user_id',
        'is_created_by_agent',
        'assigned_at',
        'quotation_sent',
        'sale_price',
        'cost_price',
        'shipping_cost',
        'quotation_status',
        'approval_by_id',
        'approval_at',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
        'phone' => null,
        'country_code' => null,
        'billing_address' => null,
        'shipping_address' => null,
        'part_year' => null,
        'part_model' => null,
        'part_make' => null,
        'part_name' => null,
        'part_number' => null,
        'part_description' => null,
        'part_warranty' => null,
        'part_vin' => null,
        'lead_source' => 1,
        'sales_user_id' => null,
        'is_created_by_agent' => false,
        'quotation_sent' => false,
        'assigned_at' => null,
        'sale_price' => null,
        'cost_price' => null,
        'shipping_cost' => null,
        'quotation_status' => 0,
        'approval_by_id' => null,
        'approval_at' => null,
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'quotation_sent' => 'boolean',
        'is_created_by_agent' => 'boolean',
        'part_year' => 'integer',
        'part_warranty' => 'integer',
        'sale_price' => 'decimal:2',
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
            get: fn () => !($this->sale_price) ? 0.0 : round(($this->sale_price * 0.04), 2),
        );
    }

    public function grossProfit(): Attribute
    {
        return Attribute::make(
            get: fn () => !($this->cost_price || $this->shipping_cost || $this->sale_price) ? 0.0 : round(($this->sale_price - ($this->cost_price + $this->shipping_cost + $this->sales_tax)), 2),
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

    public function order()
    {
        return $this->hasOne(Order::class, 'quotation_id');
    }

    public function timelines()
    {
        return $this->hasMany(Timeline::class, 'quotation_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        $logName = "quotation_{$this->id}";
        $user = Auth::guard(Guards::API->value())->user();
        if($user){
            $logName .= "_user_{$user->id}";
        }
        return LogOptions::defaults()
        ->useLogName($logName)
        ->setDescriptionForEvent(
            function(string $eventName) use ($user) {
                $description = "Quotation with id {$this->id} was {$eventName} via Public Form";
                if($user){
                    $role = request()->user()->currentRole() ?? Roles::Sales->value();
                    $doneBy = "{$user->name} <{$user->email}> ({$role})";
                    $description = "Quotation with id {$this->id} was {$eventName} by {$doneBy}";
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
