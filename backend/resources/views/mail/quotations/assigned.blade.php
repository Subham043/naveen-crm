<x-mail::message>

# Hi {{ $userName }},

Quotation #{{ $quotationId }} has been assigned to you.

<x-mail::button :url="config('app.client_url') . '/sales/quotations/' . $quotationId">
View Quotation
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
