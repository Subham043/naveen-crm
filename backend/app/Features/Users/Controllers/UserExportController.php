<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Users\Exports\UserExport;
use App\Features\Users\Services\UserService;
use Maatwebsite\Excel\Facades\Excel;

class UserExportController extends Controller
{
    public function __construct(private UserService $userService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new UserExport($this->userService->query()), 'users.xlsx');
    }
}
