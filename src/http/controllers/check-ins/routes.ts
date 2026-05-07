import { create } from '@/http/controllers/check-ins/create'
import { history } from '@/http/controllers/check-ins/history'
import { metrics } from '@/http/controllers/check-ins/metrics'
import { validate } from '@/http/controllers/check-ins/validate'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  const checkInSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    gym_id: z.string().uuid(),
    validated_at: z.date().nullable(),
    created_at: z.date(),
  })

  app.get('/check-ins/history', {
    schema: {
      tags: ['Check-ins'],
      summary: 'Get check-in history',
      security: [{ bearerAuth: [] }],
      querystring: z.object({ page: z.coerce.number().min(1).default(1) }),
      response: { 200: z.object({ checkIns: z.array(checkInSchema) }) },
    },
  }, history)

  app.get('/check-ins/metrics', {
    schema: {
      tags: ['Check-ins'],
      summary: 'Get check-in count',
      security: [{ bearerAuth: [] }],
      response: { 200: z.object({ checkInsCount: z.number() }) },
    },
  }, metrics)

  app.post('/gyms/:gymId/check-ins', {
    schema: {
      tags: ['Check-ins'],
      summary: 'Check in to a gym',
      security: [{ bearerAuth: [] }],
      params: z.object({ gymId: z.string().uuid() }),
      body: z.object({
        latitude: z.number().refine(v => Math.abs(v) <= 90),
        longitude: z.number().refine(v => Math.abs(v) <= 180),
      }),
      response: { 201: z.void() },
    },
  }, create)

  app.patch('/check-ins/:checkInId/validate', {
    onRequest: [verifyUserRole('ADMIN')],
    schema: {
      tags: ['Check-ins'],
      summary: 'Validate a check-in (Admin only)',
      security: [{ bearerAuth: [] }],
      params: z.object({ checkInId: z.string().uuid() }),
      response: { 204: z.void() },
    },
  }, validate)
}
