import { inMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "@/use-cases/checkIn"
import { randomUUID } from "crypto"
import { beforeEach, describe, expect, it } from "vitest"

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckInUseCase
describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new inMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
