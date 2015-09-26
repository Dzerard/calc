var app = {

	container: null,
	button: null,
	selectProduct: null,
	countItems: null,
	currency: 'zł',
	currentItem: null,
	finalPrice: null,
	init: function(container) {
		this.container = container;
		this.setItems();
		this.bindFunctions();
		this.validForom();
	},
	summary: function() {
		var _this = this;

		var tempPrice = 0;
		//ilosc i cena jednostkowa
	
		if($('[data-parsley-form-config]').parsley().validate()) {

			var width = this.itemWidth.val();
			var height = this.itemHeight.val();
			var amount = this.countItems.val();
			var currentItem = _this.currentItem;
			var setItemWithPrice = null;

			console.log(currentItem.priceMeter);	//obiekt z informacją o szerokosci i cenie
			console.log(width);	
			console.log(height);	
			console.log(amount);

			for(var i =0; i < currentItem.priceMeter.length; i++) {

				if(width >= currentItem.priceMeter[i].minWidth[0]  && width <= currentItem.priceMeter[i].minWidth[1] ) {
					setItemWithPrice = currentItem.priceMeter[i];
					// return;
				}
			}

			tempPrice = parseFloat(width*setItemWithPrice.priceCM).toFixed(2);

			if(tempPrice < setItemWithPrice.priceMin) {
				tempPrice = setItemWithPrice.priceMin;
			}

			console.log(tempPrice+'zł');

			if(!isNaN(tempPrice)) {
				_this.finalPrice.html('<b>'+tempPrice+_this.currency+'</b>');
			}

		} else {
			console.log('formularz niporawnie wypelniony')
		}

	},
	setItems: function() {
		this.button = this.container.find('#countPriceButton');
		this.selectProduct = this.container.find('#product');
		this.finalPrice = this.container.find('.final-price');
		this.countItems = this.container.find('#countItems');
		this.dropdown   = this.container.find('.dropdown');
		this.itemWidth  = this.container.find('#itemWidth');
		this.itemHeight = this.container.find('#itemHeight');
		// this.maxAmount  = this.container.find('#maxAmount');
	},
	submit: function() {



		// this.checkIfItemSelect

	},
	setMaxAmount: function(amount) {
		this.countItems.attr('max', amount);
	},

	checkIfItemSelect: function() {
		var itemSet =  this.dropdown.find('button').attr('data-item-set');

		console.log(itemSet);

		if(itemSet == 'false') {

			this.dropdown.find('button').attr('title', 'Wybierz produkt');
			this.dropdown.find('button').tooltip('show');

			return false;
		} else {
			this.dropdown.find('button').tooltip('destroy');
		}
	},

	bindFunctions: function() {
		var _this = this;


		//akcja do przeliczania formularza
		this.button.on('click', function() {
			_this.summary();
			return false;
		});

		this.dropdown.find('li').on('click', function() {
			var $dropdownElement = $(this);

			_this.dropdown.find('li').removeClass('active');
			$dropdownElement.addClass('active');
			_this.currentItem = products[$dropdownElement.find('a').data('product-id')];
			_this.dropdown.find('button').text($dropdownElement.find('a').text());
			_this.dropdown.find('button').attr('data-item-set', true);
			_this.setMaxAmount(_this.currentItem.amount);
		});

		this.countItems.on('keyup', function(e){

			_this.checkIfItemSelect();
			// console.log(_this.currentItem);

		// 	//@todo
		// 	console.log(e);


		});

	},
	validForom: function() {


		var parsleyConfig = {
			errorsContainer: function(pEle) {
				var $err = pEle.$element.parent().parent().find('.custom-error');
				return $err;
			}
		};

      if($('[data-parsley-form-config]').length > 0) {
        $('[data-parsley-form-config]').parsley(parsleyConfig);
      }
	}
};


var products  = {
	'001' : {
		'priceCm' : '10',
		'rabate' : {
			3  : 5,
			10 : 10
		},
		'amount' : 50,
		'name': 'Roleta Dzień i Noc'
	},
	'002' : {
		'priceCm' : '200',
		'rabate' : {
			3  : 5,
			10 : 10
		},
		'amount' : 50,
		'name': 'Roleta Ścienna /standardowa'
	},
	'003' : {
		'price' : '300',
		'rabate' : {
			3  : 5,
			10 : 10
		},
		'amount' : 150,
		'name': 'Roleta Mini'
	},
	'004' : {
		'price' : '400',
		'rabate' : {
			3  : 5,
			10 : 10
		},
		'priceMeter': [
			{
				'minWidth' : [1,150],
				'priceMin' : 32,
				'priceCM'  : 0.8
			},
			{
				'minWidth' : [151,220],
				'priceMin' : 48,
				'priceCM'  : 1.2
			},
			{
				'minWidth' : [221,250],
				'priceMin' : 60,
				'priceCM'  : 1.2
			}			
		],
		'amount' : 50,
		'name': 'Roleta Termo',
		'maxWidth': 250
	},
	'005' : {
		'price' : '300',
		'rabate' : {
			3  : 5,
			10 : 10
		},
		'amount' : 150,
		'name': 'Roleta Mini'
	},

}


// (parseFloat(parseInt(products['001'].price)/currency.us)).toFixed(2)
app.init($('.form-container'));