<?php

namespace App\Features\Order\Enums;

enum ShipmentStatus: int
{
	case POPending = 1;
	case PoSent = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::POPending->value => 'PO Pending',
			self::PoSent->value => 'PO Sent',
			null => null,
			default => null,
		};
	}
}