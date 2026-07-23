<?php

namespace App\Modules\Console\AccessControl\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AccessControlController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Console/AccessControl/Index', [
            'title' => 'AccessControl Management',
        ]);
    }
}
