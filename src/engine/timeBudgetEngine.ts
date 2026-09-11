import { Item, ScoredItem } from '../types'
import { recommendNextAction } from './nextBestActionEngine'

export interface TimeBudgetResult {
  items: ScoredItem[]
  totalMinutes: number
  reasons: string[]
}

const value = (item: ScoredItem, all: Item[]) => {
  const blocked = all.filter(other => other.status === 'active' && other.dependencies.includes(item.id)).length
  const deadline = item.daysToDeadline === undefined ? 0 : item.daysToDeadline <= 0 ? 30 : Math.max(0, 28 - item.daysToDeadline * 2)
  const importance = item.importance === 'high' ? 20 : item.importance === 'medium' ? 10 : 4
  return Math.min(100, Math.round(item.score * .45) + importance + blocked * 9 + deadline)
}

export function findBestUseOfTime(items: ScoredItem[], minutes: number, all: Item[] = items): TimeBudgetResult {
  const candidates = items.filter(item => item.status === 'active' && item.estimatedMinutes > 0 && item.estimatedMinutes <= minutes && item.nextAction.trim())
  if (!candidates.length) return { items: [], totalMinutes: 0, reasons: [] }
  let best: ScoredItem[] = []
  let bestValue = -1
  const limit = Math.min(candidates.length, 12)
  const visit = (index: number, remaining: number, chosen: ScoredItem[], score: number) => {
    if (score > bestValue || (score === bestValue && chosen.length > best.length)) { best = chosen; bestValue = score }
    for (let i = index; i < limit; i++) {
      const item = candidates[i]
      if (item.estimatedMinutes <= remaining) visit(i + 1, remaining - item.estimatedMinutes, [...chosen, item], score + value(item, all))
    }
  }
  visit(0, minutes, [], 0)
  best = [...best].sort((a, b) => value(b, all) - value(a, all) || a.estimatedMinutes - b.estimatedMinutes || a.id.localeCompare(b.id))
  const totalMinutes = best.reduce((total, item) => total + item.estimatedMinutes, 0)
  const blocked = best.reduce((total, item) => total + all.filter(other => other.status === 'active' && other.dependencies.includes(item.id)).length, 0)
  const deadline = best.filter(item => (item.daysToDeadline ?? 99) <= 7).length
  const reasons = [
    `${best.reduce((total, item) => total + Math.min(35, Math.round(item.score * .35)), 0)} points of risk reduction`,
    ...(deadline ? [`${deadline} urgent deadline${deadline === 1 ? '' : 's'}`] : []),
    ...(blocked ? [`${blocked} dependenc${blocked === 1 ? 'y is' : 'ies are'} affected`] : []),
    'Every action is immediately actionable'
  ]
  return { items: best, totalMinutes, reasons }
}

export const bestSingleAction = (items: ScoredItem[], all: Item[]) => recommendNextAction(items, all)
