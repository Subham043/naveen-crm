<?php

namespace App\Features\Order\Enums;

enum YardLocated: int
{
	case No = 0;
	case Located = 1;
	case Relocate = 2;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::No->value => 'No',
			self::Located->value => 'Located',
			self::Relocate->value => 'Relocate',
			null => null,
			default => null,
		};
	}
}