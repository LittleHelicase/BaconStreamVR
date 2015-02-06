void setup() 
{
  size(640, 360); 
  noStroke();
  rectMode(CENTER);
}

void draw() 
{   
  background(105); 
  fill(152,199,61);
  // Simulation is a global Javascript variable
  // that is set in page.js
  int x = Simulation.state.x*90 + 320;
  int y = Simulation.state.y*90 + 180;
  ellipse(x,y,75,75);
  
}
