// This file is for displaying the results, not for messing with them!

void setup() 
{
  size(640, 360); 
  noStroke();
  rectMode(CENTER);
}
  
void draw() 
{   
  background(105); 
  fill(255, 0,204);
  rect(mouseX, height/2, mouseY/2+10, mouseY/2+10);
  fill(255, 204,0);
  int inverseX = width-mouseX;
  int inverseY = height-mouseY;
  rect(inverseX, height/2, (inverseY/2)+10, (inverseY/2)+10);
}
