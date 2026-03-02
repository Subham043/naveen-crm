<?php

namespace App\Features\Order\Enums;

enum OrderStatus: int
{
	case Pending = 0;
	case Escalation = 1;
	case Cancelled = 2;
	case RelocatePoSent = 3;
    case PendingForRefund = 4;
    case Refunded = 5;
	case PendingPartShipped = 6;
	case Completed = 7;
	case ChargeBack = 8;
	case YardRelocate = 9;
    
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
			self::RelocatePoSent->value => 'Relocate Po Sent',
			self::PendingForRefund->value => 'Pending For Refund',
			self::Refunded->value => 'Refunded',
			self::PendingPartShipped->value => 'Pending Part Shipped',
			self::Completed->value => 'Completed',
			self::ChargeBack->value => 'ChargeBack',
			self::YardRelocate->value => 'Yard Relocate',
			null => null,
			default => null,
		};
	}
}