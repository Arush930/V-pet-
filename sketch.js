var dogimg1
var dogimg2
var dog
var database
var foodS
var foodStock

function preload()
{
dogimg1=loadImage("images/dogimg.png")
dogimg2=loadImage("images/dogimg1.png")

}

function setup() {
	createCanvas(500, 500);

 database = firebase.database()
dog = createSprite(400,350,50,50)
dog.addImage(dogimg1)
dog.scale=0.40

foodStock = database.ref('food')
foodStock.on("value", readStock);
}


function draw() {  
background(46, 139, 87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogimg2)
}
  drawSprites();
 
  textSize(25)
  fill("black")
  text("Press the UP_ARROW to feed the dog",50,100)

  text("Food Remaining:"+foodS,100,200)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;;
  } else{
    x = x - 1;
  }
  database.ref('/'). update({  
     food:x
  })
}