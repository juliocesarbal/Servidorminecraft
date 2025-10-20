'use client';

import { useEffect, useState } from 'react';
import ServerStatus from '@/components/ServerStatus';
import ControlPanel from '@/components/ControlPanel';
import { Gamepad2, AlertCircle } from 'lucide-react';

interface InstanceData {
  instanceId: string;
  state: string;
  publicIp: string | null;
  privateIp: string;
  instanceType: string;
  launchTime: string | null;
}

export default function Home() {
  const [instanceData, setInstanceData] = useState<InstanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/ec2/status');
      const data = await response.json();

      if (response.ok) {
        setInstanceData(data);
        setError('');
      } else {
        setError(data.error || 'Error al obtener estado');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Auto-refresh cada 15 segundos
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Gamepad2 className="w-12 h-12 text-green-400" />
            <h1 className="text-4xl md:text-5xl font-bold minecraft-text bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Panel de Control Minecraft
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Controla tu servidor AWS EC2 desde cualquier lugar
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Cargando estado del servidor...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-300 font-bold">Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && instanceData && (
          <div className="space-y-6">
            <ServerStatus
              state={instanceData.state}
              publicIp={instanceData.publicIp}
              instanceType={instanceData.instanceType}
              launchTime={instanceData.launchTime}
            />

            <ControlPanel
              state={instanceData.state}
              onRefresh={fetchStatus}
            />

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-700">
                <h3 className="text-blue-300 font-bold mb-2">Versión</h3>
                <p className="text-white">Forge 1.20.1-47.4.0</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-700">
                <h3 className="text-purple-300 font-bold mb-2">Región</h3>
                <p className="text-white">sa-east-1 (São Paulo)</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-700">
                <h3 className="text-green-300 font-bold mb-2">Auto-Apagado</h3>
                <p className="text-white">5 min sin jugadores</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Panel de Control Minecraft AWS - Ahorra costos con gestión inteligente</p>
          <p className="mt-2">Instance ID: i-0a3cb44f0e663463d</p>
        </footer>
      </div>
    </main>
  );
}
