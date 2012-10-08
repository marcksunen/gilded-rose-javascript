function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var item=items[i];

    if (item.isSulfuras()) {
        continue;
    }
    
    item.decrementSellIn();
    
    if (item.isBackstagePasses() && item.isOutsideSellIn()) {
        item.setMinQuality();      
    }else {
        item.tryUpdateQuality();  
    }

  }
}

Item.prototype.tryUpdateQuality = function(){
  var newQuality= this.quality + this.calculateAmount();

  if(!Item.checkMinQuality(newQuality)){
    newQuality=Item.MIN_QUALITY;
  }else if(!Item.checkMaxQuality(newQuality)){
    newQuality=Item.MAX_QUALITY;
  }
  
  this.quality = newQuality;
}

Item.prototype.calculateAmount = function(){
  var amount=1;
  var oldSellIn;
  if (this.isBackstagePasses()) {
    oldSellIn=this.sell_in+1;      
    if (oldSellIn < 11) {
      amount++;
    }
    if (oldSellIn < 6) {
      amount++;
    }
  }else {
    if (this.isOutsideSellIn()) {
      amount++;
    }
    if (!this.isAgedBrie()) {
      amount*= -1;
    }
    if(this.isConjured()){
      amount*= 2;
    }
  } 
  return amount;
};

Item.checkMinQuality = function(quality){
  return Item.MIN_QUALITY <= quality;
};

Item.checkMaxQuality = function(quality){
  return  quality <= Item.MAX_QUALITY;
};

Item.prototype.decrementSellIn = function(){
  this.sell_in--;
};

Item.prototype.isOutsideSellIn = function(){
  return this.sell_in < Item.THRESHOLD_SELL_IN;
};

Item.prototype.setMinQuality=function(){
  this.quality = Item.MIN_QUALITY;
};


Item.prototype.isAgedBrie = function () {
  return this.name == Item.MATCH_AGED_BRIE;
};

Item.prototype.isBackstagePasses = function (){
  return this.name == Item.MATCH_BACKSTAGE_PASSES;
};

Item.prototype.isSulfuras = function (){
  return this.name == Item.MATCH_SULFURAS;
};

Item.prototype.isConjured = function (){
  return this.name == Item.MATCH_CONJURED;
};


Item.MATCH_AGED_BRIE='Aged Brie';
Item.MATCH_BACKSTAGE_PASSES='Backstage passes to a TAFKAL80ETC concert';
Item.MATCH_SULFURAS='Sulfuras, Hand of Ragnaros';
Item.MATCH_CONJURED='Conjured Mana Cake';
Item.MAX_QUALITY=50;
Item.MIN_QUALITY=0;
Item.THRESHOLD_SELL_IN=0;