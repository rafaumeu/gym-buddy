import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUsersCheckInsHistoryUseCase } from '@/use-cases/fetch-users-check-ins-history'

export function makeFetchUsersCheckInsHistory() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)
  return useCase
}
