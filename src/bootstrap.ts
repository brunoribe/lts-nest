/* tslint:disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './pkg/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (process.env.KAFKA_CLIENT_ID && process.env.KAFKA_BROKER && process.env.KAFKA_CONSUMER_GROUP) {
        app.connectMicroservice<MicroserviceOptions>({
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: process.env.KAFKA_CLIENT_ID,
                    brokers: [process.env.KAFKA_BROKER],
                },
                consumer: {
                    groupId: process.env.KAFKA_CONSUMER_GROUP,
                },
            },
        });
    }

    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();