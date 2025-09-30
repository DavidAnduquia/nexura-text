import { Head, Link } from '@inertiajs/react';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido" />
            <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
                <div className="absolute top-0 right-0 p-6 text-right">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-4xl mx-auto text-center p-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tighter mb-4">
                        Prueba Técnica - Nexura
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Aplicación de gestión de empleados desarrollada con Laravel y React.
                    </p>

                    <div className="mt-12">
                        <Link
                            href={auth.user ? route('dashboard') : route('login')}
                            className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-gray-800 hover:bg-gray-900 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
                        >
                            Ingresar al Panel
                            <ArrowRightIcon />
                        </Link>
                    </div>

                    <div className="mt-16 border-t border-gray-200 pt-8">
                        <div className="flex items-center justify-center space-x-4">
                            <UserIcon />
                            <div className="text-left">
                                <p className="text-md font-semibold text-gray-800">David A. Anduquia</p>
                                <p className="text-md text-gray-500">Ingeniero de Sistemas - 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}