import { Item, ScoredItem } from './types'
const days=(d:string)=>Math.max(0,Math.floor((Date.now()-new Date(d).getTime())/86400000))
export function scoreItem(item:Item, all:Item[]):ScoredItem{
 const inactive=days(item.lastActivityAt), reasons:string[]=[]; let score=0
 const inactivity=Math.min(30,Math.round(inactive*.9)); if(inactivity>8){score+=inactivity; reasons.push(`+${inactivity} inactivity · ${inactive} days`) }
 let daysTo:number|undefined; if(item.deadline){daysTo=Math.ceil((new Date(item.deadline).getTime()-Date.now())/86400000); if(daysTo<=14){const p=daysTo<0?30:Math.max(8,30-daysTo*2);score+=p; reasons.push(`+${p} deadline proximity`)}}
 const imp=item.importance==='high'?20:item.importance==='medium'?10:4; score+=imp; if(imp>=10)reasons.push(`+${imp} importance`)
 const dep=all.filter(x=>x.dependencies.includes(item.id)&&x.status==='active').length; if(dep){const p=Math.min(20,dep*7);score+=p; reasons.push(`+${p} dependency impact · blocks ${dep}`)}
 if(item.status==='snoozed')score+=5
 score=Math.min(100,score); const state=score>=75?'critical':score>=50?'forgotten':score>=28?'at-risk':'healthy'
 return {...item,score,reasons,state,daysInactive:inactive,daysToDeadline:daysTo}
}
export function scoreAll(items:Item[]){return items.filter(i=>i.status==='active'||i.status==='snoozed').map(i=>scoreItem(i,items)).sort((a,b)=>b.score-a.score)}
export function patterns(items:Item[]){const done=items.filter(i=>i.status==='done').length, abandoned=items.filter(i=>i.status==='abandoned').length; const cats=[...new Set(items.map(i=>i.category))].map(category=>{const all=items.filter(i=>i.category===category), old=all.filter(i=>days(i.lastActivityAt)>14); return {category,total:all.length,old:old.length}}).filter(x=>x.old>0); return {done,abandoned,cats}}
export const daysInactive=(date:string)=>days(date)
export function quickWins(items:ScoredItem[]){return items.filter(x=>x.estimatedMinutes<=10).sort((a,b)=>(b.score-b.estimatedMinutes)-(a.score-a.estimatedMinutes))}
export function reclaimedMinutes(items:Item[], since:number){const cutoff=Date.now()-since;return items.filter(i=>i.status==='done'&&i.history.some(h=>h.type==='done'&&new Date(h.at).getTime()>=cutoff)).reduce((n,i)=>n+i.estimatedMinutes,0)}
