import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credential-error"
import { hash } from "bcryptjs"
import { describe, expect, it } from "vitest"

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new inMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })
    const { user } = await authenticateUseCase.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it("should not be able to authenticte with wrong email", async () => {
    const usersRepository = new inMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await expect(
      authenticateUseCase.execute({
        email: "wrongemail@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new inMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })
    await expect(
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "wrongpassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
