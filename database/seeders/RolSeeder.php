<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rol::create(['nombre' => 'Profesional de proyectos - Desarrollador']);
        Rol::create(['nombre' => 'Gerente estratégico']);
        Rol::create(['nombre' => 'Auxiliar administrativo']);
    }
}
