<?php

namespace App\Features\Order\Enums;

enum PaymentGateway: int
{
	case Stripe = 1;
	case Boa = 2;
	case Zelle = 3;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Stripe->value => 'Stripe',
			self::Boa->value => 'Boa',
			self::Zelle->value => 'Zelle',
			null => null,
			default => null,
		};
	}
}