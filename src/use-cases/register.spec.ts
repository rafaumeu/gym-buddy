import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists"
import { RegisterUseCase } from "@/use-cases/register"
import { compare } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let registerUseCase: RegisterUseCase
let usersRepository: inMemoryUsersRepository
describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })
  it("should be able to register", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "KbYtM@example.com",
      password: "123456",
    })
    expect(usersRepository.items.length).toEqual(1)
    expect(user).toHaveProperty("id")
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("John Doe")
  })

  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "KbYtM@example.com",
      password: "123456",
    })
    const isPasswordCorrectHashed = await compare("123456", user.password_hash)
    expect(isPasswordCorrectHashed).toBe(true)
  })
  it("should not to be able to register with same email twice", async () => {
    await registerUseCase.execute({
      name: "John Doe",
      email: "KbYtM@example.com",
      password: "123456",
    })
    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email: "KbYtM@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
