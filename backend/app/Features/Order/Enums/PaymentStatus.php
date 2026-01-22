<?php

namespace App\Features\Order\Enums;

enum PaymentStatus: int
{
	case Pending = 0;
	case Paid = 1;
	case Partial = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Pending->value => 'Pending',
			self::Paid->value => 'Paid',
			self::Partial->value => 'Partial',
			null => null,
			default => null,
		};
	}
}