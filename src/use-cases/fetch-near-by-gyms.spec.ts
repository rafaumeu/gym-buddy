import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearByGymsUseCase } from './fetch-near-by-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: FetchNearByGymsUseCase
describe('Fetch near by gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to search for', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.5120725,
      longitude: -46.8795559,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.274994,
      longitude: -48.5118668,
    })
    const { gyms } = await sut.execute({
      userLatitude: -23.5120725,
      userLongitude: -46.8795559,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
