<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use App\Models\Area;
use App\Models\Rol;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'empleados' => Empleado::count(),
            'areas' => Area::count(),
            'roles' => Rol::count(),
        ];

        $empleadosPorArea = Area::withCount('empleados')->get()->map(function ($area) {
            return [
                'name' => $area->nombre,
                'value' => $area->empleados_count,
            ];
        });

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'empleadosPorArea' => $empleadosPorArea,
        ]);
    }
}
