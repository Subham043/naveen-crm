<?php

namespace App\Features\Quotation\Requests;

use App\Features\Quotation\Enums\QuotationStatus;
use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;

class QuotationApprovalRequests extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::guard(Guards::API->value())->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'quotation_status' => ['required', 'numeric', new Enum(QuotationStatus::class), Rule::notIn([QuotationStatus::Pending->value])],
        ];
    }

}
