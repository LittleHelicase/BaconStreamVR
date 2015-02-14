void setup() 
{
  size(640, 360); 
  noStroke();
  rectMode(CENTER);
}

void drawHistory(){
  if(Simulation.history){
    int dist = 2;
    int olds = 10;
    for(int i=0; i<olds; i++){
      int c_idx = Simulation.history.length - i*dist-1;
      if(c_idx < 0) break;
      idx = c_idx - ((Simulation.history[c_idx].iteration - c_idx) % dist);
      if(idx < 0) break;
      int alpha = Simulation.history.length - c_idx;
      fill(152,199,61,Math.max(0,120-alpha*120/(olds*dist)));
      stroke(152,199,61,Math.max(0,255-alpha*120/(olds*dist)));
      // Simulation is a global Javascript variable
      // that is set in page.js
      int x = Simulation.history[idx].x*90 + 320;
      int y = Simulation.history[idx].y*90 + 180;
      ellipse(x,y,75,75);
    }
  }
}

void draw() 
{   
  background(105); 
  drawHistory();
  fill(152,199,61);
  // Simulation is a global Javascript variable
  // that is set in page.js
  int x = Simulation.state.x*90 + 320;
  int y = Simulation.state.y*90 + 180;
  ellipse(x,y,75,75);
}
