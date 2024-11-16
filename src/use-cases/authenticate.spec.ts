import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credential-error"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let sut: AuthenticateUseCase
let usersRepository: UsersRepository
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })
    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "wrongemail@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })
    await expect(
      sut.execute({
        email: "johndoe@example.com",
        password: "wrongpassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
