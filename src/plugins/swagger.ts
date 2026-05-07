import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default fp(async (app) => {
  app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Gym Buddy API',
        description:
          'Fitness platform API for workout tracking with check-ins, gyms, and gamification',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  })
  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: true },
    staticCSP: true,
  })
})
