import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import Modal from '@/Components/Modal';

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const GenderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

export default function Index({ auth, empleados, filters }) {

    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    useEffect(() => {
        router.get(route('empleados.index'), { search: debouncedSearchTerm }, { preserveState: true, replace: true });
    }, [debouncedSearchTerm]);

    const confirmDeletion = (e) => {
        setEmployeeToDelete(e.currentTarget.id);
        setConfirmingDeletion(true);
    };

    const deleteEmployee = () => {
        router.delete(route('empleados.destroy', employeeToDelete), {
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setEmployeeToDelete(null);
    };

    return (
        <>
            <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lista de Empleados</h2>}
        >
            <Head title="Empleados" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="w-1/3">
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Buscar por nombre, email o área..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="space-x-2 flex items-center">
                        <a href={route('api.empleados.export')} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 shadow-md inline-flex items-center">
                            <DownloadIcon />
                            Exportar CSV
                        </a>
                        <Link
                            href={route('empleados.create')}
                            className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition duration-300 shadow-md"
                        >
                            Crear Empleado
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"><UserIcon />Nombre</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"><MailIcon />Email</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"><GenderIcon />Sexo</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"><BriefcaseIcon />Área</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider"><BellIcon />Boletín</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {empleados.map((empleado) => (
                                <tr key={empleado.id} className="hover:bg-gray-100 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{empleado.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{empleado.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{empleado.sexo === 'M' ? 'Masculino' : 'Femenino'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{empleado.area.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{empleado.boletin ? 'Sí' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <Link href={route('empleados.edit', empleado.id)} className="text-gray-600 hover:text-gray-900 font-bold inline-flex items-center"><EditIcon /> Modificar</Link>
                                        <button onClick={confirmDeletion} id={empleado.id} className="text-red-500 hover:text-red-700 font-bold inline-flex items-center"><TrashIcon /> Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que deseas eliminar este empleado?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Una vez que se elimine el registro, todos sus datos se perderán permanentemente.
                    </p>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                        <button onClick={deleteEmployee} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Confirmar</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}