describe("Gilded Rose", function() {

 	beforeEach(function() {
      	items = [];

		items.push(new Item('+5 Dexterity Vest', 10, 20));
		items.push(new Item('Aged Brie', 2, 0));
		items.push(new Item('Elixir of the Mongoose', 5, 7));
		items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
		items.push(new Item('Conjured Mana Cake', 3, 6));
    });
		//function Item(name, sell_in, quality) {
		//  this.name = name;
		//  this.sell_in = sell_in;
		//  this.quality = quality;
		//}
		//items.push(new Item('+5 Dexterity Vest', 10, 20));
		//items.push(new Item('Aged Brie', 2, 0));
		//items.push(new Item('Elixir of the Mongoose', 5, 7));
		//items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
		//items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
		//items.push(new Item('Conjured Mana Cake', 3, 6));

	it("All items have a sell_in value which denotes the number of days we have to sell the item", function() {
  		expect(items[0].sell_in).toEqual(10);
  		expect(items[1].sell_in).toEqual(2);
  		expect(items[2].sell_in).toEqual(5);
  		expect(items[3].sell_in).toEqual(0);
  		expect(items[4].sell_in).toEqual(15);
  		expect(items[5].sell_in).toEqual(3);
	});

	it("All items have a quality value which denotes how valuable the item is", function() {
  		expect(items[0].quality).toEqual(20);
  		expect(items[1].quality).toEqual(0);
  		expect(items[2].quality).toEqual(7);
  		expect(items[3].quality).toEqual(80);
  		expect(items[4].quality).toEqual(20);
  		expect(items[5].quality).toEqual(6);
	});

	describe("one day", function() {
		beforeEach(function() {
			update_quality();
		});

		it("At the end of each day our system lowers both values for every item", function() {
			//items.push(new Item('+5 Dexterity Vest', 10, 20));
			expect(items[0].sell_in).toEqual(9);
			expect(items[0].quality).toEqual(19);
			//items.push(new Item('Aged Brie', 2, 0));
			expect(items[1].sell_in).toEqual(1);
			expect(items[1].quality).toEqual(1);
			//items.push(new Item('Elixir of the Mongoose', 5, 7));
	  		expect(items[2].sell_in).toEqual(4);
	  		expect(items[2].quality).toEqual(6);
	  		//items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
	  		expect(items[3].sell_in).toEqual(0);
	  		expect(items[3].quality).toEqual(80);
			//items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
	  		expect(items[4].sell_in).toEqual(14);
	  		expect(items[4].quality).toEqual(21);
	  		//items.push(new Item('Conjured Mana Cake', 3, 6));
	  		//expect(items[5].sell_in).toEqual(2);
	  		//expect(items[5].quality).toEqual(4);
		});

	});

	describe("Once the sell_in days is less then zero", function() {

		beforeEach(function() {
      		items = [];

			items.push(new Item('+5 Dexterity Vest', 0, 20));

			update_quality();
    	});

		it(" quality degrades twice as fast", function() {
			//items.push(new Item('+5 Dexterity Vest', 0, 20));
			expect(items[0].sell_in).toEqual(-1);
			expect(items[0].quality).toEqual(18);
		});

	});


	describe("The quality of an item ", function() {

		beforeEach(function() {
      		items = [];

			items.push(new Item('+5 Dexterity Vest', 1, 0));

			update_quality();
    	});

		it(" is never negative", function() {
			expect(items[0].quality<0).toBe(false);
		});

	});

	describe("'Aged Brie'  ", function() {

		beforeEach(function() {
      		items = [];

			items.push(new Item('Aged Brie', 0, 1));

			update_quality();
    	});

		it("actually increases in quality the older it gets", function() {
			expect(items[0].sell_in).toEqual(-1);
			expect(items[0].quality).toEqual(3);
		});

	});

	describe("The quality of an item  ", function() {

		beforeEach(function() {
      		items = [];

			items.push(new Item('Aged Brie', 0, 49));

			update_quality();
    	});

		it("is never more than 50", function() {
			expect(items[0].quality>50).toBe(false);
		});

	});

	describe("'Sulfuras', being a legendary item, ", function() {

		beforeEach(function() {
      		items = [];

			items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));

			update_quality();
    	});

		it("never has to be sold nor does it decrease in quality", function() {
			expect(items[0].sell_in).toEqual(0);
			expect(items[0].quality).toEqual(80);
		});

	});

	describe("'Backstage passes' ", function() {
			beforeEach(function() {
      			items = [];
				items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    		});
			it(" increases in quality as it's sell_in value decreases", function() {
				update_quality();
				expect(items[0].sell_in).toEqual(14);
				expect(items[0].quality).toEqual(21);
			});
			it(" quality increases by 2 when there are 10 days or less", function() {
				for (var i = 6 - 1; i >= 0; i--) {
					update_quality();
				};
				expect(items[0].sell_in).toEqual(9);
				expect(items[0].quality).toEqual(27);
			});
			it(" and by 3 when there are 5 days or less", function() {
				for (var i = 11 - 1; i >= 0; i--) {
					update_quality();
				};
				expect(items[0].sell_in).toEqual(4);
				expect(items[0].quality).toEqual(38);
			});
			it(" but quality drops to 0 after the concert", function() {
				for (var i = 16 - 1; i >= 0; i--) {
					update_quality();
				};
				expect(items[0].sell_in).toEqual(-1);
				expect(items[0].quality).toEqual(0);
			});
	});

	describe("five day", function() {
		beforeEach(function() {
			update_quality();
			update_quality();
			update_quality();
			update_quality();
			update_quality();
		});

		it("At the end of each day our system lowers both values for every item", function() {
			//items.push(new Item('+5 Dexterity Vest', 10, 20));
			expect(items[0].sell_in).toEqual(5);
			expect(items[0].quality).toEqual(15);
			//items.push(new Item('Aged Brie', 2, 0));
			//expect(items[1].sell_in).toEqual(1);
			//expect(items[1].quality).toEqual(1);
			//items.push(new Item('Elixir of the Mongoose', 5, 7));
	  		//expect(items[2].sell_in).toEqual(4);
	  		//expect(items[2].quality).toEqual(6);
	  		//items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
	  		//expect(items[3].sell_in).toEqual(0);
	  		//expect(items[3].quality).toEqual(80);
			//items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
	  		//expect(items[4].sell_in).toEqual(14);
	  		//expect(items[4].quality).toEqual(21);
	  		//items.push(new Item('Conjured Mana Cake', 3, 6));
	  		//expect(items[5].sell_in).toEqual(2);
	  		//expect(items[5].quality).toEqual(4);
		});

		//it("Once the sell_in days is less then zero, quality degrades twice as fast", function() {
		//	expect(items[0].quality).toEqual(20);
		//}):
	});
});
