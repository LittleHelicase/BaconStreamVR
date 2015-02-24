void setup() 
{
  size(640, 360); 
  noStroke();
  rectMode(CENTER);
}

void drawHistory(){
  if(Scene.history){
    int dist = 2;
    int olds = 10;
    int cur = Scene.history.length - 1;
    if(Scene.state.seek)
      cur = Scene.state.seek;
    for(int i=0; i<olds; i++){
      int c_idx = cur - i*dist;
      if(c_idx < 0) break;
      idx = c_idx - ((Scene.history[c_idx].iteration - c_idx) % dist);
      if(idx < 0) break;
      int alpha = cur - c_idx;
      fill(152,199,61,Math.max(0,120-alpha*120/(olds*dist)));
      stroke(152,199,61,Math.max(0,255-alpha*120/(olds*dist)));
      // Simulation is a global Javascript variable
      // that is set in page.js
      int x = Scene.history[idx].x*90 + 320;
      int y = Scene.history[idx].y*90 + 180;
      ellipse(x,y,75,75);
    }
  }
}

void draw() 
{   
  background(105);
  if(!Scene.ready) return;
  drawHistory();
  fill(152,199,61);
  stroke(162,220,68);
  // Scene is an exposed Javascript variable
  // that is set in the processing plugin
  // the sync parameter of the plugin defines which
  // values are synced into the scene
  int x = Scene.state.x*90 + 320;
  int y = Scene.state.y*90 + 180;
  ellipse(x,y,75,75);
}
