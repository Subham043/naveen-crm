<?php

namespace App\Features\Order\Enums;

enum TrackingStatus: int
{
	case Pending = 0;
	case Sent = 1;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Pending->value => 'Pending',
			self::Sent->value => 'Sent',
			null => null,
			default => null,
		};
	}
}