<?php

namespace App\Features\Order\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Order\Services\OrderService;
use App\Features\Quotation\Enums\QuotationStatus;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderGenerateInvoiceController extends Controller
{
    public function __construct(private OrderService $orderService){}


    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $order = $this->orderService->getById($id);
        if($order->quotation->quotation_status != QuotationStatus::Approved->value()){
            return response()->json(["message" => "Order is not approved."], 400);
        }
        try {
            $fileName = "WAM{$order->id}";
            $data = [
                'order' => $order,
            ];
            $pdf = Pdf::setOption([
                // 'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
                'isPhpEnabled' => true, 
                'isRemoteEnabled' => true, 
            ])->setPaper('a4', 'potrait')->loadView('pdf.invoice', $data);
            return $pdf->download($fileName.'.pdf');
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
