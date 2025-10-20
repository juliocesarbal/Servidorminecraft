import { NextResponse } from 'next/server';
import { EC2Client, StopInstancesCommand } from '@aws-sdk/client-ec2';

const client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST() {
  try {
    const command = new StopInstancesCommand({
      InstanceIds: [process.env.EC2_INSTANCE_ID!],
    });

    const response = await client.send(command);
    const instanceState = response.StoppingInstances?.[0];

    return NextResponse.json({
      success: true,
      instanceId: instanceState?.InstanceId,
      previousState: instanceState?.PreviousState?.Name,
      currentState: instanceState?.CurrentState?.Name,
      message: 'Servidor deteniéndose...',
    });
  } catch (error) {
    console.error('Error al detener instancia EC2:', error);
    return NextResponse.json(
      { error: 'Error al detener la instancia' },
      { status: 500 }
    );
  }
}
