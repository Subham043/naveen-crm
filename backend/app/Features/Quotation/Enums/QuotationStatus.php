<?php

namespace App\Features\Quotation\Enums;

enum QuotationStatus: int
{
	case Pending = 0;
	case Approved = 1;
	case Rejected = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Pending->value => 'Pending',
			self::Approved->value => 'Approved',
			self::Rejected->value => 'Rejected',
			null => null,
			default => null,
		};
	}
}