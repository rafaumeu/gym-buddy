import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from '@/use-cases/checkIn'
import { Decimal } from '@prisma/client/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let gymsRepository: inMemoryGymsRepository
let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new inMemoryCheckInsRepository()
    gymsRepository = new inMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: 'Gym for JavaScript developers',
      phone: null,
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5077564,
      userLongitude: -46.898501,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 10, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5077564,
      userLongitude: -46.898501,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5077564,
        userLongitude: -46.898501,
      })
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 10, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5077564,
      userLongitude: -46.898501,
    })
    vi.setSystemTime(new Date(2024, 10, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5077564,
      userLongitude: -46.898501,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
