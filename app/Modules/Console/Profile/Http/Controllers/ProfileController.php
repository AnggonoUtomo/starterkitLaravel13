<?php

namespace App\Modules\Console\Profile\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Console/Profile/Index', [
            'title' => 'Profile & Account Security',
            'mustVerifyEmail' => false,
            'status' => session('status'),
        ]);
    }
}
