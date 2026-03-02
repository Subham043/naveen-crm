<?php

namespace App\Features\Order\Enums;

enum ShipmentStatus: int
{
	case POPending = 1;
	case POSent = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::POPending->value => 'PO Pending',
			self::POSent->value => 'PO Sent',
			null => null,
			default => null,
		};
	}
}