export type Status='active'|'done'|'snoozed'|'abandoned'
export type Importance='low'|'medium'|'high'
export type AbandonReason='no_longer_relevant'|'not_worth_effort'|'replaced'|'dont_want_to_continue'|'other'
export interface Item { id:string; title:string; category:string; description:string; createdAt:string; lastActivityAt:string; deadline?:string; snoozedUntil?:string; importance:Importance; status:Status; nextAction:string; estimatedMinutes:number; dependencies:string[]; consequence:string; link?:string; notes?:string; abandonedAt?:string; abandonReason?:AbandonReason; abandonNote?:string; restoredAt?:string; history:{at:string;type:'created'|'activity'|'done'|'snoozed'|'abandoned'|'restored';reason?:AbandonReason;note?:string}[]; demo?:boolean }
export interface ScoredItem extends Item { score:number; reasons:string[]; state:'healthy'|'at-risk'|'forgotten'|'critical'; daysInactive:number; daysToDeadline?:number }
