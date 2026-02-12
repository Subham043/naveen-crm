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
            //customer info
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('country_code')->nullable();
            $table->text('billing_address')->nullable();
            //item part info
            $table->string('part_year')->nullable();
            $table->string('part_model')->nullable();
            $table->string('part_name')->nullable();
            $table->text('part_description')->nullable();
            //lead source
            $table->tinyInteger('lead_source')->nullable()->default(1);
            //agent
            $table->foreignId('sales_user_id')->nullable()->index();
            $table->boolean('is_created_by_agent')->default(0);
            $table->timestamp('assigned_at')->nullable();
            //payment status
            $table->tinyInteger('payment_status')->nullable()->default(0);
            //yard info
            $table->boolean('yard_located')->default(0);
            // 💰 Prices
            $table->decimal('total_price', 10, 2)->nullable();
            $table->decimal('cost_price', 10, 2)->nullable();
            $table->decimal('shipping_cost', 10, 2)->nullable();
            //logistic info
            $table->text('tracking_details')->nullable();
            $table->tinyInteger('invoice_status')->nullable()->default(0);
            $table->tinyInteger('shipment_status')->nullable()->default(1);
            //order status
            $table->tinyInteger('order_status')->nullable()->default(0);
            $table->foreignId('approval_by_id')->nullable()->index();
            $table->timestamp('approval_at')->nullable();
            //draft
            $table->boolean('is_active')->default(1);
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
