<?php

namespace App\Features\Order\Enums;

enum ShipmentStatus: int
{
	case Processing = 1;
	case Shipped = 2;
	case Delivered = 3;
	case Closed = 4;
	case Cancelled = 5;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Processing->value => 'Processing',
			self::Shipped->value => 'Shipped',
			self::Delivered->value => 'Delivered',
			self::Closed->value => 'Closed',
			self::Cancelled->value => 'Cancelled',
			null => null,
			default => null,
		};
	}
}