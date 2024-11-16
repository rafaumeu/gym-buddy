import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import { Prisma, User } from "@prisma/client"
export class PrismaUsersRepository implements UsersRepository {
  findById(userId: string): Promise<User | null> {
    throw new Error("Method not implemented.")
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
