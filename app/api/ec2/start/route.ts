import { NextResponse } from 'next/server';
import { EC2Client, StartInstancesCommand } from '@aws-sdk/client-ec2';

const client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST() {
  try {
    const command = new StartInstancesCommand({
      InstanceIds: [process.env.EC2_INSTANCE_ID!],
    });

    const response = await client.send(command);
    const instanceState = response.StartingInstances?.[0];

    return NextResponse.json({
      success: true,
      instanceId: instanceState?.InstanceId,
      previousState: instanceState?.PreviousState?.Name,
      currentState: instanceState?.CurrentState?.Name,
      message: 'Servidor iniciando... Espera 2-3 minutos.',
    });
  } catch (error) {
    console.error('Error al iniciar instancia EC2:', error);
    return NextResponse.json(
      { error: 'Error al iniciar la instancia' },
      { status: 500 }
    );
  }
}
