<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;
use App\Shared\Providers\ModuleServiceProvider;

return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
    ModuleServiceProvider::class,
];
