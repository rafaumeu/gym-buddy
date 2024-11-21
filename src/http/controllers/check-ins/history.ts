import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUsersCheckInsHistory } from '../../../use-cases/factories/make-fetch-users-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const searchGymUseCase = makeFetchUsersCheckInsHistory()
  const { checkIns } = await searchGymUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
