<?php

namespace App\Features\Order\Enums;

enum LeadSource: int
{
	case Website = 1;
	case Lead = 2;
	case Call = 3;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Website->value => 'Website',
			self::Lead->value => 'Lead',
			self::Call->value => 'Call',
			null => null,
			default => null,
		};
	}
}