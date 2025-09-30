<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Area;
use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmpleadoController extends Controller
{
    public function index(Request $request)
    {
        $query = Empleado::with(['area', 'roles']);

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('nombre', 'like', "%{$searchTerm}%")
                  ->orWhere('email', 'like', "%{$searchTerm}%")
                  ->orWhereHas('area', function($areaQuery) use ($searchTerm) {
                      $areaQuery->where('nombre', 'like', "%{$searchTerm}%");
                  });
            });
        }

        $empleados = $query->get();

        return Inertia::render('Empleados/Index', [
            'empleados' => $empleados,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Empleados/Create', [
            'areas' => Area::all(),
            'roles' => Rol::all(),
        ]);
    }

    public function store(Request $request)
    {
        $messages = [
            'nombre.required' => 'El nombre completo es requerido.',
            'email.required' => 'El correo electrónico es requerido.',
            'email.email' => 'El correo electrónico no es válido.',
            'email.unique' => 'Este correo electrónico ya está en uso.',
            'sexo.required' => 'Debe seleccionar un sexo.',
            'area_id.required' => 'Debe seleccionar un área.',
            'descripcion.required' => 'La descripción es requerida.',
            'roles.required' => 'Debe seleccionar al menos un rol.',
        ];

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:empleados,email',
            'sexo' => 'required|in:M,F',
            'area_id' => 'required|exists:areas,id',
            'descripcion' => 'required|string',
            'roles' => 'required|array|min:1',
        ], $messages);

        try {
            DB::beginTransaction();
            $empleado = Empleado::create([
                'nombre' => $validatedData['nombre'],
                'email' => $validatedData['email'],
                'sexo' => $validatedData['sexo'],
                'area_id' => $validatedData['area_id'],
                'boletin' => $request->boletin ? 1 : 0,
                'descripcion' => $validatedData['descripcion'],
            ]);

            $empleado->roles()->attach($request->roles);
            DB::commit();

            return redirect()->route('empleados.index')->with('success', 'Empleado creado con éxito');
        } catch (\Exception $e) {
            DB::rollBack();
            // En lugar de devolver un JSON, redirigimos con un error
            return redirect()->back()->withErrors(['error' => 'Error al crear el empleado.'])->withInput();
        }
    }

    public function edit(Empleado $empleado)
    {
        $empleado->load('roles');
        return Inertia::render('Empleados/Edit', [
            'empleado' => $empleado,
            'areas' => Area::all(),
            'roles' => Rol::all(),
        ]);
    }

    public function update(Request $request, Empleado $empleado)
    {
        $messages = [
            'nombre.required' => 'El nombre completo es requerido.',
            'sexo.required' => 'Debe seleccionar un sexo.',
            'area_id.required' => 'Debe seleccionar un área.',
            'descripcion.required' => 'La descripción es requerida.',
            'roles.required' => 'Debe seleccionar al menos un rol.',
        ];

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'area_id' => 'required|exists:areas,id',
            'descripcion' => 'required|string',
            'roles' => 'required|array|min:1',
        ], $messages);

        try {
            DB::beginTransaction();
            $empleado->update([
                'nombre' => $validatedData['nombre'],
                'sexo' => $validatedData['sexo'],
                'area_id' => $validatedData['area_id'],
                'boletin' => $request->boletin ? 1 : 0,
                'descripcion' => $validatedData['descripcion'],
            ]);

            $empleado->roles()->sync($request->roles);
            DB::commit();

            return redirect()->route('empleados.index')->with('success', 'Empleado actualizado con éxito');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Error al actualizar el empleado.'])->withInput();
        }
    }

    public function destroy(Empleado $empleado)
    {
        try {
            $empleado->delete();
            return redirect()->route('empleados.index')->with('success', 'Empleado eliminado con éxito');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Error al eliminar el empleado.']);
        }
    }
    
    public function getAreas()
    {
        return response()->json(Area::all());
    }

    public function getRoles()
    {
        return response()->json(Rol::all());
    }

    public function exportCsv()
    {
        $empleados = Empleado::with(['area', 'roles'])->get();
        $fileName = 'empleados.csv';

        $headers = [
            'Content-type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=$fileName",
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0'
        ];

        $callback = function() use($empleados) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Nombre', 'Email', 'Sexo', 'Area', 'Boletin', 'Roles']);

            foreach ($empleados as $empleado) {
                fputcsv($file, [
                    $empleado->id,
                    $empleado->nombre,
                    $empleado->email,
                    $empleado->sexo == 'M' ? 'Masculino' : 'Femenino',
                    $empleado->area->nombre,
                    $empleado->boletin ? 'Si' : 'No',
                    $empleado->roles->pluck('nombre')->implode(', ')
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}