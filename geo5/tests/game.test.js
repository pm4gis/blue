import test from 'node:test';import assert from 'node:assert/strict';import{norm,evaluate,currentPuzzle,local9ToUtc,meta,DATES,RELEASES}from'../src/index.js';
test('schedules contain 90 business days',()=>{assert.equal(DATES.length,90);assert.equal(DATES[0],'2026-08-18')});
test('today puzzle six remains NORTH and Taupō',()=>{assert.equal(meta('gis',5).answer,'NORTH');assert.equal(meta('place',5).display,'Taupō')});
test('macrons normalise',()=>assert.equal(norm('Taupō'),'TAUPO'));
test('duplicate letters use only available matches',()=>assert.deepEqual(evaluate('LLAMA','LAYER'),['correct','absent','present','absent','absent']));
test('NZ 9am handles daylight saving',()=>{assert.equal(new Date(local9ToUtc('2026-08-25')).toISOString(),'2026-08-24T21:00:00.000Z');assert.equal(new Date(local9ToUtc('2026-09-28')).toISOString(),'2026-09-27T20:00:00.000Z')});
test('puzzle 6 is active just after its release',()=>assert.equal(currentPuzzle(Date.parse('2026-08-24T21:00:01Z')),5));
