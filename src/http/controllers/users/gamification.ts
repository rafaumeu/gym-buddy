import { makeGetUserGamificationUseCase } from '@/use-cases/factories/make-get-user-gamification-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function gamification(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const getUserGamificationUseCase = makeGetUserGamificationUseCase()

  const { totalCheckIns, currentStreak, bestStreak, level, xp, badges } =
    await getUserGamificationUseCase.execute({
      userId: request.user.sub,
    })

  return reply.status(200).send({
    totalCheckIns,
    currentStreak,
    bestStreak,
    level,
    xp,
    badges,
  })
}
