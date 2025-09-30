<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = ['nombre'];
    public $timestamps = false;

    public function empleados()
    {
        return $this->hasMany(Empleado::class);
    }
}
