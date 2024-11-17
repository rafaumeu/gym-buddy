import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'
import { beforeEach, describe, expect, it } from 'vitest'

let sut: CreateGymUseCase
let gymsRepository: inMemoryGymsRepository
describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'John Doe',
      description: null,
      phone: null,
      latitude: -23.5120725,
      longitude: -46.8795559,
    })
    expect(gymsRepository.items.length).toEqual(1)
    expect(gym).toHaveProperty('id')
    expect(gym.id).toEqual(expect.any(String))
    expect(gym.title).toEqual('John Doe')
  })
})
