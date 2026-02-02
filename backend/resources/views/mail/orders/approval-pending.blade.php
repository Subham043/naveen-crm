<x-mail::message>

# Hi Admin,

Order #{{ $orderId }} has been submitted for approval by {{ $userName }}.

<x-mail::button :url="config('app.client_url') . '/orders/' . $orderId">
View Order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
