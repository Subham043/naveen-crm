<?php

namespace App\Features\Roles\Enums;

enum Roles:string {
    case SuperAdmin = 'Super-Admin';
    case Sales = 'Sales-Team';
    case Service = 'Service-Team';

    public function value(): string
    {
        return $this->value;
    }

    public function middleware(): string
    {
        return 'role:'.$this->value;
    }

    //'role:Super-Admin|Sales-Team|Service-Team' || 'role:Super-Admin|Sales-Team' || 'role:Super-Admin|Service-Team' || 'role:Sales-Team|Service-Team' || 'role:Super-Admin' || 'role:Sales-Team' || 'role:Service-Team'
    public static function customMiddleware(Roles ...$roles): string
    {
        return 'role:'.implode('|', array_map(fn($role) => $role->value, $roles));
    }
}
