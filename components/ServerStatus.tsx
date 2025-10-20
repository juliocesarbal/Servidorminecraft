'use client';

import { Activity, Server, Wifi, WifiOff } from 'lucide-react';

interface ServerStatusProps {
  state: string;
  publicIp: string | null;
  instanceType: string;
  launchTime: string | null;
}

export default function ServerStatus({ state, publicIp, instanceType, launchTime }: ServerStatusProps) {
  const getStateColor = () => {
    switch (state) {
      case 'running':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-red-500';
      case 'pending':
      case 'stopping':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'running':
        return 'En Línea';
      case 'stopped':
        return 'Apagado';
      case 'pending':
        return 'Iniciando...';
      case 'stopping':
        return 'Deteniéndose...';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Server className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold minecraft-text">Estado del Servidor</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStateColor()} animate-pulse`}></div>
          <span className="text-lg font-semibold">{getStateText()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            {state === 'running' ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            <span className="text-gray-400 text-sm">IP Pública</span>
          </div>
          <p className="text-xl font-mono text-white">
            {publicIp || 'No disponible'}
          </p>
          {publicIp && (
            <p className="text-xs text-gray-500 mt-1">
              Puerto: 25565
            </p>
          )}
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400 text-sm">Tipo de Instancia</span>
          </div>
          <p className="text-xl font-mono text-white">{instanceType}</p>
          {launchTime && state === 'running' && (
            <p className="text-xs text-gray-500 mt-1">
              Iniciado: {new Date(launchTime).toLocaleString('es-ES')}
            </p>
          )}
        </div>
      </div>

      {state === 'running' && publicIp && (
        <div className="mt-4 bg-green-900/20 border border-green-700 rounded-lg p-4">
          <p className="text-sm text-green-300">
            <strong>Conecta desde Minecraft:</strong> {publicIp}:25565
          </p>
        </div>
      )}
    </div>
  );
}
