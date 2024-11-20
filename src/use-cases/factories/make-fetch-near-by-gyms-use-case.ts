import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearByGymsUseCase } from '@/use-cases/fetch-near-by-gyms'

export function makeFetchNearByGyms() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsUseCase(gymsRepository)
  return useCase
}
