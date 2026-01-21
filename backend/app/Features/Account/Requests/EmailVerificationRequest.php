<?php

namespace App\Features\Account\Requests;

use App\Features\Authentication\Services\AuthCache;
use App\Features\Users\Models\User;
use App\Http\Requests\InputRequest;
use Illuminate\Auth\Events\Verified;
use Illuminate\Validation\Validator;

class EmailVerificationRequest extends InputRequest
{
    private \App\Features\Users\Models\User|null $userToVerify = null;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $user = User::with('roles')->find($this->route('id'));

        if (! $user) {
            return false;
        }

        if (! hash_equals(sha1($user->getEmailForVerification()), (string) $this->route('hash'))) {
            return false;
        }

        // Store found user for reuse
        $this->userToVerify = $user;

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
            //
        ];
    }

    /**
     * Fulfill the email verification request.
     *
     * @return void
     */
    public function fulfill(): bool
    {
        if($this->userToVerify){
            $user = $this->userToVerify;
        }else{
            $user = User::with('roles')->find($this->route('id'));
            $this->userToVerify = $user;
        }
        
        $is_verified = false;

        if (! $user) {
            abort(404);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            $is_verified = true;

            event(new Verified($user));
        }

        AuthCache::forget($user->id);

        return $is_verified;
    }
    
    public function userInfo()
    {
        return $this->userToVerify;
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return \Illuminate\Validation\Validator
     */
    public function withValidator(Validator $validator)
    {
        return $validator;
    }
}
