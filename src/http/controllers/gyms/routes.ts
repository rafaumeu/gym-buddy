import { create } from '@/http/controllers/gyms/create'
import { nearby } from '@/http/controllers/gyms/nearby'
import { search } from '@/http/controllers/gyms/search'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  const gymSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    created_at: z.date(),
  })

  app.get('/gyms/search', {
    schema: {
      tags: ['Gyms'],
      summary: 'Search gyms by name',
      security: [{ bearerAuth: [] }],
      querystring: z.object({ q: z.string(), page: z.coerce.number().min(1).default(1) }),
      response: { 200: z.object({ gyms: z.array(gymSchema) }) },
    },
  }, search)

  app.get('/gyms/nearby', {
    schema: {
      tags: ['Gyms'],
      summary: 'Find nearby gyms',
      security: [{ bearerAuth: [] }],
      querystring: z.object({
        latitude: z.coerce.number().refine(v => Math.abs(v) <= 90),
        longitude: z.coerce.number().refine(v => Math.abs(v) <= 180),
      }),
      response: { 200: z.object({ gyms: z.array(gymSchema) }) },
    },
  }, nearby)

  app.post('/gyms', {
    onRequest: [verifyUserRole('ADMIN')],
    schema: {
      tags: ['Gyms'],
      summary: 'Create a new gym (Admin only)',
      security: [{ bearerAuth: [] }],
      body: z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(v => Math.abs(v) <= 90),
        longitude: z.number().refine(v => Math.abs(v) <= 180),
      }),
      response: { 201: z.void() },
    },
  }, create)
}
