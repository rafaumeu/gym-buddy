import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found"
import { User } from "@prisma/client"

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFound()
    }

    return { user }
  }
}
