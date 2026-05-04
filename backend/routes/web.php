<?php

use App\Features\Quotation\Controllers\QuotationWebhookCreateController;
use Illuminate\Support\Facades\Route;

Route::post('/quotation/webhook/create', [QuotationWebhookCreateController::class, 'index']);
