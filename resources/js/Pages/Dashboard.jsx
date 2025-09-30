import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard({ auth, stats, empleadosPorArea }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-6 space-y-8">
                {/* Tarjetas de Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Total Empleados" value={stats.empleados} icon={<span>👥</span>} />
                    <StatCard title="Total Áreas" value={stats.areas} icon={<span>🏢</span>} />
                    <StatCard title="Total Roles" value={stats.roles} icon={<span>📜</span>} />
                </div>

                {/* Gráfico y Panel de Información */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Distribución de Empleados por Área</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={empleadosPorArea}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {empleadosPorArea.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Información de la App</h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p><strong>Framework Backend:</strong> Laravel</p>
                            <p><strong>Framework Frontend:</strong> React (con Inertia.js)</p>
                            <p><strong>Estilos:</strong> Tailwind CSS</p>
                            <p><strong>Base de Datos:</strong> PostgreSQL</p>
                            <p><strong>Gráficos:</strong> Recharts</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
