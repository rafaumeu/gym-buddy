import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserGamificationUseCase } from '@/use-cases/get-user-gamification'
import dayjs from 'dayjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

let checkInsRepository: inMemoryCheckInsRepository
let sut: GetUserGamificationUseCase

describe('Get User Gamification Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()
    sut = new GetUserGamificationUseCase(checkInsRepository)
  })

  it('should return 0 for all metrics when user has no check-ins', async () => {
    const result = await sut.execute({ userId: 'user-1' })

    expect(result.totalCheckIns).toEqual(0)
    expect(result.currentStreak).toEqual(0)
    expect(result.bestStreak).toEqual(0)
    expect(result.level).toEqual(0)
    expect(result.xp).toEqual(0)
    expect(result.badges).toEqual([])
  })

  it('should calculate total check-ins count correctly', async () => {
    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-01',
    })
    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-02',
    })
    await checkInsRepository.create({
      user_id: 'user-2',
      gym_id: 'gym-01',
    })

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.totalCheckIns).toEqual(2)
  })

  it('should calculate level correctly (1 check-in = 1 XP, every 10 XP = 1 level)', async () => {
    for (let i = 0; i < 5; i++) {
      await checkInsRepository.create({
        user_id: 'user-1',
        gym_id: 'gym-01',
      })
    }

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.xp).toEqual(5)
    expect(result.level).toEqual(1) // 5 XP => level 1
  })

  it('should level up at every 10 check-ins', async () => {
    for (let i = 0; i < 25; i++) {
      await checkInsRepository.create({
        user_id: 'user-1',
        gym_id: 'gym-01',
      })
    }

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.xp).toEqual(25)
    expect(result.level).toEqual(3) // 25 XP => level 3
  })

  it('should award "First Step" badge on first check-in', async () => {
    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-01',
    })

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.badges).toHaveLength(1)
    expect(result.badges[0].id).toEqual('first-check-in')
    expect(result.badges[0].name).toEqual('First Step')
  })

  it('should award "Dedicated" badge at 10 check-ins', async () => {
    for (let i = 0; i < 10; i++) {
      await checkInsRepository.create({
        user_id: 'user-1',
        gym_id: 'gym-01',
      })
    }

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.badges).toHaveLength(2)
    const badgeIds = result.badges.map((b) => b.id)
    expect(badgeIds).toContain('first-check-in')
    expect(badgeIds).toContain('ten-check-ins')
  })

  it('should calculate current streak of consecutive days ending today', async () => {
    const today = dayjs()
    const yesterday = today.subtract(1, 'day')
    const dayBefore = today.subtract(2, 'day')

    vi.setSystemTime(today.toDate())

    // Create check-ins on 3 consecutive days
    checkInsRepository.items.push(
      {
        id: 'check-in-1',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: dayBefore.toDate(),
      },
      {
        id: 'check-in-2',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: yesterday.toDate(),
      },
      {
        id: 'check-in-3',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: today.toDate(),
      }
    )

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.currentStreak).toEqual(3)
    expect(result.bestStreak).toEqual(3)

    vi.useRealTimers()
  })

  it('should break streak when a day is missed', async () => {
    const today = dayjs()
    const yesterday = today.subtract(1, 'day')
    const threeDaysAgo = today.subtract(3, 'day')

    vi.setSystemTime(today.toDate())

    // Day gap between 3 days ago and yesterday
    checkInsRepository.items.push(
      {
        id: 'check-in-1',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: threeDaysAgo.toDate(),
      },
      {
        id: 'check-in-2',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: yesterday.toDate(),
      },
      {
        id: 'check-in-3',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: today.toDate(),
      }
    )

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.currentStreak).toEqual(2) // yesterday + today
    expect(result.bestStreak).toEqual(2)

    vi.useRealTimers()
  })

  it('should reset current streak to 0 if no check-in today or yesterday', async () => {
    const today = dayjs()
    const threeDaysAgo = today.subtract(3, 'day')
    const fourDaysAgo = today.subtract(4, 'day')

    vi.setSystemTime(today.toDate())

    checkInsRepository.items.push(
      {
        id: 'check-in-1',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: fourDaysAgo.toDate(),
      },
      {
        id: 'check-in-2',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: threeDaysAgo.toDate(),
      }
    )

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.currentStreak).toEqual(0)
    expect(result.bestStreak).toEqual(2)

    vi.useRealTimers()
  })

  it('should award "Unstoppable" badge for 30-day streak', async () => {
    const today = dayjs()

    vi.setSystemTime(today.toDate())

    // Create 30 consecutive days of check-ins
    for (let i = 29; i >= 0; i--) {
      checkInsRepository.items.push({
        id: `check-in-${i}`,
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: today.subtract(i, 'day').toDate(),
      })
    }

    const result = await sut.execute({ userId: 'user-1' })
    const badgeIds = result.badges.map((b) => b.id)
    expect(badgeIds).toContain('thirty-day-streak')
    expect(result.currentStreak).toEqual(30)
    expect(result.bestStreak).toEqual(30)

    vi.useRealTimers()
  })

  it('should award "Centurion" badge at 100 check-ins', async () => {
    for (let i = 0; i < 100; i++) {
      await checkInsRepository.create({
        user_id: 'user-1',
        gym_id: 'gym-01',
      })
    }

    const result = await sut.execute({ userId: 'user-1' })
    const badgeIds = result.badges.map((b) => b.id)
    expect(badgeIds).toContain('hundred-check-ins')
    expect(badgeIds).toContain('ten-check-ins')
    expect(badgeIds).toContain('first-check-in')
    expect(result.badges).toHaveLength(3) // no 30-day streak badge
  })

  it('should count current streak from yesterday if no check-in today yet', async () => {
    const today = dayjs()
    const yesterday = today.subtract(1, 'day')
    const dayBefore = today.subtract(2, 'day')

    vi.setSystemTime(today.toDate())

    // Streak of 3 days ending yesterday (not today)
    checkInsRepository.items.push(
      {
        id: 'check-in-1',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: dayBefore.toDate(),
      },
      {
        id: 'check-in-2',
        user_id: 'user-1',
        gym_id: 'gym-01',
        validated_at: null,
        created_at: yesterday.toDate(),
      }
    )

    const result = await sut.execute({ userId: 'user-1' })
    expect(result.currentStreak).toEqual(2) // dayBefore + yesterday
    expect(result.bestStreak).toEqual(2)

    vi.useRealTimers()
  })
})
