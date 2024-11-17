import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'
import { beforeEach, describe, expect, it } from 'vitest'

let checkInsRepository: inMemoryCheckInsRepository
let sut: GetUserMetricsUseCase
describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-01',
    })
    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-02',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',
    })
    expect(checkInsCount).toEqual(2)
  })
})
