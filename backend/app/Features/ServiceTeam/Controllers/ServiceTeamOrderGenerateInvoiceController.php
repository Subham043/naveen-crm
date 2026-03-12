<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;
use Barryvdh\DomPDF\Facade\Pdf;

class ServiceTeamOrderGenerateInvoiceController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService){}


    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $order = $this->serviceTeamOrderService->getById($id);
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
