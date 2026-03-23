<?php

namespace App\Features\Order\Models;

use App\Features\Quotation\Models\Quotation;
use App\Features\Roles\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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
        'payment_status',
        'payment_card_type',
        'payment_gateway',
        'transaction_id',
        'yard_located',
        'tracking_details',
        'tracking_status',
        'invoice_status',
        'po_status',
        'order_status',
        'quotation_id',
    ];

    protected $attributes = [
        'payment_status' => 0,
        'payment_card_type' => null,
        'payment_gateway' => null,
        'transaction_id' => null,
        'yard_located' => false,
        'tracking_details' => null,
        'tracking_status' => 0,
        'invoice_status' => 0,
        'po_status' => 1,
        'order_status' => 0,
        'quotation_id' => null,
    ];

    protected $casts = [
        'yard_located' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $recordEvents = ['created', 'updated', 'deleted'];

    public function yards()
    {
        return $this->hasMany(Yard::class, 'order_id');
    }

    public function quotation()
    {
        return $this->belongsTo(Quotation::class, 'quotation_id')->withDefault();
    }

    public function getActivitylogOptions(): LogOptions
    {
        $logName = "quotation_{$this->quotation_id}_order_{$this->id}";
        $user = Auth::guard(Guards::API->value())->user();
        if($user){
            $logName .= "_user_{$user->id}";
        }
        return LogOptions::defaults()
        ->useLogName($logName)
        ->setDescriptionForEvent(
            function(string $eventName) use ($user) {
                $description = "Order with id {$this->id} was {$eventName} because of Quotation with id {$this->quotation_id} was approved";
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
