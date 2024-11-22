import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('password123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@example.com',
    password: 'password123',
  })
  const { token } = authResponse.body
  return { token }
}
