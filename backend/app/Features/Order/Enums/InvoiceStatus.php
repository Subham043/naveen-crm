<?php

namespace App\Features\Order\Enums;

enum InvoiceStatus: int
{
	case NotGenerated = 0;
	case Generated = 1;
	case Sent = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::NotGenerated->value => 'NotGenerated',
			self::Generated->value => 'Generated',
			self::Sent->value => 'Sent',
			null => null,
			default => null,
		};
	}
}