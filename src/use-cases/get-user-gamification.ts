import { CheckInsRepository } from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'

interface GetUserGamificationUseCaseRequest {
  userId: string
}

interface Badge {
  id: string
  name: string
  description: string
}

interface GetUserGamificationUseCaseResponse {
  totalCheckIns: number
  currentStreak: number
  bestStreak: number
  level: number
  xp: number
  badges: Badge[]
}

export class GetUserGamificationUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserGamificationUseCaseRequest): Promise<GetUserGamificationUseCaseResponse> {
    const totalCheckIns = await this.checkInsRepository.countByUserId(userId)
    const checkInsDates =
      await this.checkInsRepository.findCheckInsDatesByUserId(userId)

    const { currentStreak, bestStreak } = this.calculateStreaks(checkInsDates)

    const xp = totalCheckIns
    const level = Math.floor(xp / 10) + (xp > 0 ? 1 : 0)

    const badges = this.calculateBadges(totalCheckIns, bestStreak)

    return {
      totalCheckIns,
      currentStreak,
      bestStreak,
      level,
      xp,
      badges,
    }
  }

  private calculateStreaks(dates: Date[]): {
    currentStreak: number
    bestStreak: number
  } {
    if (dates.length === 0) {
      return { currentStreak: 0, bestStreak: 0 }
    }

    // Get unique days (YYYY-MM-DD) sorted ascending
    const uniqueDays = [
      ...new Set(dates.map((d) => dayjs(d).format('YYYY-MM-DD'))),
    ].sort()

    let bestStreak = 1
    let currentStreakCount = 1

    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = dayjs(uniqueDays[i - 1])
      const curr = dayjs(uniqueDays[i])
      const diff = curr.diff(prev, 'day')

      if (diff === 1) {
        currentStreakCount++
        if (currentStreakCount > bestStreak) {
          bestStreak = currentStreakCount
        }
      } else {
        currentStreakCount = 1
      }
    }

    // Calculate current streak: count backwards from today or yesterday
    const today = dayjs().startOf('day')
    let currentStreak = 0

    const lastCheckInDay = dayjs(uniqueDays[uniqueDays.length - 1]).startOf('day')
    const streakStart = lastCheckInDay.isSame(today, 'day')
      ? today
      : today.subtract(1, 'day')

    // If the last check-in is more than 1 day old, current streak is 0
    if (lastCheckInDay.isAfter(streakStart) || lastCheckInDay.isSame(streakStart, 'day')) {
      for (let i = uniqueDays.length - 1; i >= 0; i--) {
        const checkInDay = dayjs(uniqueDays[i]).startOf('day')
        const expectedDay = streakStart.subtract(currentStreak, 'day')

        if (checkInDay.isSame(expectedDay, 'day')) {
          currentStreak++
        } else {
          break
        }
      }
    }

    // If only one unique day and it's today, bestStreak should be 1
    if (uniqueDays.length === 1) {
      bestStreak = 1
    }

    return { currentStreak, bestStreak }
  }

  private calculateBadges(totalCheckIns: number, bestStreak: number): Badge[] {
    const badges: Badge[] = []

    if (totalCheckIns >= 1) {
      badges.push({
        id: 'first-check-in',
        name: 'First Step',
        description: 'Completed your first check-in',
      })
    }

    if (totalCheckIns >= 10) {
      badges.push({
        id: 'ten-check-ins',
        name: 'Dedicated',
        description: 'Completed 10 check-ins',
      })
    }

    if (bestStreak >= 30) {
      badges.push({
        id: 'thirty-day-streak',
        name: 'Unstoppable',
        description: 'Achieved a 30-day streak',
      })
    }

    if (totalCheckIns >= 100) {
      badges.push({
        id: 'hundred-check-ins',
        name: 'Centurion',
        description: 'Completed 100 check-ins',
      })
    }

    return badges
  }
}
