<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';
    protected $fillable = ['nombre'];
    public $timestamps = false;

    public function empleados()
    {
        return $this->belongsToMany(Empleado::class, 'empleado_rol');
    }
}
