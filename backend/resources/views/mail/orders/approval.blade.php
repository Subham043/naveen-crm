<x-mail::message>

# Hi {{ $userName }},

Order #{{ $orderId }} has been {{ $approval }} by Admin.

<x-mail::button :url="config('app.client_url') . '/sales/orders/' . $orderId">
View Order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
