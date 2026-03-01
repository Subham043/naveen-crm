<?php

namespace App\Features\Order\Enums;

enum PaymentCardType: int
{
	case Mastercard = 1;
	case Visa = 2;
	case Amex = 3;
	case Zelle = 4;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Mastercard->value => 'Mastercard',
			self::Visa->value => 'Visa',
			self::Amex->value => 'Amex',
			self::Zelle->value => 'Zelle',
			null => null,
			default => null,
		};
	}
}