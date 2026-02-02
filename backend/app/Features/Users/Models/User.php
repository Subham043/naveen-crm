<?php

namespace App\Features\Users\Models;

use App\Features\Authentication\Notifications\ResetPasswordNotification;
use App\Features\Authentication\Notifications\VerifyEmailNotification;
use App\Features\Authentication\Services\AuthCache;
use App\Features\Order\Models\Order;
use App\Features\Timeline\Models\Timeline;
use App\Features\Order\Models\Yard;
use App\Features\Roles\Enums\Roles;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Features\Roles\Interfaces\RoleTraitInterface;
use App\Features\Roles\Traits\RoleTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Database\Factories\UserFactory;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class User extends Authenticatable implements MustVerifyEmail, RoleTraitInterface, JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, RoleTrait, LogsActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'is_blocked',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // protected $appends = ['current_role'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_blocked' => 'boolean',
        ];
    }

    protected $recordEvents = ['created', 'updated', 'deleted'];

    /**
     * User Factory.
     *
     */
    protected static function newFactory(): Factory
    {
        return UserFactory::new();
    }

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    protected static function booted()
    {
        static::updated(function ($user) {
            AuthCache::forget($user->id);
        });

        static::deleted(function ($user) {
            AuthCache::forget($user->id);
        });

        static::saved(function ($user) {
            AuthCache::forget($user->id);
        });
    }

    public function orders_assigned()
    {
        return $this->hasMany(Order::class, 'sales_user_id');
    }

    public function orders_approved()
    {
        return $this->hasMany(Order::class, 'approval_by_id');
    }

    public function timelines()
    {
        return $this->hasMany(Timeline::class, 'user_id');
    }

    public function yards()
    {
        return $this->hasMany(Yard::class, 'service_team_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        $logName = "user_{$this->id}";
        $user = Auth::guard(Guards::API->value())->user();
        return LogOptions::defaults()
        ->useLogName($logName)
        ->setDescriptionForEvent(
            function(string $eventName) use ($user){
                $description = "User with id {$this->id} was {$eventName}";
                if($user){
                    $role = request()->user()->currentRole() ?? Roles::SuperAdmin->value();
                    $doneBy = "{$user->name} <{$user->email}> ({$role})";
                    $description = "User with id {$this->id} was {$eventName} by {$doneBy}";
                }
                return $description;
            }
        )
        ->logFillable()
        ->logExcept(['remember_token', 'password', 'updated_at', 'created_at'])
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
    }
}
