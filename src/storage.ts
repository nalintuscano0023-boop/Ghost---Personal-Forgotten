import { Item } from './types'
const KEY='ghost-items-v2'
const THEME_KEY='ghost-theme-v1'
const validStatus=new Set(['active','done','snoozed','abandoned'])
function normalize(value:unknown):Item|null{
  if(!value||typeof value!=='object')return null
  const item=value as Partial<Item>
  if(typeof item.id!=='string'||typeof item.title!=='string'||!item.title.trim())return null
  const now=new Date().toISOString()
  return {
    id:item.id,title:item.title.trim(),category:typeof item.category==='string'?item.category:'Personal',
    description:typeof item.description==='string'?item.description:'',createdAt:typeof item.createdAt==='string'?item.createdAt:now,
    lastActivityAt:typeof item.lastActivityAt==='string'?item.lastActivityAt:now,deadline:typeof item.deadline==='string'?item.deadline:undefined,snoozedUntil:typeof item.snoozedUntil==='string'?item.snoozedUntil:undefined,
    importance:item.importance==='high'||item.importance==='low'?item.importance:'medium',
    status:validStatus.has(item.status||'')?item.status as Item['status']:'active',
    nextAction:typeof item.nextAction==='string'&&item.nextAction?item.nextAction:'Review this item',
    estimatedMinutes:Number.isFinite(item.estimatedMinutes)?Math.max(1,Number(item.estimatedMinutes)):10,
    dependencies:Array.isArray(item.dependencies)?item.dependencies.filter((x):x is string=>typeof x==='string'):[],
    consequence:typeof item.consequence==='string'?item.consequence:'This may become harder to finish if left unattended.',
    abandonedAt:typeof item.abandonedAt==='string'?item.abandonedAt:undefined,
    abandonReason:item.abandonReason==='no_longer_relevant'||item.abandonReason==='not_worth_effort'||item.abandonReason==='replaced'||item.abandonReason==='dont_want_to_continue'||item.abandonReason==='other'?item.abandonReason:undefined,
    abandonNote:typeof item.abandonNote==='string'?item.abandonNote:undefined,
    restoredAt:typeof item.restoredAt==='string'?item.restoredAt:undefined,
    link:typeof item.link==='string'?item.link:undefined,notes:typeof item.notes==='string'?item.notes:undefined,
    history:Array.isArray(item.history)?item.history.filter(x=>x&&typeof x.at==='string'&&typeof x.type==='string') as Item['history']:[{at:now,type:'created'}],
    demo:Boolean(item.demo)
  }
}
export function loadItems():Item[]{try{const raw=localStorage.getItem(KEY)||localStorage.getItem('ghost-items-v1');if(!raw)return[];const data=JSON.parse(raw);return Array.isArray(data)?data.map(normalize).filter((x):x is Item=>Boolean(x)):[]}catch{return[]}}
export function saveItems(items:Item[]){try{localStorage.setItem(KEY,JSON.stringify(items))}catch{}}
export function clearItems(){try{localStorage.removeItem(KEY)}catch{}}
export function loadTheme(): 'dark'|'light' {try{return localStorage.getItem(THEME_KEY)==='light'?'light':'dark'}catch{return'dark'}}
export function saveTheme(theme:'dark'|'light'){try{localStorage.setItem(THEME_KEY,theme)}catch{}}
