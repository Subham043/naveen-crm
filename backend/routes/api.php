<?php

use App\Features\Account\Controllers\PasswordUpdateController;
use App\Features\Account\Controllers\ProfileController;
use App\Features\Account\Controllers\ProfileResendVerificationController;
use App\Features\Account\Controllers\ProfileUpdateController;
use App\Features\Account\Controllers\ProfileVerifyController;
use App\Features\Account\Controllers\LogoutController;
use App\Features\Account\Controllers\RefreshTokenController;
use App\Features\ActivityLogs\Controllers\ActivityLogExportController;
use App\Features\ActivityLogs\Controllers\ActivityLogPaginateController;
use App\Features\ActivityLogs\Controllers\ActivityLogViewController;
use App\Features\Authentication\Controllers\ForgotPasswordController;
use App\Features\Authentication\Controllers\LoginController;
use App\Features\Authentication\Controllers\RegisterController;
use App\Features\Authentication\Controllers\ResetPasswordController;
use App\Features\Dashboard\Controllers\DashboardController;
use App\Features\Quotation\Controllers\QuotationApprovalController;
use App\Features\Order\Controllers\OrderExportController;
use App\Features\Order\Controllers\OrderPaginateController;
use App\Features\Order\Controllers\OrderUpdateController;
use App\Features\Quotation\Controllers\QuotationPublicCreateController;
use App\Features\Order\Controllers\OrderViewController;
use App\Features\Quotation\Controllers\QuotationExportController;
use App\Features\Quotation\Controllers\QuotationPaginateController;
use App\Features\Quotation\Controllers\QuotationUpdateController;
use App\Features\Quotation\Controllers\QuotationViewController;
use App\Features\Report\Controllers\AgentPerformanceReportExportController;
use App\Features\Report\Controllers\AgentPerformanceReportPaginateController;
use App\Features\Report\Controllers\RevenueSummaryExportController;
use App\Features\Report\Controllers\RevenueSummaryPaginateController;
use App\Features\Report\Controllers\SalesReportExportController;
use App\Features\Report\Controllers\SalesReportPaginateController;
use App\Features\Roles\Controllers\RoleAllController;
use App\Features\Roles\Enums\Roles;
use App\Features\SalesTeam\Controllers\SalesQuotationCreateController;
use App\Features\Users\Controllers\UserCreateController;
use App\Features\Users\Controllers\UserDeleteController;
use App\Features\Users\Controllers\UserExportController;
use App\Features\Users\Controllers\UserPaginateController;
use App\Features\Users\Controllers\UserToggleStatusController;
use App\Features\Users\Controllers\UserToggleVerificationController;
use App\Features\Users\Controllers\UserUpdateController;
use App\Features\Users\Controllers\UserViewController;
use App\Features\SalesTeam\Controllers\SalesQuotationExportController;
use App\Features\SalesTeam\Controllers\SalesQuotationPaginateController;
use App\Features\SalesTeam\Controllers\SalesQuotationSubmitForApprovalController;
use App\Features\SalesTeam\Controllers\SalesQuotationUpdateController;
use App\Features\SalesTeam\Controllers\SalesQuotationViewController;
use App\Features\ServiceTeam\Controllers\ServiceTeamOrderExportController;
use App\Features\ServiceTeam\Controllers\ServiceTeamOrderPaginateController;
use App\Features\ServiceTeam\Controllers\ServiceTeamOrderUpdateController;
use App\Features\ServiceTeam\Controllers\ServiceTeamOrderViewController;
use App\Features\Timeline\Controllers\TimelinePaginateController;
use App\Http\Enums\Guards;
use App\Http\Enums\Throttle;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware([Throttle::API->middleware()])->group(function () {
    //Auth Routes
    Route::prefix('auth')->group(function () {
        Route::post('/login', [LoginController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
        Route::post('/register', [RegisterController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
        Route::post('/forgot-password', [ForgotPasswordController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
        Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->middleware([Throttle::AUTH->middleware()])->whereAlphaNumeric('token')->name('password.reset');
    });

    //Account Routes
    Route::prefix('account')->group(function () {
        Route::post('/refresh', [RefreshTokenController::class, 'index']);
        Route::get('/verify/{id}/{hash}', [ProfileVerifyController::class, 'index'])->middleware(['signed', Throttle::AUTH->middleware()])->whereNumber('id')->whereAlphaNumeric('hash')->name('verification.verify');
        Route::middleware([Guards::API->middleware()])->group(function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::post('/logout', [LogoutController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);
            Route::post('/resend-verification', [ProfileResendVerificationController::class, 'index'])->middleware([Throttle::AUTH->middleware()])->name('verification.notice');
            Route::middleware(['verified', Throttle::AUTH->middleware()])->group(function () {
                Route::post('/update', [ProfileUpdateController::class, 'index']);
                Route::post('/password', [PasswordUpdateController::class, 'index']);
            });
        });
    });

    Route::post('/quotation/public/create', [QuotationPublicCreateController::class, 'index'])->middleware([Throttle::AUTH->middleware()]);

    Route::middleware([Guards::API->middleware(), 'verified'])->group(function () {
        //Admin Routes
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
            Route::prefix('quotation')->group(function () {
                Route::get('/excel', [QuotationExportController::class, 'index']);
                Route::get('/paginate', [QuotationPaginateController::class, 'index']);
                Route::get('/view/{id}', [QuotationViewController::class, 'index']);
                Route::post('/update/{id}', [QuotationUpdateController::class, 'index']);
                Route::post('/approval/{id}', [QuotationApprovalController::class, 'index']);
            });
            Route::prefix('order')->group(function () {
                Route::get('/excel', [OrderExportController::class, 'index']);
                Route::get('/paginate', [OrderPaginateController::class, 'index']);
                Route::get('/view/{id}', [OrderViewController::class, 'index']);
                Route::post('/update/{id}', [OrderUpdateController::class, 'index']);
            });
            Route::prefix('report')->group(function () {
                Route::prefix('sales')->group(function () {
                    Route::get('/excel', [SalesReportExportController::class, 'index']);
                    Route::get('/paginate', [SalesReportPaginateController::class, 'index']);
                });
                Route::prefix('agent-performance')->group(function () {
                    Route::get('/excel', [AgentPerformanceReportExportController::class, 'index']);
                    Route::get('/paginate', [AgentPerformanceReportPaginateController::class, 'index']);
                });
                Route::prefix('revenue-summary')->group(function () {
                    Route::get('/excel', [RevenueSummaryExportController::class, 'index']);
                    Route::get('/paginate', [RevenueSummaryPaginateController::class, 'index']);
                });
            });
        });

        //Admin || Service Team || Sales Team Routes
        Route::middleware([Roles::customMiddleware(Roles::SuperAdmin, Roles::Service, Roles::Sales)])->group(function () {
            Route::get('/dashboard', [DashboardController::class, 'index']);
            Route::prefix('activity-log')->group(function () {
                Route::get('/excel', [ActivityLogExportController::class, 'index']);
                Route::get('/paginate', [ActivityLogPaginateController::class, 'index']);
                Route::get('/view/{id}', [ActivityLogViewController::class, 'index']);
            });
            Route::prefix('quotation')->group(function () {
                Route::get('/timeline/{quotation_id}', [TimelinePaginateController::class, 'index']);
            });
        });

        //Service Team Routes
        Route::prefix('service-team')->middleware([Roles::Service->middleware()])->group(function () {
            Route::prefix('order')->group(function () {
                Route::get('/excel', [ServiceTeamOrderExportController::class, 'index']);
                Route::get('/paginate', [ServiceTeamOrderPaginateController::class, 'index']);
                Route::post('/update/{id}', [ServiceTeamOrderUpdateController::class, 'index']);
                Route::get('/view/{id}', [ServiceTeamOrderViewController::class, 'index']);
            });
        });

        //Sales Routes
        Route::prefix('sales')->middleware([Roles::Sales->middleware()])->group(function () {
            Route::prefix('quotation')->group(function () {
                Route::get('/excel', [SalesQuotationExportController::class, 'index']);
                Route::get('/paginate', [SalesQuotationPaginateController::class, 'index']);
                Route::post('/create', [SalesQuotationCreateController::class, 'index']);
                Route::post('/update/{id}', [SalesQuotationUpdateController::class, 'index']);
                Route::get('/view/{id}', [SalesQuotationViewController::class, 'index']);
                Route::get('/submit-for-approval/{id}', [SalesQuotationSubmitForApprovalController::class, 'index']);
            });
        });
    });
});