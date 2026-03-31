<?php

namespace App\Features\Quotation\Requests;

use App\Http\Requests\InputRequest;

class QuotationWebhookCreateRequests extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $signature = $this->header('X-Signature');
        $contentType = $this->header('Content-Type');
        $acceptType = $this->header('Accept');
        if (!$signature) {
            return false;
        }
        if (!$contentType || $contentType !== 'application/json') {
            return false;
        }
        if (!$acceptType || $acceptType !== 'application/json') {
            return false;
        }
        $secret = config('services.webhook.secret');
        $payload = json_encode(
            json_decode(request()->getContent(), true),
            JSON_UNESCAPED_SLASHES
        );
        $computedSignature = hash_hmac('sha256', $payload, $secret);

        return hash_equals($computedSignature, $signature);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email:rfc,dns|max:255',
            'phone' => ['required', 'numeric'],
            'country_code' => ['required', 'string', 'max:255'],
            'part_year' => ['required', 'numeric', 'min:1900', 'max:2100'],
            'part_model' => ['required', 'string', 'max:255'],
            'part_make' => ['required', 'string', 'max:255'],
            'part_name' => ['required', 'string', 'max:255'],
            'part_description' => ['required', 'string'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'part_name' => 'part',
            'part_description' => 'description',
            'part_year' => 'year',
            'part_make' => 'make',
            'part_model' => 'model',
        ];
    }

}
