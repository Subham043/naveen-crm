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
use App\Features\Roles\Controllers\RoleAllController;
use App\Features\Roles\Enums\Roles;
use App\Features\SalesTeam\Controllers\SalesOrderCreateController;
use App\Features\Users\Controllers\UserCreateController;
use App\Features\Users\Controllers\UserDeleteController;
use App\Features\Users\Controllers\UserExportController;
use App\Features\Users\Controllers\UserPaginateController;
use App\Features\Users\Controllers\UserToggleStatusController;
use App\Features\Users\Controllers\UserToggleVerificationController;
use App\Features\Users\Controllers\UserUpdateController;
use App\Features\Users\Controllers\UserViewController;
use App\Features\SalesTeam\Controllers\SalesOrderExportController;
use App\Features\SalesTeam\Controllers\SalesOrderPaginateController;
use App\Features\SalesTeam\Controllers\SalesOrderSubmitForApprovalController;
use App\Features\SalesTeam\Controllers\SalesOrderUpdateController;
use App\Features\SalesTeam\Controllers\SalesOrderViewController;
use App\Http\Enums\Guards;
use App\Http\Enums\Throttle;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware([Throttle::API->middleware()])->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [LoginController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
        Route::post('/register', [RegisterController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
        Route::post('/forgot-password', [ForgotPasswordController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
        Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->middleware([Throttle::AUTH->middleware()])->whereAlphaNumeric('token')->name('password.reset');
        Route::post('/refresh', [RefreshTokenController::class, 'index']);
        Route::post('/logout', [LogoutController::class, 'index'])->middleware([Throttle::AUTH->middleware(), Guards::API->middleware()]);
    });

    Route::prefix('account')->group(function () {
        Route::get('/verify/{id}/{hash}', [ProfileVerifyController::class, 'index'])->middleware(['signed', Throttle::AUTH->middleware()])->whereNumber('id')->whereAlphaNumeric('hash')->name('verification.verify');
        Route::middleware([Guards::API->middleware()])->group(function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::post('/resend-verification', [ProfileResendVerificationController::class, 'index'])->middleware([Throttle::AUTH->middleware()])->name('verification.notice');
            Route::middleware(['verified', Throttle::AUTH->middleware()])->group(function () {
                Route::post('/update', [ProfileUpdateController::class, 'index']);
                Route::post('/password', [PasswordUpdateController::class, 'index']);
            });
        });
    });

    Route::middleware([Guards::API->middleware(), 'verified'])->group(function () {
        Route::middleware([Roles::SuperAdmin->middleware()])->group(function () {
            Route::get('/roles', [RoleAllController::class, 'index']);

            Route::prefix('users')->group(function () {
                Route::get('/excel', [UserExportController::class, 'index']);
                Route::get('/paginate', [UserPaginateController::class, 'index']);
                Route::post('/create', [UserCreateController::class, 'index']);
                Route::post('/update/{id}', [UserUpdateController::class, 'index']);
                Route::get('/status/{id}', [UserToggleStatusController::class, 'index']);
                Route::get('/verify/{id}', [UserToggleVerificationController::class, 'index']);
                Route::get('/view/{id}', [UserViewController::class, 'index']);
                Route::delete('/delete/{id}', [UserDeleteController::class, 'index']);
            });
        });
        Route::prefix('sales')->middleware([Roles::Sales->middleware()])->group(function () {
            Route::prefix('order')->group(function () {
                Route::get('/excel', [SalesOrderExportController::class, 'index']);
                Route::get('/paginate', [SalesOrderPaginateController::class, 'index']);
                Route::post('/create', [SalesOrderCreateController::class, 'index']);
                Route::post('/update/{id}', [SalesOrderUpdateController::class, 'index']);
                Route::get('/view/{id}', [SalesOrderViewController::class, 'index']);
                Route::get('/submit-for-approval/{id}', [SalesOrderSubmitForApprovalController::class, 'index']);
            });
        });
    });
});