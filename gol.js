// gol.js — drop-in Conway's Game of Life layer  
// requires `bpm` to be defined before loading
;(function(){
  let c=64, s=document.createElement('canvas')
  s.width=s.height=c
  let x=s.getContext('2d')
  s0.init({src:s})

  let g=Array.from({length:c},()=>Array.from({length:c},()=>Math.random()>.7?1:0))
  function seed(){for(let i=0;i<100;i++)g[Math.random()*c|0][Math.random()*c|0]=1}

  let spb=60/bpm, lastBeat=-1
  setInterval(()=>{
    let beat=Math.floor(Date.now()/1000/spb*4)
    if(beat===lastBeat)return
    lastBeat=beat
    if(beat%16===0)seed()
    g=g.map((r,y)=>r.map((_,xx)=>{
      let n=0
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy)n+=g[(y+dy+c)%c][(xx+dx+c)%c]
      return g[y][x]?n==2||n==3?1:0:n==3?1:0
    }))
    let i=x.createImageData(c,c),d=i.data
    g.forEach((r,y)=>r.forEach((v,xx)=>{let p=(y*c+xx)*4;d[p]=d[p+1]=d[p+2]=v*255;d[p+3]=255}))
    x.putImageData(i,0,0)
  },50)
})()
