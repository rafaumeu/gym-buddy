import { env } from '@/env'
import { checkInsRoutes } from '@/http/controllers/check-ins/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { usersRoutes } from '@/http/controllers/users/routes'
import fastifyCookies from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: { expiresIn: '10m' },
})
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(fastifyCookies)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like Datadog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
