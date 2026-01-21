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
}
