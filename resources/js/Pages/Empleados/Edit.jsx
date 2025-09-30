import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, empleado, areas, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: empleado.nombre || '',
        email: empleado.email || '',
        sexo: empleado.sexo || '',
        area_id: empleado.area_id || '',
        descripcion: empleado.descripcion || '',
        boletin: empleado.boletin || 0,
        roles: empleado.roles.map(rol => rol.id) || [],
    });

    const handleRoleChange = (e) => {
        const roleId = parseInt(e.target.value);
        if (e.target.checked) {
            setData('roles', [...data.roles, roleId]);
        } else {
            setData('roles', data.roles.filter((id) => id !== roleId));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('empleados.update', empleado.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Empleado</h2>}
        >
            <Head title="Editar Empleado" />

            <div className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre completo *</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-xs mt-1">{errors.nombre}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo electrónico *</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
                            value={data.email}
                            readOnly
                            disabled
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sexo *</label>
                        <div className="mt-2 space-x-4">
                            <label className="inline-flex items-center">
                                <input type="radio" name="sexo" value="M" checked={data.sexo === 'M'} onChange={(e) => setData('sexo', e.target.value)} className="text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Masculino</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" name="sexo" value="F" checked={data.sexo === 'F'} onChange={(e) => setData('sexo', e.target.value)} className="text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Femenino</span>
                            </label>
                        </div>
                        {errors.sexo && <div className="text-red-500 text-xs mt-1">{errors.sexo}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Área *</label>
                        <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={data.area_id}
                            onChange={(e) => setData('area_id', e.target.value)}
                        >
                            <option value="">Seleccionar área</option>
                            {areas.map(area => <option key={area.id} value={area.id}>{area.nombre}</option>)}
                        </select>
                        {errors.area_id && <div className="text-red-500 text-xs mt-1">{errors.area_id}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción *</label>
                        <textarea
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        ></textarea>
                        {errors.descripcion && <div className="text-red-500 text-xs mt-1">{errors.descripcion}</div>}
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                            <input type="checkbox" checked={data.boletin == 1} onChange={(e) => setData('boletin', e.target.checked ? 1 : 0)} className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Deseo recibir boletín informativo</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Roles *</label>
                        <div className="mt-2 space-y-2">
                            {roles.map(rol => (
                                <label key={rol.id} className="flex items-center">
                                    <input type="checkbox" value={rol.id} checked={data.roles.includes(rol.id)} onChange={handleRoleChange} className="rounded text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">{rol.nombre}</span>
                                </label>
                            ))}
                        </div>
                        {errors.roles && <div className="text-red-500 text-xs mt-1">{errors.roles}</div>}
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <Link href={route('empleados.index')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={processing}
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}