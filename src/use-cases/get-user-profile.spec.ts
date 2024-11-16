import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found"
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let sut: GetUserProfileUseCase
let usersRepository: UsersRepository
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })
    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("John Doe")
  })
  it("should not be able to get user profile with non-existent user", async () => {
    expect(() =>
      sut.execute({
        userId: "non-existent-user-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
