<?php

namespace App\Features\Order\Requests;

use App\Http\Requests\InputRequest;

class OrderPublicCreateRequests extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
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
            'part_name' => ['required', 'string', 'max:255'],
            'part_description' => ['required', 'string'],
            'captcha' => 'required|captcha'
        ];
    }

}
