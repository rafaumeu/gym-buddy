import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserGamificationUseCase } from '@/use-cases/get-user-gamification'

export function makeGetUserGamificationUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserGamificationUseCase(checkInsRepository)
  return useCase
}
