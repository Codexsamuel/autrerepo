import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    // Créer l'application NestJS
    const app = await NestFactory.create(AppModule);
    
    // Configuration globale
    const configService = app.get(ConfigService);
    
    // Sécurité
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));
    
    // Compression
    app.use(compression());
    
    // CORS
    app.use(cors({
      origin: configService.get('CORS_ORIGINS', '*').split(','),
      credentials: true,
    }));
    
    // Validation globale
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));
    
    // Préfixe global
    app.setGlobalPrefix('api/v1');
    
    // Configuration Swagger
    const config = new DocumentBuilder()
      .setTitle('NovaIA Control API')
      .setDescription('API de contrôle et orchestration pour NovaIA')
      .setVersion('1.0.0')
      .addBearerAuth()
      .addTag('auth', 'Authentification et autorisation')
      .addTag('agents', 'Gestion des agents IA')
      .addTag('fleet', 'Gestion de la flotte')
      .addTag('policies', 'Politiques RBAC/ABAC')
      .addTag('monitoring', 'Monitoring et observabilité')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    
    // Démarrer l'application
    const port = configService.get('PORT', 4000);
    const wsPort = configService.get('WS_PORT', 4001);
    
    await app.listen(port);
    
    logger.log(`🚀 NovaIA Control API démarrée sur le port ${port}`);
    logger.log(`📚 Documentation Swagger disponible sur http://localhost:${port}/docs`);
    logger.log(`🔌 WebSocket disponible sur le port ${wsPort}`);
    
  } catch (error) {
    logger.error('❌ Erreur lors du démarrage de l\'API:', error);
    process.exit(1);
  }
}

bootstrap(); 