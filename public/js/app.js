var app = {
	
	container: null,
	button: null,
	selectProduct: null,
	countItems: null,
	currency: 'z�',
	currentItem: null,
	finalPrice: null,
	init: function(container) {		
		this.container = container;
		this.setItems();
		this.bindFunctions();        
        this.initParsley();
	},
    initParsley: function() {
      
      var parsleyConfig = {
          errorsContainer: function (pEle) {
              var $err = pEle.$element.parent().siblings('.custom-errors');
              return $err;
          }
      };
      
      this.container.find('form').parsley(parsleyConfig);
    },
	summary: function() {
		var _this = this;

		var tempPrice = 0;
		tempPrice = _this.countItems.val() * _this.selectProduct.val();

		console.log(tempPrice);
		if(!isNaN(tempPrice)) {
			_this.finalPrice.html('<b>'+tempPrice+_this.currency+'</b>');	
		}
		
	},
	setItems: function() {
		this.button = this.container.find('#countPriceButton');
		this.selectProduct = this.container.find('#product');
		this.finalPrice = this.container.find('.final-price');
		this.countItems = this.container.find('#countItems');	
		this.dropdown   = this.container.find('.dropdown');	
        this.form   = this.container.find('form');	
		// this.maxAmount  = this.container.find('#maxAmount');	
	},
	submit: function() {

	},
	setMaxAmount: function(amount) {
		this.countItems.attr('max', amount);
	},

	bindFunctions: function() {		
		var _this = this;


		this.button.on('click', function() {
			_this.summary();			
//			return false;		
		});
        
        this.form.on('submit', function() {
			if(_this.form.parsley().validate()) {
              
            }	else {
              return false;
            }		        
        });
        
        
		this.dropdown.find('li').on('click', function() {
			var $dropdownElement = $(this);
			
			_this.dropdown.find('li').removeClass('active');
			$dropdownElement.addClass('active');
			_this.currentItem = products[$dropdownElement.find('a').data('product-id')];
			_this.dropdown.find('button').text($dropdownElement.find('a').text());
			_this.setMaxAmount(_this.currentItem.amount);
		});
		// this.countItems.on('keyup', function(e){
		// 	//@todo
		// 	console.log(e);

			
		// });

	}
};

var products  = {
	'001' : {
		'price' : '100',
		'currency' : 'zł',
		'amount' : '100',
		'baseAmount' : '100'
	},
	'002' : {
		'price' : '200',
		'currency' : 'zł',
		'amount' : '100'
	},
	'003' : {
		'price' : '300',
		'currency' : 'zł',
		'amount' : '100'
	},
	'004' : {
		'price' : '400',
		'currency' : 'zł',
		'amount' : '100'
	}
}
/* 1 zlotowa to: */
var currency = {
	'us'  : 3.75,
	'eur' : 4.2	
}
// (parseFloat(parseInt(products['001'].price)/currency.us)).toFixed(2)
app.init($('.form-container'));