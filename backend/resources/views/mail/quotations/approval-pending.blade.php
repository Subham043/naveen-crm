<x-mail::message>

# Hi Admin,

Quotation #{{ $quotationId }} has been submitted for approval by {{ $userName }}.

<x-mail::button :url="config('app.client_url') . '/quotations/' . $quotationId">
View Quotation
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
