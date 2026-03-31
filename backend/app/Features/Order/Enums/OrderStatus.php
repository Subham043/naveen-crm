<?php

namespace App\Features\Order\Enums;

enum OrderStatus: int
{
	case Pending = 0;
	case Escalation = 1;
	case Cancelled = 2;
    case PendingForRefund = 3;
    case Refunded = 4;
	case PartShipped = 5;
	case Completed = 6;
	case ChargeBack = 7;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Pending->value => 'Pending',
			self::Escalation->value => 'Escalation',
			self::Cancelled->value => 'Cancelled',
			self::PendingForRefund->value => 'Pending For Refund',
			self::Refunded->value => 'Refunded',
			self::PartShipped->value => 'Part Shipped',
			self::Completed->value => 'Completed',
			self::ChargeBack->value => 'ChargeBack',
			null => null,
			default => null,
		};
	}
}