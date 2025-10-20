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
- Actualización automática cada 5 segundos (sincronización en tiempo real)
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

## Deployment en Vercel

### 1. Configurar Variables de Entorno

En tu proyecto de Vercel, ve a **Settings → Environment Variables** y agrega:

```
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=sa-east-1
EC2_INSTANCE_ID=i-0a3cb44f0e663463d
```

**IMPORTANTE**: Asegúrate de marcar estas variables para todos los ambientes (Production, Preview, Development).

### 2. Permisos IAM Requeridos

Tu usuario IAM en AWS debe tener los siguientes permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": "*"
    }
  ]
}
```

### 3. Redesplegar

Si encuentras el error "An unexpected error happened when running this build":

1. **Intenta nuevamente**: Este suele ser un error transitorio de Vercel
2. **Desde el dashboard de Vercel**: Ve a Deployments → Click en los 3 puntos → "Redeploy"
3. **Desde la terminal**:
   ```bash
   git add .
   git commit -m "fix: optimize vercel deployment"
   git push
   ```

### 4. Verificar el Deployment

Una vez desplegado exitosamente:
- Abre la URL de tu aplicación
- Verifica que el estado del servidor se muestre correctamente
- Prueba iniciar/detener el servidor

### Troubleshooting

**Error: "Error al conectar con AWS"**
- Verifica que las variables de entorno estén correctamente configuradas en Vercel
- Asegúrate de que las credenciales AWS sean válidas
- Verifica que el usuario IAM tenga los permisos necesarios

**El estado no se actualiza**
- Refresca la página (Ctrl+F5 para limpiar caché)
- El sistema ahora actualiza cada 5 segundos automáticamente

**Botones deshabilitados**
- Espera 5 segundos para que se sincronice el estado real
- Presiona el botón "Actualizar" para forzar una sincronización inmediata
