<?php

namespace App\Features\Quotation\Enums;

enum LeadSource: int
{
	case Website = 1;
	case Call = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Website->value => 'Website',
			self::Call->value => 'Call',
			null => null,
			default => null,
		};
	}
}