import test from 'node:test';
import assert from 'node:assert/strict';
import{norm,evaluate,currentPuzzle,local9ToUtc,meta,DATES,RELEASES,TOTAL,GIS,PLACES}from'../src/index.js';

test('schedule contains 150 business-day puzzles',()=>{assert.equal(TOTAL,150);assert.equal(DATES.length,150);assert.equal(RELEASES.length,150);assert.equal(DATES[0],'2026-08-18')});
test('today puzzle six remains NORTH and Taupō',()=>{assert.equal(meta('gis',5).answer,'NORTH');assert.equal(meta('place',5).display,'Taupō')});
test('first 90 answers remain unchanged at the expansion boundary',()=>{assert.equal(meta('gis',89).answer,'WORLD');assert.equal(meta('place',89).display,'Kurow');assert.equal(meta('gis',90).answer,'CHART');assert.equal(meta('place',90).display,'Owaka')});
test('all answers are unique five-letter normalised values',()=>{for(const [mode,list]of[['gis',GIS],['place',PLACES]]){assert.equal(list.length,150);const answers=list.map((_,i)=>meta(mode,i).answer);assert.ok(answers.every(a=>a.length===5));assert.equal(new Set(answers).size,150)}});
test('new PLACE entries include useful LINZ clue metadata and a maps link',()=>{const p=meta('place',90);assert.equal(p.theme,'Town');assert.match(p.hint2,/Clutha District/);assert.match(p.hint3,/46\.5°S/);assert.match(p.mapUrl,/google\.com\/maps\/search/)});
test('macrons normalise',()=>assert.equal(norm('Taupō'),'TAUPO'));
test('duplicate letters use only available matches',()=>assert.deepEqual(evaluate('LLAMA','LAYER'),['correct','absent','present','absent','absent']));
test('NZ 9am handles daylight saving',()=>{assert.equal(new Date(local9ToUtc('2026-08-25')).toISOString(),'2026-08-24T21:00:00.000Z');assert.equal(new Date(local9ToUtc('2026-09-28')).toISOString(),'2026-09-27T20:00:00.000Z')});
test('puzzle 6 is active just after its release',()=>assert.equal(currentPuzzle(Date.parse('2026-08-24T21:00:01Z')),5));
