<?php

namespace App\Features\Order\Enums;

enum YardLocated: int
{
	case No = 0;
	case Yes = 1;

    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::No->value => 'No',
			self::Yes->value => 'Yes',
			null => null,
			default => null,
		};
	}
}