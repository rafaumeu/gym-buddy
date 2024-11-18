import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { LateCheckInValidateError } from '@/use-cases/errors/late-check-in-validate-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}
export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) {
      throw new ResourceNotFound()
    }
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return { checkIn }
  }
}
