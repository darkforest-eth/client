// Claim Best
//
// find the best planet you should claim :)
//

function drawRound(ctx,p){
  if(!p) return '(???,???)';
  const viewport = ui.getViewport();
  ctx.strokeStyle="pink";
  ctx.lineWidth=10;
  const { x, y } = viewport.worldToCanvasCoords(p.location.coords);
  const range=p.range*0.05*20;
  const trueRange = viewport.worldToCanvasDist(range);
  ctx.beginPath();
  ctx.arc(x,y,trueRange,0,2*Math.PI);
  ctx.stroke();
  return `(${p.location.coords.x},${p.location.coords.y})`
}

class ClaimBest {
  constructor(){
    this.el=document.createElement('div');
    this.first = document.createElement('div');
    this.first.innerHTML =
      'find the planet you should claim :)';

    this.coords = document.createElement('div');
    this.coords.innerHTML=`(???,???)`;

    this.dis=document.createElement('div');
    this.dis.innerHTML='Distance From Center: ???';

    this.el.appendChild(this.first);
    this.el.appendChild(this.coords);
    this.el.appendChild(this.dis);

    this.planet=undefined;
    this.minDis=undefined;
  }

  async render(div){
    div.style.width = '300px';
    div.style.height = '100px';
    div.appendChild(this.el);
  }

  draw(ctx){
    if(this.planet!=undefined){
      let content = drawRound(ctx,this.planet);
      this.coords.innerHTML = content;
      this.dis.innerHTML='Distance From Center: '+this.minDis;
      return;
    }

    const planets = df.getMyPlanets();
    var minPlanet=undefined;
    var minDis=undefined;

    for(const p of planets) {
      if(p.destroyed) continue;
      if (p.planetLevel < 3) continue;
      if(!p?.location?.coords) continue;

      let tDis = Math.floor(df.getDistCoords(p.location.coords,{x:0,y:0}));

      if (minDis == undefined) {
        minDis = tDis;
        minPlanet = p;
      } else if (minDis > tDis) {
        minDis = tDis;
        minPlanet = p;
      }
    }
    if(minDis==undefined) return;
    this.planet=minPlanet;
    let content = drawRound(ctx, minPlanet);
    this.coords.innerHTML = content;
    this.minDis=minDis;
    this.dis.innerHTML='Distance From Center: '+this.minDis;

  }

  destroy(){
    delete this.el
    delete this.first
    delete this.dis
    delete this.coords
    delete this.planet
    delete this.minDis
  }
}

export default ClaimBest;
