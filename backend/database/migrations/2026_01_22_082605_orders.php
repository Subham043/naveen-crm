<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            //payment status
            $table->tinyInteger('payment_status')->nullable()->default(0);
            $table->tinyInteger('payment_card_type')->nullable()->default(null);
            $table->tinyInteger('payment_gateway')->nullable()->default(null);
            $table->string('transaction_id')->nullable();
            //yard info
            $table->boolean('yard_located')->default(0);
            //logistic info
            $table->text('tracking_details')->nullable();
            $table->tinyInteger('tracking_status')->nullable()->default(0);
            $table->tinyInteger('invoice_status')->nullable()->default(0);
            $table->tinyInteger('po_status')->nullable()->default(1);
            //order status
            $table->tinyInteger('order_status')->nullable()->default(0);
            $table->foreignId('quotation_id')->unique()->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
