import { NextResponse } from 'next/server';
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';

const client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const command = new DescribeInstancesCommand({
      InstanceIds: [process.env.EC2_INSTANCE_ID!],
    });

    const response = await client.send(command);
    const instance = response.Reservations?.[0]?.Instances?.[0];

    if (!instance) {
      return NextResponse.json(
        { error: 'Instancia no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      instanceId: instance.InstanceId,
      state: instance.State?.Name,
      publicIp: instance.PublicIpAddress || null,
      privateIp: instance.PrivateIpAddress,
      instanceType: instance.InstanceType,
      launchTime: instance.LaunchTime,
    });
  } catch (error) {
    console.error('Error al obtener estado de EC2:', error);
    return NextResponse.json(
      { error: 'Error al conectar con AWS' },
      { status: 500 }
    );
  }
}
