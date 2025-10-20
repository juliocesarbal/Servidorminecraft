# Panel de Control - Servidor Minecraft AWS

Panel web para controlar tu servidor de Minecraft en AWS EC2.

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env.local` ya está configurado. Si necesitas cambiarlo:

```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=sa-east-1
EC2_INSTANCE_ID=your_instance_id
```

## Ejecutar

```bash
npm run dev
```


## Funcionalidades

- Ver estado del servidor en tiempo real
- Iniciar servidor con un click
- Detener servidor con confirmación
- Actualización automática cada 15 segundos
- Botón de actualización manual

## Uso

1. El panel muestra el estado actual de la instancia
2. Si está **detenido**, usa el botón verde "Iniciar Servidor"
3. Si está **corriendo**, usa el botón rojo "Detener Servidor"
   - Te pedirá confirmación
   - **Luego pedirá una contraseña** para evitar detenciones accidentales
   - Contraseña: `cholo`
4. Click en "Actualizar" para ver el estado más reciente

La instancia se apaga automáticamente después de 5 minutos sin jugadores.

## Seguridad

- **Protección por contraseña**: Para detener el servidor manualmente se requiere la contraseña `cholo`
- Credenciales AWS almacenadas en `.env.local` (no incluido en git)
