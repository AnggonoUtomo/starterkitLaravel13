<?php

namespace App\Modules\Console\UserManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Console/UserManagement/Index', [
            'title' => 'UserManagement Management',
        ]);
    }
}
