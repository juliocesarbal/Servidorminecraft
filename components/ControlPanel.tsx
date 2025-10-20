'use client';

import { Power, PowerOff, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface ControlPanelProps {
  state: string;
  onRefresh: () => void;
}

export default function ControlPanel({ state, onRefresh }: ControlPanelProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleStart = async () => {
    if (!confirm('¿Iniciar el servidor? Tardará 2-3 minutos en estar listo.')) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/ec2/start', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        setMessage('Servidor iniciando... Espera 2-3 minutos.');
        // Refrescar inmediatamente y luego cada segundo durante 10 segundos
        onRefresh();
        setTimeout(onRefresh, 1000);
        setTimeout(onRefresh, 2000);
        setTimeout(onRefresh, 3000);
      } else {
        setMessage('Error al iniciar el servidor');
      }
    } catch (error) {
      setMessage('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    // Pedir confirmación
    if (!confirm('¿Detener el servidor? Los jugadores serán desconectados.')) return;

    // Pedir contraseña
    const password = prompt('Ingresa la contraseña para detener el servidor:');

    // Validar contraseña
    if (password !== 'cholo') {
      setMessage('❌ Contraseña incorrecta. No se detendrá el servidor.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/ec2/stop', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        setMessage('✅ Servidor deteniéndose...');
        // Refrescar inmediatamente y luego cada segundo durante 10 segundos
        onRefresh();
        setTimeout(onRefresh, 1000);
        setTimeout(onRefresh, 2000);
        setTimeout(onRefresh, 3000);
      } else {
        setMessage('Error al detener el servidor');
      }
    } catch (error) {
      setMessage('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Determinar si cada botón debe estar habilitado
  const canStart = state === 'stopped' && !loading;
  const canStop = state === 'running' && !loading;
  const isTransitioning = state === 'pending' || state === 'stopping';

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold minecraft-text mb-6">Panel de Control</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleStart}
          disabled={!canStart || isTransitioning}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50"
        >
          <Power className="w-5 h-5" />
          {state === 'pending' ? 'Iniciando...' : 'Iniciar Servidor'}
        </button>

        <button
          onClick={handleStop}
          disabled={!canStop || isTransitioning}
          className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
        >
          <PowerOff className="w-5 h-5" />
          {state === 'stopping' ? 'Deteniéndose...' : 'Detener Servidor'}
        </button>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Actualizar</span>
        </button>
      </div>

      {message && (
        <div className={`mt-4 p-4 rounded-lg ${
          message.includes('Error')
            ? 'bg-red-900/20 border border-red-700 text-red-300'
            : 'bg-blue-900/20 border border-blue-700 text-blue-300'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
      )}

      <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <p className="text-sm text-gray-400">
          <strong className="text-white">Nota:</strong> El servidor tiene auto-apagado configurado.
          Se detendrá automáticamente después de 10 minutos sin jugadores para ahorrar costos.
        </p>
      </div>
    </div>
  );
}
