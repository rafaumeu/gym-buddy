import { refresh } from '@/http/controllers/users/refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { authenticate } from './authenticate'
import { gamification } from './gamification'
import { profile } from './profile'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', {
    schema: {
      tags: ['Users'],
      summary: 'Register a new user',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
      response: { 201: z.void(), 409: z.object({ message: z.string() }) },
    },
  }, register)

  app.post('/sessions', {
    schema: {
      tags: ['Users'],
      summary: 'Authenticate user',
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
      response: { 200: z.object({ token: z.string() }), 400: z.object({ message: z.string() }) },
    },
  }, authenticate)

  app.patch('/token/refresh', {
    schema: {
      tags: ['Users'],
      summary: 'Refresh JWT token',
      description: 'Uses the refreshToken cookie to issue a new access token',
      response: { 200: z.object({ token: z.string() }) },
    },
  }, refresh)

  app.get('/me', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Users'],
      summary: 'Get user profile',
      security: [{ bearerAuth: [] }],
      response: { 200: z.object({ user: z.object({ id: z.string(), name: z.string(), email: z.string(), role: z.enum(['ADMIN', 'MEMBER']), created_at: z.string() }) }) },
    },
  }, profile)

  app.get('/me/gamification', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Users'],
      summary: 'Get user gamification data',
      security: [{ bearerAuth: [] }],
      response: { 200: z.object({ totalCheckIns: z.number(), currentStreak: z.number(), bestStreak: z.number(), level: z.number(), xp: z.number(), badges: z.array(z.object({ id: z.string(), name: z.string(), description: z.string() })) }) },
    },
  }, gamification)
}
