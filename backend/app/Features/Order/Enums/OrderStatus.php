<?php

namespace App\Features\Order\Enums;

enum OrderStatus: int
{
	case Escalation = 0;
	case Cancelled = 1;
	case RelocatePoSent = 2;
    case PendingForRefund = 3;
    case Refunded = 4;
	case PendingPartShipped = 5;
	case Completed = 6;
	case ChargeBack = 7;
	case YardRelocate = 8;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
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