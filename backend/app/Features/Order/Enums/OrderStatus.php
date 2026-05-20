<?php

namespace App\Features\Order\Enums;

enum OrderStatus: int
{
	case Pending = 0;
	case Relocate = 1;
	case Escalation = 2;
	case InvoiceSent = 3;
	case TrackingSent = 4;
    case RefundPendingFromYard = 5;
    case RefundPendingToCustomer = 6;
	case Cancelled = 7;
    case POSent = 8;
	case PartShipped = 9;
	case ChargeBack = 10;
	case Completed = 11;
    
    public function value(): int
    {
        return $this->value;
    }

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Pending->value => 'Pending',
			self::Relocate->value => 'Relocate',
			self::Escalation->value => 'Escalation',
			self::InvoiceSent->value => 'Invoice Sent',
			self::TrackingSent->value => 'Tracking Sent',
			self::RefundPendingFromYard->value => 'Refund Pending From Yard',
			self::RefundPendingToCustomer->value => 'Refund Pending To Customer',
			self::Cancelled->value => 'Cancelled',
			self::POSent->value => 'PO Sent',
			self::PartShipped->value => 'Part Shipped',
			self::ChargeBack->value => 'ChargeBack',
			self::Completed->value => 'Completed',
			null => null,
			default => null,
		};
	}
}