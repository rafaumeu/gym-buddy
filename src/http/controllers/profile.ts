import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await request.jwtVerify()
  return reply.status(200).send()
}
