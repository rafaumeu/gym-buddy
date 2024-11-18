import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { ValidateCheckInUseCase } from '@/use-cases/validate-checking'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

let checkInsRepository: inMemoryCheckInsRepository
let sut: ValidateCheckInUseCase
describe('Validate check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()

    sut = new ValidateCheckInUseCase(checkInsRepository)

    // vi.useFakeTimers()
  })
  afterEach(() => {
    // vi.useRealTimers()
  })
  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent check in', async () => {
    await expect(
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})