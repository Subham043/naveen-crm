<?php

use App\Features\Account\Controllers\PasswordUpdateController;
use App\Features\Account\Controllers\ProfileController;
use App\Features\Account\Controllers\ProfileResendVerificationController;
use App\Features\Account\Controllers\ProfileUpdateController;
use App\Features\Account\Controllers\ProfileVerifyController;
use App\Features\Authentication\Controllers\ForgotPasswordController;
use App\Features\Authentication\Controllers\LoginController;
use App\Features\Authentication\Controllers\LogoutController;
use App\Features\Authentication\Controllers\RefreshTokenController;
use App\Features\Authentication\Controllers\RegisterController;
use App\Features\Authentication\Controllers\ResetPasswordController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware(['throttle:api'])->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [LoginController::class, 'index'])->middleware(['throttle:auth']);
        Route::post('/register', [RegisterController::class, 'index'])->middleware(['throttle:auth']);
        Route::post('/forgot-password', [ForgotPasswordController::class, 'index'])->middleware(['throttle:auth']);
        Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->middleware(['throttle:auth'])->whereAlphaNumeric('token')->name('password.reset');
        Route::post('/refresh', [RefreshTokenController::class, 'index']);
        Route::post('/logout', [LogoutController::class, 'index'])->middleware(['throttle:auth', 'auth:api']);
    });

    Route::prefix('account')->group(function () {
        Route::get('/verify/{id}/{hash}', [ProfileVerifyController::class, 'index'])->middleware(['signed', 'throttle:auth'])->whereNumber('id')->whereAlphaNumeric('hash')->name('verification.verify');
        Route::middleware(['auth:api'])->group(function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::post('/resend-verification', [ProfileResendVerificationController::class, 'index'])->middleware(['throttle:auth'])->name('verification.notice');
            Route::middleware(['verified', 'throttle:auth'])->group(function () {
                Route::post('/update', [ProfileUpdateController::class, 'index']);
                Route::post('/password', [PasswordUpdateController::class, 'index']);
            });
        });
    });
});