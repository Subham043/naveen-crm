<?php

use App\Features\Order\Controllers\OrderWebhookCreateController;
use Illuminate\Support\Facades\Route;

Route::post('/order/webhook/create', [OrderWebhookCreateController::class, 'index']);
