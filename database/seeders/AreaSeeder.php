<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Area;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Area::create(['nombre' => 'Administración']);
        Area::create(['nombre' => 'Ventas']);
        Area::create(['nombre' => 'Calidad']);
        Area::create(['nombre' => 'Producción']);
    }
}
