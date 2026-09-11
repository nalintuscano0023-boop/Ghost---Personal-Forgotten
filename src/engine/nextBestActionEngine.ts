import { Item, ScoredItem } from '../types'

export interface NextActionRecommendation {
  item: ScoredItem
  impactScore: number
  reasons: string[]
}

const urgency = (item: ScoredItem) => {
  if (item.daysToDeadline === undefined) return 0
  if (item.daysToDeadline <= 0) return 30
  return Math.max(0, 28 - item.daysToDeadline * 2)
}

export function recommendNextAction(items: ScoredItem[], all: Item[] = items): NextActionRecommendation | null {
  const candidates = items.filter(item => item.status === 'active' && item.estimatedMinutes > 0 && item.nextAction.trim())
  if (!candidates.length) return null
  const ranked = candidates.map(item => {
    const blocked = all.filter(other => other.status === 'active' && other.dependencies.includes(item.id)).length
    const riskReduction = Math.min(35, Math.round(item.score * 0.35))
    const importance = item.importance === 'high' ? 20 : item.importance === 'medium' ? 10 : 4
    const dependency = Math.min(30, blocked * 10)
    const impactScore = riskReduction + importance + dependency + urgency(item)
    const reasons: string[] = []
    if (urgency(item) > 0) reasons.push(item.daysToDeadline !== undefined && item.daysToDeadline <= 0 ? 'Deadline needs attention now' : 'Deadline approaching')
    if (item.importance === 'high') reasons.push('High importance')
    reasons.push(`${item.estimatedMinutes}-minute action`)
    if (blocked) reasons.push(`Could unblock ${blocked} ${blocked === 1 ? 'item' : 'items'}`)
    if (riskReduction >= 18) reasons.push('Large risk reduction')
    return { item, impactScore, reasons }
  })
  ranked.sort((a, b) => (b.impactScore / b.item.estimatedMinutes) - (a.impactScore / a.item.estimatedMinutes) || b.impactScore - a.impactScore || a.item.id.localeCompare(b.item.id))
  return ranked[0]
}
