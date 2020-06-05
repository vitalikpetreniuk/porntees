var last_item_offset = 10000;
var scrollReaction = true;
var all_products_quantity;
var all_products_position;

var collection_type;
var collection_type_tags;

var nav_length;

var wanted;
var wanted_top;
var wanted_url;
var wanted_num_id;
var wanted_id;
var wanted_variant_id;
var wanted_title;
var wanted_description;
var wanted_price;
var wanted_dataprice;
var wanted_copy_link;
var wanted_tags;
var wanted_color;
var wanted_color_list;
var wanted_sizes;
var wanted_size_chosen;
var wanted_variants;
var wanted_size_id;
var cart_items;
var wanted_real_size_quantity;

var link_loaded_product_id;

var jsonData = {
  "apikey": "bea6cec61f7be37947628f7a62e340db",
  "Password": "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"
};

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);}
var checker = (arr, target) => target.every(v => arr.includes(v));
function ajaxProductLoader(){

	products_count = 0;
	product_ajax_images = '';
	uploaded_products = '';
  

	$.ajax({
		url: '/products.json',
		type: "get",
		dataType: "json",
		data: jsonData,
		success: function (data) {
			var products = data.products;
			console.log(products);
			products_count = $('.products-list .product-item').length;

			// console.log(products_count);
			// console.log(products.length);

			if(products_count<products.length)
			{
				if($('body.link-loaded-product').length)
				{
					products_count = products_count -1;

					for(var ac = products_count;ac<products_count+5;ac++)
					{
						if(ac<products.length)
						{
							if(products[ac].id !== link_loaded_product_id)
							{
								var tgp_price = parseInt(products[ac].variants[0].price.split('.'));
							  	var tgp_data_price = parseInt(products[ac].variants[0].price.split('.'))*100;
							  	var product_ajax_images = '';

							  	if(products[ac].images.length > 0)
							  	{
						  			for(var ti=0;ti<products[ac].images.length;ti++)
						  			{
						  				product_ajax_images += '<div class="item"><img class="product-image lazyload" src="'+products[ac].images[ti].src+'" alt="'+products[ac].title+'"></div>';
						  			}
							  	}

								uploaded_products += '<div class="product-item ajax-loaded" id="product-'+products[ac].id+'" data-id="'+products[ac].id+'" data-url="/product/'+products[ac].handle+'">'+
									'<div class="product-gallery owl-carousel">'+product_ajax_images+'</div>'+
									'<div class="product-info">'+
										'<div class="pi-left">'+
											'<h2 class="product-title">'+products[ac].title+'.</h2>'+
											'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
											'<div class="product-tags" style="display:none">'+products[ac].tags.join(',')+'</div>'+
											// '<div class="product-tags" style="display:none">'+products[ac].tags.split(', ').join(',')+'</div>'+
											'<div class="product-type" style="display:none">'+products[ac].product_type+'</div>'+
										'</div>'+
										'<div class="pi-right">'+
											'<button class="want-this"><span class="want">want</span></button>'+
										'</div>'+
									'</div>'+
									'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
								'</div>';
							}
						}
					}
				}else
				{
					for(var ac = products_count;ac<products_count+5;ac++)
					{
						if(ac<products.length)
						{
							var tgp_price = parseInt(products[ac].variants[0].price.split('.'));
						  	var tgp_data_price = parseInt(products[ac].variants[0].price.split('.'))*100;
						  	var product_ajax_images = '';

						  	if(products[ac].images.length > 0)
						  	{
					  			for(var ti=0;ti<products[ac].images.length;ti++)
					  			{
					  				product_ajax_images += '<div class="item"><img class="product-image lazyload" src="'+products[ac].images[ti].src+'" alt="'+products[ac].title+'"></div>';
					  			}
						  	}

							uploaded_products += '<div class="product-item ajax-loaded" id="product-'+products[ac].id+'" data-id="'+products[ac].id+'" data-url="/product/'+products[ac].handle+'">'+
								'<div class="product-gallery owl-carousel">'+product_ajax_images+'</div>'+
								'<div class="product-info">'+
									'<div class="pi-left">'+
										'<h2 class="product-title">'+products[ac].title+'.</h2>'+
										'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
										'<div class="product-tags" style="display:none">'+products[ac].tags.join(',')+'</div>'+
										// '<div class="product-tags" style="display:none">'+products[ac].tags.split(', ').join(',')+'</div>'+
										'<div class="product-type" style="display:none">'+products[ac].product_type+'</div>'+
									'</div>'+
									'<div class="pi-right">'+
										'<button class="want-this"><span class="want">want</span></button>'+
									'</div>'+
								'</div>'+
								'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
							'</div>';
						}
					}
				}



				$('.products-list').append(uploaded_products);

				$('.products-list .product-item.ajax-loaded').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

				    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
				    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

				    	var $this = $(this);
				    	setTimeout(function(){
							$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

							setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
								$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
							},160);
						},5);

				    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
				  	}).owlCarousel({
					    loop:true,
					    nav:true,
					    dots:false,
					    autoWidth:true,
					    items:1
				  	});
				});

				$('.products-list .product-item.ajax-loaded').removeClass('ajax-loaded');

				last_item_offset = $('.products-list .product-item:last-child').offset().top - 200;

				scrollReaction = true;
			}
		},
		error: function(request, error) {
		     console.log(arguments);
		     console.log(" Can't do because: " + error);
		}
	});}
function collectionLoad(){

	var collection_products = '';
	var chosen_type = $('.tees-nav > ul > li.active a span').text();

	if(chosen_type.indexOf(' ') > 0)
	{
		chosen_type = chosen_type.split(' ').join('-');
	}

	$.ajax({
		url: '/products.json',
		type: "get",
		dataType: "json",
		data: jsonData,
		success: function (data) {
			var products = data.products;
			// console.log(products);

			for(var q=0;q<products.length;q++)
			{
				if(products[q].product_type === chosen_type)
				{
					var tgp_price = parseInt(products[q].variants[0].price.split('.'));
				  	var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
				  	var tagged_images = '';

				  	if(products[q].images.length > 0)
				  	{
			  			for(var ti=0;ti<products[q].images.length;ti++)
			  			{
			  				tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
			  			}
				  	}

				  	collection_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[q].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
								// '<div class="product-tags" style="display:none">'+products[q].tags.split(', ').join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
					'</div>';
				}
			}


			// console.log(collection_products);

			$('html, body').animate({ scrollTop: 0 },1);
			$('.products-list').html(collection_products);

			// var pushUrl = '/collections/'+ chosen_type.toLowerCase().split('#')[1];

			// history.pushState({
			//     id: 'products-'+pushUrl
			// }, chosen_type, pushUrl);

			$('.products-list .product-item.collection-item').each(function(){
			  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
				    if (!e.namespace)  {
				      return;
				    }
			    	var carousel = e.relatedTarget;
			    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

			    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
			    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

			    	var $this = $(this);
			    	setTimeout(function(){
						$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

						setTimeout(function(){
							$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
							$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
						},160);
					},5);

			    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
			  	}).owlCarousel({
				    loop:true,
				    nav:true,
				    dots:false,
				    autoWidth:true,
				    items:1
			  	});
			});

			setTimeout(function(){
				$('.products-list').removeClass('loading');
			}, 1000);




		  
		},
		error: function(request, error) {
		     console.log(arguments);
		     console.log(" Can't do because: " + error);
		}
	});
}
function collectionTagsLoad(){
	$('.products-list').addClass('loading');
	console.log(collection_type_tags);

	if(collection_type_tags.length > 0)
	{
		$.ajax({
			url: '/products.json',
			type: "get",
			dataType: "json",
			data: jsonData,
			success: function (data) {
				var products = data.products;


				var collection_product_type;
				var collection_product_tags;
				var chosen = [];
				var tagged_products = '';
				var type_tags = [];
				var size_tags = [];

				for(var ctt = 0;ctt<collection_type_tags.length;ctt++)
				{
					if(collection_type_tags[ctt] !== '#s' && collection_type_tags[ctt] !== '#m' && collection_type_tags[ctt] !== '#l' && collection_type_tags[ctt] !== '#xl' && collection_type_tags[ctt] !== '#xxl')
					{
						type_tags.push(collection_type_tags[ctt]);
					}else
					{
						size_tags.push(collection_type_tags[ctt]);
					}
				}

				for(var q=0;q<products.length;q++)
				{
					collection_product_type = products[q].product_type;

					if(collection_product_type === collection_type)
					{
						collection_product_tags = products[q].tags;

						if(type_tags.length>0)
						{
							for(var tt=0;tt<type_tags.length;tt++)
							{
								if(collection_product_tags.indexOf(type_tags[tt]) > -1)
								{
									if(checker(collection_product_tags, size_tags) === true)
									{
										chosen.push(q);
									}
								}
							}
						}else
						{
							if(checker(collection_product_tags, size_tags) === true)
							{
								chosen.push(q);
							}
						}
					}
					
				}

				if(chosen.length>0)
				{
					$('body').removeClass('na-items');

					for(var ch=0;ch<chosen.length;ch++)
					{
						var tgp_price = parseInt(products[chosen[ch]].variants[0].price.split('.'));
						var tgp_data_price = parseInt(products[chosen[ch]].variants[0].price.split('.'))*100;var tagged_images = '';

						if(products[chosen[ch]].images.length > 0)
						{
							for(var ti=0;ti<products[chosen[ch]].images.length;ti++)
							{
								tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[chosen[ch]].images[ti].src+'" alt="'+products[chosen[ch]].title+'"></div>';
							}
						}

						tagged_products += '<div class="product-item tag-item" id="product-'+products[chosen[ch]].id+'" data-id="'+products[ch].id+'" data-url="/product/'+products[ch].handle+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[chosen[ch]].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[chosen[ch]].tags.join(',')+'</div>'+
								// '<div class="product-tags" style="display:none">'+products[chosen[ch]].tags.split(', ').join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[chosen[ch]].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
					'</div>';
					}
				}else
				{
					$('body').addClass('na-items');
				}

				$('html, body').animate({ scrollTop: 0 },1);
				$('.products-list').html(tagged_products);

				// var pushUrl = '/collections/'+ chosen_type.toLowerCase().split('#')[1];

				// history.pushState({
				//     id: 'products-'+pushUrl
				// }, chosen_type, pushUrl);

				$('.products-list .product-item.tag-item').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

				    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
				    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

				    	var $this = $(this);
				    	setTimeout(function(){
							$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

							setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
								$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
							},160);
						},5);

				    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
				  	}).owlCarousel({
					    loop:true,
					    nav:true,
					    dots:false,
					    autoWidth:true,
					    items:1
				  	});
				});

				setTimeout(function(){
					$('.products-list').removeClass('loading');
				}, 1000);


			  
			},
			error: function(request, error) {
			     console.log(arguments);
			     console.log(" Can't do because: " + error);
			}
		});
	}else
	{
		$('body').removeClass('na-items');
		collectionLoad();
	}}
function colorandsizeTagsLoad(){
	$('.products-list').addClass('loading');

	if(collection_type_tags.length > 0)
	{
		$.ajax({
			url: '/products.json',
			type: "get",
			dataType: "json",
			data: jsonData,
			success: function (data) {
				var products = data.products;
				// console.log(products);

				var collection_product_tags;
				var chosen = [];
				var tagged_products = '';
				var color_tags = [];
				var size_tags = [];

				for(var ctt = 0;ctt<collection_type_tags.length;ctt++)
				{
					if(collection_type_tags[ctt] !== '#s' && collection_type_tags[ctt] !== '#m' && collection_type_tags[ctt] !== '#l' && collection_type_tags[ctt] !== '#xl' && collection_type_tags[ctt] !== '#xxl')
					{
						color_tags.push(collection_type_tags[ctt]);
					}else
					{
						size_tags.push(collection_type_tags[ctt]);
					}
				}

				for(var q=0;q<products.length;q++)
				{
					collection_product_tags = products[q].tags;

					if(color_tags.length>0)
					{
						for(var ct=0;ct<color_tags.length;ct++)
						{
							if(collection_product_tags.indexOf(color_tags[ct]) > -1)
							{
								if(checker(collection_product_tags, size_tags) === true)
								{
									chosen.push(q);
								}
							}
						}
					}else
					{
						if(checker(collection_product_tags, size_tags) === true)
						{
							chosen.push(q);
						}
					}
					
				}
				if(chosen.length>0)
				{
					$('body').removeClass('na-items');

					for(var ch=0;ch<chosen.length;ch++)
					{
						var tgp_price = parseInt(products[chosen[ch]].variants[0].price.split('.'));
						var tgp_data_price = parseInt(products[chosen[ch]].variants[0].price.split('.'))*100;
						var tagged_images = '';

						if(products[chosen[ch]].images.length > 0)
						{
							for(var ti=0;ti<products[chosen[ch]].images.length;ti++)
							{
								tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[chosen[ch]].images[ti].src+'" alt="'+products[chosen[ch]].title+'"></div>';
							}
						}

						tagged_products += '<div class="product-item cs-item" id="product-'+products[chosen[ch]].id+'" data-id="'+products[ch].id+'" data-url="/product/'+products[ch].handle+'">'+
						'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[chosen[ch]].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[chosen[ch]].tags.join(',')+'</div>'+
								// '<div class="product-tags" style="display:none">'+products[chosen[ch]].tags.split(', ').join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[chosen[ch]].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
						'</div>';
					}
				}else
				{
					$('body').addClass('na-items');
				}

				$('html, body').animate({ scrollTop: 0 },1);
				$('.products-list').html(tagged_products);

				$('.products-list .product-item.cs-item').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

				    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
				    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

				    	var $this = $(this);
				    	setTimeout(function(){
							$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

							setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
								$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
							},160);
						},5);

				    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
				  	}).owlCarousel({
					    loop:true,
					    nav:true,
					    dots:false,
					    autoWidth:true,
					    items:1
				  	});
				});

				setTimeout(function(){
					$('.products-list').removeClass('loading');
				}, 1000);
			  
			},
			error: function(request, error) {
			     console.log(arguments);
			     console.log(" Can't do because: " + error);
			}
		});
	}else
	{
		$('body').removeClass('na-items');

		$.ajax({
			url: '/products.json',
			type: "get",
			dataType: "json",
			data: jsonData,
			success: function (data) {
				var products = data.products;
				// console.log(products);

				var all_products = '';

				for(var q=0;q<all_products_quantity;q++)
				{
					// console.log(products[q]);

					var tgp_price = parseInt(products[q].variants[0].price.split('.'));
					var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
					var tagged_images = '';

					if(products[q].images.length > 0)
					{
						for(var ti=0;ti<products[q].images.length;ti++)
						{
							tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
						}
					}

					all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
						'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
					'<div class="product-info">'+
						'<div class="pi-left">'+
							'<h2 class="product-title">'+products[q].title+'.</h2>'+
							'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
							'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
							'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
						'</div>'+
						'<div class="pi-right">'+
							'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
						'</div>'+
					'</div>'+
					'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
				'</div>';
				}

			  	// console.log(all_products);

			  	$('html, body').animate({ scrollTop: 0 },1);
				$('.products-list').html(all_products);

				$('.products-list .product-item').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
			    		var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

				    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
				    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

				    	var $this = $(this);
				    	setTimeout(function(){
							$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

							setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
								$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
							},160);
						},5);

				    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
				  	}).owlCarousel({
					    loop:true,
					    nav:true,
					    dots:false,
					    autoWidth:true,
					    items:1
				  	});
				});

				setTimeout(function(){
					$('.products-list').removeClass('loading');
				}, 1100);
			},
			error: function(request, error) {
			     console.log(arguments);
			     console.log(" Can't do because: " + error);
			}
		});
	}}
function closeProductConfig(){

	$('body').removeClass('pc-on-screen');
	$('.product-configurations').removeClass('on-screen');
	$('.product-configurations-overlay').removeClass('show');

	$('.product-configurations').attr('data-url', '');
	$('.product-configurations').attr('data-id', '');
	$('.product-configurations').find('.pcd-title').html('');
	$('.product-configurations').find('.pcd-info').html('');
	$('.product-configurations').find('.pcd-price span').html('0');
	$('.product-configurations').find('.pcd-price span').attr('data-price', '0');
	$('.product-configurations').find('.pcp-price span').html('0');
	$('.product-configurations').find('.pcp-price span').attr('data-price', '0');
	$('.product-configurations').find('.pcp-share').removeClass('share-active');
	$('.product-configurations').find('.pcp-share .copy-link').removeClass('copied');
	$('.product-configurations').find('.pc-color li').removeClass('disabled');
	$('.product-configurations').find('.pc-color li.active').removeClass('active');
	$('.product-configurations').find('.pc-size ul li').removeClass('out-of-stock');
}

$(function(){

	nav_length = $('.tees-nav > ul > li').length-1;

	if($(window).width()<1100 && $(window).width()>600)
	{
		var mm_content_height = $(window).height() - 80;
		$('body #shopify-section-header .mobile-menu .mm-content').height(mm_content_height);
	}else if($(window).width()<=600)
	{
		var mm_content_height = $(window).height() - 72;
		$('body #shopify-section-header .mobile-menu .mm-content').height(mm_content_height);
	}

	$('.tees-slider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
	    if (!e.namespace)  {
	      return;
	    }
    	var carousel = e.relatedTarget;
    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

    	$('.tees-slider-counter').find('span.current').append('<span>'+changing_number+'</span>');
    	$('.tees-slider-counter').find('span.total').text(carousel.items().length);

    	setTimeout(function(){
			$('.tees-slider-counter').find('span.current').addClass('changing');

			setTimeout(function(){
				$('.tees-slider-counter').find('span.current span:nth-child(1)').remove();
				$('.tees-slider-counter').find('span.current').removeClass('changing');
			},160);
		},5);

    	// $('.tees-slider-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);

  	}).owlCarousel({
	    loop:true,
	    nav:true,
	    dots:false,
	    items:1
  	});

  	$('.homepage-slider').on('mousemove', function(e){
  		if($(window).width() > 1099)
  		{
		    $('.tees-slider-counter').css({
		       left:  e.pageX,
		       top:   e.pageY+37
		    });
  		}
	});

	// console.log(window.location.pathname);

  	// if($('.products-list').length)
  	if(window.location.pathname === '/collections/all')
  	{
  		var product_item_price;
  		var product_item_tags;
  		var product_item_type;

  		var products_count;
		var product_ajax_images;
		var uploaded_products;

		var find_product_url;
		var find_product_url_short;
		var find_offset;
		var find_tags;
		var find_loaded_product = '';


		if(window.location.search.indexOf('?product') > -1)
        {
            find_product_url = window.location.search.split('=');
            find_product_url_short = '/products/'+find_product_url[1];

            if($('.product-item[data-url="'+find_product_url_short+'"]').length)
            {
    			setTimeout(function(){
					find_offset = $('.product-item[data-url="'+find_product_url_short+'"]').offset().top;
					$('html,body').animate({scrollTop: find_offset-74},1);

					setTimeout(function(){
						$('.products-list').removeClass('loading');
					}, 100);
    			},1500);
    		}else
    		{
    			jQuery.getJSON(find_product_url_short + '.js', function(product) {

    				link_loaded_product_id = product.id;
    				// console.log(link_loaded_product_id);

					var tgp_price = parseInt(product.price)/100;
					var tgp_data_price = parseInt(product.price);
					var tagged_images = '';

					find_tags = product.tags.join(',');

					// console.log(tgp_price);
					// console.log(tgp_data_price);

					if(product.images.length > 0)
					{
						for(var ti=0;ti<product.images.length;ti++)
						{
							tagged_images += '<div class="item"><img class="product-image lazyload" src="'+product.images[ti]+'" alt="'+product.title+'"></div>';
						}
					}

					find_loaded_product += '<div class="product-item ajax-loaded" id="product-'+product.id+'" data-id="'+product.id+'" data-url="/product/'+product.handle+'">'+
						'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+product.title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+find_tags+'</div>'+
								'<div class="product-type" style="display:none">'+product.product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
					'</div>'; 

			    	$('.products-list').prepend(find_loaded_product);

				  	$('.products-list .product-item.ajax-loaded').each(function(){

					  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
						    if (!e.namespace)  {
						      return;
						    }
					    	var carousel = e.relatedTarget;
					    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

					    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
					    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

					    	var $this = $(this);
					    	setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

								setTimeout(function(){
									$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
									$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
								},160);
							},5);

					    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
					  	}).owlCarousel({
						    loop:true,
						    nav:true,
						    dots:false,
						    autoWidth:true,
						    items:1
					  	});
					});

				  	$('.products-list .product-item.ajax-loaded').removeClass('ajax-loaded');

				  	$('html, body').animate({ scrollTop: 0 },1);

					setTimeout(function(){
						$('.products-list').removeClass('loading');
					}, 1000);
			    });

			    $('body').addClass('link-loaded-product');
    		}
        }else
        {
    		if(localStorage.getItem('category'))
    		{

    			$('.mm-mainmenu ul li').each(function(){
					if($(this).find('.tees-nav_label').text() === localStorage.getItem('category'))
					{
						$(this).addClass('active');
					}
    			});

    			if(localStorage.getItem('tags'))
    			{
    				collection_type_tags = localStorage.getItem('tags').split(',');

	    			for(var lst=0;lst<collection_type_tags.length;lst++)
	    			{
	    				$('.mm-mainmenu > ul > li.active > .tees-nav_tags > span[data-tag="'+collection_type_tags[lst]+'"]').addClass('active');
	    			}

	    			if(localStorage.getItem('category') === '#COLOR&SIZE')
	    			{
						colorandsizeTagsLoad();
	    			}else
	    			{

	    				if(localStorage.getItem('category').indexOf(' '))
						{
							collection_type = localStorage.getItem('category').split(' ').join('-');
						}else
						{
							collection_type = localStorage.getItem('category');
						}

						collectionTagsLoad();
	    			}
    			}else
    			{
	    			if(localStorage.getItem('category') === '#COLOR&SIZE')
	    			{
	    				$.ajax({
							url: '/products.json',
							type: "get",
							dataType: "json",
							data: jsonData,
							success: function (data) {
								var products = data.products;

								var all_products = '';

								for(var q=0;q<5;q++)
								{
									// console.log(products[q]);

									var tgp_price = parseInt(products[q].variants[0].price.split('.'));
									var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
									var tagged_images = '';

									if(products[q].images.length > 0)
									{
										for(var ti=0;ti<products[q].images.length;ti++)
										{
											tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
										}
									}

									all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
										'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
										'<div class="product-info">'+
											'<div class="pi-left">'+
												'<h2 class="product-title">'+products[q].title+'.</h2>'+
												'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
												'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
												'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
											'</div>'+
											'<div class="pi-right">'+
												'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
											'</div>'+
										'</div>'+
										'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
									'</div>';
								}

							  	// console.log(all_products);

							  	if(localStorage.getItem('products-list-position'))
							  	{
							  		$('html, body').animate({ scrollTop: localStorage.getItem('products-list-position') },1);
							  		localStorage.removeItem('products-list-position');
							  	}else
							  	{
							  		$('html, body').animate({ scrollTop: 0 },1);
							  	}
								$('.products-list').html(all_products);

								$('.products-list .product-item').each(function(){
								  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
									    if (!e.namespace)  {
									      return;
									    }
								    	var carousel = e.relatedTarget;
								    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

								    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
								    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

								    	var $this = $(this);
								    	setTimeout(function(){
											$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

											setTimeout(function(){
												$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
												$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
											},160);
										},5);

								    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
								  	}).owlCarousel({
									    loop:true,
									    nav:true,
									    dots:false,
									    autoWidth:true,
									    items:1
								  	});
								});
								setTimeout(function(){
									$('.products-list').removeClass('loading');
								}, 1100);
							},
							error: function(request, error) {
							     console.log(arguments);
							     console.log(" Can't do because: " + error);
							}
						});
	    			}else
	    			{
	    				var collection_products = '';
						var chosen_type = localStorage.getItem('category');

						if(chosen_type.indexOf(' ') > 0)
						{
							chosen_type = chosen_type.split(' ').join('-');
						}

						$.ajax({
							url: '/products.json',
							type: "get",
							dataType: "json",
							data: jsonData,
							success: function (data) {
								var products = data.products;
								// console.log(products);

								for(var q=0;q<products.length;q++)
								{
									if(products[q].product_type === chosen_type)
									{
										var tgp_price = parseInt(products[q].variants[0].price.split('.'));
									  	var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
									  	var tagged_images = '';

									  	if(products[q].images.length > 0)
									  	{
								  			for(var ti=0;ti<products[q].images.length;ti++)
								  			{
								  				tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
								  			}
									  	}

									  	collection_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
												'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
											'<div class="product-info">'+
												'<div class="pi-left">'+
													'<h2 class="product-title">'+products[q].title+'.</h2>'+
													'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
													'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
													// '<div class="product-tags" style="display:none">'+products[q].tags.split(', ').join(',')+'</div>'+
													'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
												'</div>'+
												'<div class="pi-right">'+
													'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
												'</div>'+
											'</div>'+
											'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
										'</div>';
									}
								}


								// console.log(collection_products);

								$('html, body').animate({ scrollTop: 0 },1);
								$('.products-list').html(collection_products);

								$('.products-list .product-item.collection-item').each(function(){
								  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
									    if (!e.namespace)  {
									      return;
									    }
								    	var carousel = e.relatedTarget;
								    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

								    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
								    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

								    	var $this = $(this);
								    	setTimeout(function(){
											$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

											setTimeout(function(){
												$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
												$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
											},160);
										},5);

								    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
								  	}).owlCarousel({
									    loop:true,
									    nav:true,
									    dots:false,
									    autoWidth:true,
									    items:1
								  	});
								});

								setTimeout(function(){
									$('.products-list').removeClass('loading');
								}, 1000);




							  
							},
							error: function(request, error) {
							     console.log(arguments);
							     console.log(" Can't do because: " + error);
							}
						});
	    			}
    			}

    			localStorage.removeItem('category');
    			if(localStorage.getItem('tags'))
    			{
    				localStorage.removeItem('tags');
    			}
    		}else
    		{
	        	$.ajax({
					url: '/products.json',
					type: "get",
					dataType: "json",
					data: jsonData,
					success: function (data) {
						var products = data.products;

						var all_products = '';

						for(var q=0;q<5;q++)
						{
							// console.log(products[q]);

							var tgp_price = parseInt(products[q].variants[0].price.split('.'));
							var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
							var tagged_images = '';

							if(products[q].images.length > 0)
							{
								for(var ti=0;ti<products[q].images.length;ti++)
								{
									tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
								}
							}

							all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
								'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
								'<div class="product-info">'+
									'<div class="pi-left">'+
										'<h2 class="product-title">'+products[q].title+'.</h2>'+
										'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
										'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
										'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
									'</div>'+
									'<div class="pi-right">'+
										'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
									'</div>'+
								'</div>'+
								'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
							'</div>';
						}

					  	// console.log(all_products);

					  	if(localStorage.getItem('products-list-position'))
					  	{
					  		$('html, body').animate({ scrollTop: localStorage.getItem('products-list-position') },1);
					  		localStorage.removeItem('products-list-position');
					  	}else
					  	{
					  		$('html, body').animate({ scrollTop: 0 },1);
					  	}
						$('.products-list').html(all_products);

						// $(document).attr('title', 'AJAX title');
						// $('head').append('<meta name="description" content="Dynamic Description after ajax success.">');


						$('.products-list .product-item').each(function(){
						  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
							    if (!e.namespace)  {
							      return;
							    }
						    	var carousel = e.relatedTarget;
						    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

						    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
						    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

						    	var $this = $(this);
						    	setTimeout(function(){
									$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

									setTimeout(function(){
										$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
										$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
									},160);
								},5);

						    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
						  	}).owlCarousel({
							    loop:true,
							    nav:true,
							    dots:false,
							    autoWidth:true,
							    items:1
						  	});
						});
						setTimeout(function(){

							$('.products-list').removeClass('loading');
						}, 1100);
					},
					error: function(request, error) {
					     console.log(arguments);
					     console.log(" Can't do because: " + error);
					}
				});
    		}
        }

		setTimeout(function(){
			last_item_offset = $('.products-list .product-item:last-child').offset().top - 200;
		},2000);

		$('.products-list .product-item').each(function(){
			product_item_price = parseInt($(this).find('.product-price').attr('data-price'))/100;
			$(this).find('.product-price span').text(product_item_price);

			$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
			    if (!e.namespace)  {
			      return;
			    }
		    	var carousel = e.relatedTarget;
				var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

		    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
		    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

		    	var $this = $(this);
		    	setTimeout(function(){
					$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

					setTimeout(function(){
						$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
						$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
					},160);
				},5);

		    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
		  	}).owlCarousel({
			    loop:true,
			    nav:true,
			    dots:false,
			    autoWidth:true,
			    items:1
		  	});

		  	product_item_tags = $(this).find('.product-tags').text();
		  	product_item_tags = product_item_tags;

		  	product_item_type = $(this).find('.product-type').text();
		  	product_item_type = 'type_'+product_item_type.split('#')[1].toLowerCase();
		  	$(this).addClass(product_item_type);
		});

		$(window).on('scroll', function(){
			if($(window).width()>1099)
			{
				if($('.tees-nav > ul > li.active').length === 0)
				{
					if(scrollReaction === true)
					{
					    if($(window).scrollTop() > last_item_offset)
					    {
					        ajaxProductLoader();
					        scrollReaction = false;
					    }
					}
				}
			}else
			{
				if($('.mm-mainmenu > ul > li.active').length === 0)
				{
					if(scrollReaction === true)
					{
					    if($(window).scrollTop() > last_item_offset)
					    {
					        ajaxProductLoader();
					        scrollReaction = false;
					    }
					}
				}
			}
		});
  	}

  	$.ajax({
	    url: '/products.json',
	    type: "get",
      	dataType: "json",
	    success: function (data) {
	      var products = data.products;

	      var product_type;
	      var product_tags;
	      var typetag_list = [];
	      var typetag_item;

	      for(var q=0;q<products.length;q++)
	      {
	      	product_type = products[q].product_type.toLowerCase();
	      	product_tags = products[q].tags;

	      	for(var pt=0;pt<product_tags.length;pt++)
	      	{
	      		if(product_tags[pt].indexOf('#') > -1)
	      		{
		      		typetag_item = product_type+'_'+product_tags[pt];
		      		typetag_list.indexOf(typetag_item) === -1 ? typetag_list.push(typetag_item) : console.log();
	      		}
	      	}
	      }

	      for(var tti=0;tti<typetag_list.length;tti++)
	      {
	      	var tti_type = typetag_list[tti].split('_')[0];

      		$('.tees-nav > ul > li').each(function(){
      			var nav_title;

      			if($(this).find('.tees-nav_label').text().toLowerCase().includes(' '))
      			{
      				nav_title = $(this).find('.tees-nav_label').text().toLowerCase().split(' ').join('-');
      			}else
      			{
  					nav_title = $(this).find('.tees-nav_label').text().toLowerCase();
      			}

      			if(nav_title === tti_type)
      			{
      				// $(this).find('.tees-nav_tags').append('<span data-tag="'+typetag_list[tti].split('_')[1]+'">'+typetag_list[tti].split('_')[1]+'</span>');
      			}
      		});
	      }
	      
	    },
	    error: function(request, error) {
	         console.log(arguments);
	         console.log(" Can't do because: " + error);
	    }
	});

  	if(window.location.pathname.indexOf('/collections/') > -1 && window.location.pathname.indexOf('/collections/all') === -1)
  	{	
  		$('.tees-nav').addClass('tees-subnav-show');
  	}

  	$('.site-footer__item:nth-child(3) div p:nth-child(3)').on('click tap', function(){
  		$('.site-footer__item:nth-child(3)').addClass('active');
		$('.site-footer__item:nth-child(4)').addClass('show');
  	});
  	


  	/* COLLECTION LOAD ======================================================================================== */

  	$('.tees-nav > ul > li:not(:last-child) > a').on('click', function(e){
  		e.preventDefault();

  		closeProductConfig();

  		if($('.tees-nav > ul > li.active').length)
  		{}else
  		{
			all_products_quantity = $('.products-list .product-item').length;
			all_products_position = $(window).scrollTop();
  		}

  		if($(this).parent().hasClass('active'))
  		{
			$('.tees-nav').removeClass('tees-subnav-show');
			$('.products-list').addClass('loading');

			$(this).parent().removeClass('active');
			$(this).parent().find('.tees-nav_tags span').removeClass('active');

			console.log(all_products_quantity);

  			$.ajax({
				url: '/products.json',
				type: "get",
				dataType: "json",
				data: jsonData,
				success: function (data) {
					var products = data.products;

					var all_products = '';

					for(var q=0;q<all_products_quantity;q++)
					{
						console.log(products[q]);

						var tgp_price = parseInt(products[q].variants[0].price.split('.'));
						var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
						var tagged_images = '';

						if(products[q].images.length > 0)
						{
							for(var ti=0;ti<products[q].images.length;ti++)
							{
								tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
							}
						}

						all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
							'<div class="product-info">'+
								'<div class="pi-left">'+
									'<h2 class="product-title">'+products[q].title+'.</h2>'+
									'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
									'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
									'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
								'</div>'+
								'<div class="pi-right">'+
									'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
								'</div>'+
							'</div>'+
							'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
						'</div>';
					}

				  	// console.log(all_products);

				  	$('html, body').animate({ scrollTop: 0 },1);
					$('.products-list').html(all_products);

					// history.pushState({
					//     id: 'products-all'
					// }, 'PRODUCTS', '/collections/all');

					$('.products-list .product-item').each(function(){
					  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
						    if (!e.namespace)  {
						      return;
						    }
					    	var carousel = e.relatedTarget;
					    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

					    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
					    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

					    	var $this = $(this);
					    	setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

								setTimeout(function(){
									$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
									$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
								},160);
							},5);

					    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
					  	}).owlCarousel({
						    loop:true,
						    nav:true,
						    dots:false,
						    autoWidth:true,
						    items:1
					  	});
					});
					$('.tees-nav > ul > li').removeClass('active');

					setTimeout(function(){
						$('html, body').animate({ scrollTop: all_products_position },1);
					}, 1000);
					setTimeout(function(){
						$('.products-list').removeClass('loading');
					}, 1100);


				  
				},
				error: function(request, error) {
				     console.log(arguments);
				     console.log(" Can't do because: " + error);
				}
			});
  		}else
  		{
  			$('body').removeClass('link-loaded-product');
			$('.tees-nav > ul > li').removeClass('active');
			$(this).parent().addClass('active');


			$('.products-list').addClass('loading');

  			collectionLoad();

  			setTimeout(function(){
  				$('.tees-nav').addClass('tees-subnav-show');
  			},150);
  		}
  	});

	/* COLLECTION TAGS LOAD ================================================================================== */

  	$('body').on('click', '.tees-nav .tees-nav_tags span', function(){

  		closeProductConfig();
	
		if($(this).hasClass('active'))
		{
			console.log('has active');
			$(this).removeClass('active');
			$(this).addClass('non-active-hovered');
		}else
		{
			console.log('no active');
			$(this).addClass('active');
			$(this).removeClass('non-active-hovered');
		}

  		if($(this).parents('li').index() === nav_length)
  		{
	  		collection_type_tags = [];

			$(this).parent().find('span').each(function(){
	  			if($(this).hasClass('active'))
	  			{
	  				collection_type_tags.push($(this).attr('data-tag'));
	  			}
	  		});
	  		colorandsizeTagsLoad();
  		}else
  		{
			if($(this).parents('li').find('a.tees-nav_link span').text().indexOf(' '))
			{
				collection_type = $(this).parents('li').find('a.tees-nav_link span').text().split(' ').join('-');
			}else
			{
				collection_type = $(this).parents('li').find('a.tees-nav_link span').text();
			}

			collection_type_tags = [];
			$(this).parent().find('span').each(function(){
				if($(this).hasClass('active'))
				{
					collection_type_tags.push($(this).attr('data-tag'));
				}
			});
	  		collectionTagsLoad();
  		}
  	});
  	$('body').on('mouseleave', '.tees-nav .tees-nav_tags span.non-active-hovered', function(){
  		$(this).removeClass('non-active-hovered');
	});

	/* COLOR & SIZE TAGS LOAD =============================================================================== */

  	$('.tees-nav > ul > li:last-child > a').on('click', function(e){
  		e.preventDefault();

  		closeProductConfig()

  		if($(this).parent().hasClass('active'))
  		{
  			$('.tees-nav').removeClass('tees-subnav-show');
			$('.products-list').addClass('loading');

			$(this).parent().removeClass('active');
			$(this).parent().find('.tees-nav_tags.tees-nav_tags-cs span').removeClass('active');

  			// console.log(all_products_quantity);
  			// console.log(all_products_position);

  			$.ajax({
				url: '/products.json',
				type: "get",
				dataType: "json",
				data: jsonData,
				success: function (data) {
					var products = data.products;
					// console.log(products);

					var all_products = '';

					for(var q=0;q<all_products_quantity;q++)
					{
						// console.log(products[q]);

						var tgp_price = parseInt(products[q].variants[0].price.split('.'));
						var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
						var tagged_images = '';

						if(products[q].images.length > 0)
						{
							for(var ti=0;ti<products[q].images.length;ti++)
							{
								tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
							}
						}

						all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[q].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
					'</div>';
					}

				  	// console.log(all_products);

				  	$('html, body').animate({ scrollTop: 0 },1);
					$('.products-list').html(all_products);

					$('.products-list .product-item').each(function(){
					  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
						    if (!e.namespace)  {
						      return;
						    }
					    	var carousel = e.relatedTarget;
					    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

					    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
					    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

					    	var $this = $(this);
					    	setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

								setTimeout(function(){
									$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
									$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
								},160);
							},5);

					    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
					  	}).owlCarousel({
						    loop:true,
						    nav:true,
						    dots:false,
						    autoWidth:true,
						    items:1
					  	});
					});
					$('.tees-nav > ul > li').removeClass('active');

					setTimeout(function(){
						$('html, body').animate({ scrollTop: all_products_position },1);
					}, 1000);
					setTimeout(function(){
						$('.products-list').removeClass('loading');
					}, 1100);


				  
				},
				error: function(request, error) {
				     console.log(arguments);
				     console.log(" Can't do because: " + error);
				}
			});
  		}else
  		{
  			$('body').removeClass('link-loaded-product');
			$('.tees-nav > ul > li').removeClass('active');
			$(this).parent().addClass('active');

			all_products_quantity = $('.products-list .product-item').length;
			all_products_position = $(window).scrollTop();

  			setTimeout(function(){
  				$('.tees-nav').addClass('tees-subnav-show');
  			},150);
  		}
  	});

  	/* CHANGE COLOR (click) ================================================================ */

  	$('.pc-color ul li').on('click', function(e){
  		e.preventDefault();

  		var chosen_id;
  		var color_tag = 'color_'+$(this).attr('data-color');
  		var id_tag = 'id_'+ $('.product-configurations').attr('data-id');

  		$('.pc-color ul li').removeClass('active');
  		$(this).addClass('active');

  		// console.log(color_tag);
  		// console.log(id_tag);

  		$.ajax({
	    url: '/products.json',
	    type: "get",
	    dataType: "json",
	    data: jsonData,
	    success: function (data) {
			var products = data.products;

			for(var q=0;q<products.length;q++)
			{ 
				if(products[q].tags.indexOf(id_tag) > -1 && products[q].tags.indexOf(color_tag) > -1)
				{
					chosen_id = products[q].id;
				}
			}

			if($('.product-item[data-id="'+chosen_id+'"]').length)
			{
				// $('.product-configurations').addClass('hidden');

				var color_offset = $('.product-item[data-id="'+chosen_id+'"]').offset().top;
				$('html, body').animate({ scrollTop: color_offset-74 }, 1);
				$('.product-configurations').find('.pc-size ul li').removeClass('out-of-stock');

				$('.product-item[data-id="'+chosen_id+'"]').find('.want-this span.want').trigger('click');
			}else
			{
				var loaded_product = '';
				console.log('working on loading this item');

				for(var q=0;q<products.length;q++)
				{
					var tags_array = products[q].tags;

					if(tags_array.indexOf(id_tag) > -1 && tags_array.indexOf(color_tag) > -1)
					{
						console.log(products[q]);

						var tgp_price = parseInt(products[q].variants[0].price.split('.'));
				  		var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
				  		var product_ajax_images = '';

				  		if(products[q].images.length > 0)
					  	{
				  			for(var ti=0;ti<products[q].images.length;ti++)
				  			{
				  				product_ajax_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
				  			}
					  	}

						loaded_product += '<div class="product-item ajax-loaded" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
						'<div class="product-gallery owl-carousel">'+product_ajax_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[q].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="want-this"><span class="want">want</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
					'</div>';
					}
				}

			  	console.log(loaded_product);

			  	$('.products-list').prepend(loaded_product);

			  	$('.products-list .product-item.ajax-loaded').each(function(){

				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

				    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
				    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

				    	var $this = $(this);
				    	setTimeout(function(){
							$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

							setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
								$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
							},160);
						},5);

				    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
				  	}).owlCarousel({
					    loop:true,
					    nav:true,
					    dots:false,
					    autoWidth:true,
					    items:1
				  	});

				  	// $('.product-configurations').addClass('hidden');

					var color_offset = $('.product-item[data-id="'+chosen_id+'"]').offset().top;
					$('html, body').animate({ scrollTop: color_offset-74 }, 1);
					$('.product-configurations').find('.pc-color li').removeClass('disabled');
					$('.product-configurations').find('.pc-size ul li').removeClass('out-of-stock');

					$('.product-item[data-id="'+chosen_id+'"]').find('.want-this span.want').trigger('click');
				});

			  	$('.products-list .product-item.ajax-loaded').removeClass('ajax-loaded');
			}
	    },
	    error: function(request, error) {
	         console.log(arguments);
	         console.log(" Can't do because: " + error);
	    }
	  });
  	});

  	

  	/* ADD TO CART ================================================================================================== */


	/* WANT (click) ================================================================ */

  	$('body').on('click', '.want-this', function(e){
  		e.preventDefault();

  		var data_size_id;
  		var data_size_total_quantity;
  		wanted_size_id = [];
  		cart_items = [];
  		wanted_colors= [];

  		if($(window).width()>1099)
  		{
  			var headerHeight = $('header.site-header').outerHeight();
	  		wanted_top = $(this).parents('.product-item').offset().top - headerHeight;
  		}else if($(window).width()<1100 && $(window).width()>600)
  		{
  			wanted_top = $(this).parents('.product-item').offset().top - 62;
  		}else
  		{
  			wanted_top = $(this).parents('.product-item').offset().top - 48;
  		}
  		$('html, body').animate({ scrollTop: wanted_top }, 1);

  		wanted_num_id = parseInt($(this).parents('.product-item').attr('data-id'));
  		wanted_url = $(this).parents('.product-item').attr('data-url');

  		$.ajax({
	    url: '/products.json',
	    type: "get",
	    dataType: "json",
	    data: jsonData,
	    success: function (data) {
			var products = data.products;

			for(var q=0;q<products.length;q++)
			{ 
				if(products[q].id === wanted_num_id)
				{
					console.log(products[q]);

					wanted_title = products[q].title;
					wanted_description = products[q].body_html;
					wanted_price = parseInt(products[q].variants[0].price.split('.'));
					wanted_dataprice = parseInt(products[q].variants[0].price.split('.'))*100;
					wanted_tags = products[q].tags;
					wanted_sizes = products[q].options[0].values;
					wanted_variants = products[q].variants;
					wanted_copy_link = 'https://porntees.myshopify.com/collections/all?product='+products[q].handle;

					for(var wt=0;wt<wanted_tags.length;wt++)
					{
						if(wanted_tags[wt].indexOf('color') > -1)
						{
							// console.log(wanted_tags);
							wanted_color = wanted_tags[wt].split('_')[1];
						}
						if(wanted_tags[wt].indexOf('id') > -1)
						{
							wanted_id = wanted_tags[wt].split('_')[1];
						}
					}
					for(var wv=0;wv<wanted_variants.length;wv++)
					{
						wanted_size_id.push(wanted_variants[wv].title+'/'+wanted_variants[wv].id+'/'+variants[parseInt(wanted_variants[wv].id)]);
					}

				}
			}
			for(var q=0;q<products.length;q++)
			{
				var check_tags = products[q].tags;

				if (check_tags.indexOf('id_'+wanted_id) > -1)
				{
					for(var wt=0;wt<check_tags.length;wt++)
					{
						if(check_tags[wt].indexOf('color') > -1)
						{
							wanted_colors.indexOf(check_tags[wt].split('_')[1]) === -1 ? wanted_colors.push(check_tags[wt].split('_')[1]) : console.log("This item already exists");
						}
					}
				}	
			}


			console.log(wanted_colors);
			console.log(wanted_size_id);

			$('.product-configurations').attr('data-url', wanted_url);
			$('.product-configurations').attr('data-id', wanted_id);
			$('.product-configurations').find('.pcd-title').html(wanted_title);
			$('.product-configurations').find('.pcd-info').html(wanted_description);
			$('.product-configurations').find('.pcd-price span').html(wanted_price);
			$('.product-configurations').find('.pcd-price span').attr('data-price', wanted_dataprice);
			$('.product-configurations').find('.pcp-price span').html(wanted_price);
			$('.product-configurations').find('.pcp-price span').attr('data-price', wanted_dataprice);
			$('.product-configurations').find('.pcp-share .copy-link').attr('data-link', wanted_copy_link);

			$('.product-configurations').find('.pc-color li').each(function(){
				if(wanted_colors.indexOf($(this).attr('data-color')) === -1)
				{
					$(this).addClass('disabled');
				}
			});
			$('.product-configurations').find('.pc-color li.'+wanted_color).addClass('active');

			$('.product-configurations').find('.pc-size ul li').each(function(){

				for(var num=0;num<wanted_size_id.length;num++)
				{
					if(wanted_size_id[num].split('/')[0] === $(this).attr('data-size'))
					{
						$(this).attr('data-size-id', wanted_size_id[num].split('/')[1]);
						$(this).attr('data-size-total-quantity', wanted_size_id[num].split('/')[2]);
					}
				}

				if(wanted_sizes.indexOf($(this).attr('data-size')) <= -1)
				{
					$(this).addClass('out-of-stock'); 
				}

				data_size_id = $(this).attr('data-size-id');
				data_size_total_quantity = $(this).attr('data-size-total-quantity');
			});

			jQuery.getJSON('/cart.js', function(cart) {
				for(var i=0; i<cart.items.length; i++){
				  var item = cart.items[i];

				  cart_items.push(item.id+'/'+item.quantity);
				};

				for(var c=0;c<cart_items.length;c++)
				{

					if($('.product-configurations').find('.pc-size ul li[data-size-id="'+cart_items[c].split('/')[0]+'"]').length)
					{
						wanted_real_size_quantity = parseInt($('.product-configurations').find('.pc-size ul li[data-size-id="'+cart_items[c].split('/')[0]+'"]').attr('data-size-total-quantity'))-parseInt(cart_items[c].split('/')[1]);
						// console.log(wanted_real_size_quantity);

						if(wanted_real_size_quantity < 1)
						{
							$('.product-configurations').find('.pc-size ul li[data-size-id="'+cart_items[c].split('/')[0]+'"]').addClass('out-of-stock');
						}
					}
				}
			});

			for(var wv=0;wv<wanted_variants.length;wv++)
			{
				if(variants[parseInt(wanted_variants[wv].id)] === 0)
				{
					$('.product-configurations').find('.pc-size ul li[data-size="'+wanted_variants[wv].title+'"]').addClass('out-of-stock');
				}
			}


			$('body').addClass('pc-on-screen');
			$('.product-configurations').addClass('on-screen');
			$('.product-configurations').removeClass('hidden');
			$('.product-configurations-overlay').addClass('show');
	      
	    },
	    error: function(request, error) {
	         console.log(arguments);
	         console.log(" Can't do because: " + error);
	    }
	  });
  	});

  	/* PRODUCT SIZE CHOICE ========================================================= */

  	$('.product-configurations').find('.pc-size ul li').on('click', function(){
  		$('.product-configurations').find('.pc-size ul li').removeClass('active');
		$(this).addClass('active');
  	});

  	/* PRODUCT PLANK (close on outside click) ===================================== */

  	$('.product-configurations-overlay').on('click', function(){
  		$(this).removeClass('show');
  		$('body').removeClass('pc-on-screen');

		$('.product-configurations').attr('data-url', '');
		$('.product-configurations').attr('data-id', '');
  		$('.product-configurations').find('.pcd-title').html('');
		$('.product-configurations').find('.pcd-info').html('');
		$('.product-configurations').find('.pcd-price span').html('0');
		$('.product-configurations').find('.pcd-price span').attr('data-price', '0');
		$('.product-configurations').find('.pcp-price span').html('0');
		$('.product-configurations').find('.pcp-price span').attr('data-price', '0');
		$('.product-configurations').find('.pcp-share').removeClass('share-active');
		$('.product-configurations').find('.pcp-share .copy-link').removeClass('copied');
		$('.product-configurations').find('.pc-color li').removeClass('disabled');
		$('.product-configurations').find('.pc-color li.active').removeClass('active');
		$('.product-configurations').find('.pc-size ul li').removeClass('out-of-stock');

  		$('.product-configurations').removeClass('on-screen');
  	});

  	/* ADD TO CART (click) ===================================== */

  	// var mantra_url = $('.cp-mantras .cp-mantra').attr('data-url');
  	// jQuery.getJSON(mantra_url + '.js', function(mantra) {
   //    var mantra_id = mantra.variants[0].id; 
   //  });
  	// final_object.push({quantity:1, id: mantra_id});

  	$('.product-configurations').find('.pc-cart button').on('mouseenter', function(){
  		if($('.product-configurations').find('.pc-size ul li.active').length === 0)
  		{
  			console.log('size isnt chosen');
  			$('.product-configurations').find('.pc-cart button span.add-to-cart').css('opacity', 0);
  			$('.product-configurations').find('.pc-cart button span.select-a-size').css('opacity', 1);
  		}
  	});
  	$('.product-configurations').find('.pc-cart button').on('mouseleave', function(){
  		if($('.product-configurations').find('.pc-size ul li.active').length === 0)
  		{
  			$('.product-configurations').find('.pc-cart button span.add-to-cart').css('opacity', 1);
  			$('.product-configurations').find('.pc-cart button span.select-a-size').css('opacity', 0);
  		}
  	});

  	$('.product-configurations').find('.pc-cart button.add-to-cart').on('click', function(){
  		wanted = [];
  		wanted_variant_id = $('.product-configurations').find('.pc-size ul li.active').attr('data-size-id');

		if (localStorage.getItem(wanted_variant_id) === null) {
  			localStorage.setItem(wanted_variant_id, variants[parseInt(wanted_variant_id)]);
		}

		if($('.product-configurations').find('.pc-size ul li.active').length)
		{
			$('.product-configurations .pc-cart button').removeClass('add-to-cart').addClass('adding loading');

			setTimeout(function(){
				$('.product-configurations .pc-cart button').removeClass('loading');
				$('.product-configurations .pc-cart button .adding').addClass('in-work');
			}, 160);

		    setTimeout(function(){
		    	wanted.push({quantity:1, id: wanted_variant_id});

		    	jQuery.ajax({
					type: 'POST',
					url: '/cart/add.js',
					data: {
						items: wanted
					},
					// data: mantra_id,
					dataType: 'json',           
					success: function() {
		    			$('.product-configurations .pc-cart button').removeClass('adding').addClass('in-cart loading');

		    			jQuery.getJSON('/cart.js', function(cart) {
		    				if(cart.item_count > 0)
		    				{
		    					// console.log($('.site-header .site-header__cart #CartCount > div').attr('data-cart-count'));
		    					// console.log(parseInt($('.site-header .site-header__cart #CartCount > div').attr('data-cart-count')));

		    					if(parseInt($('.site-header .site-header__cart #CartCount > div').attr('data-cart-count')) === 0)
		    					{
		    						$('.site-header .site-header__cart #CartCount > div').attr('data-cart-count', cart.item_count);
		    						$('.site-header .site-header__cart #CartCount > div > span').html('#'+cart.item_count);
	    							$('.site-header .site-header__cart').removeClass('empty');
		    					}else
		    					{
									$('.site-header .site-header__cart #CartCount > div').attr('data-cart-count', cart.item_count);
									$('.site-header .site-header__cart #CartCount > div').append('<span>#'+cart.item_count+'</span>');
									setTimeout(function(){
										$('.site-header .site-header__cart #CartCount > div').addClass('changing');

										setTimeout(function(){
											$('.site-header .site-header__cart #CartCount > div > span:nth-child(1)').remove();
											$('.site-header .site-header__cart #CartCount > div').removeClass('changing');
										},160);
									},5);
		    					}
		    				}
						});

		    			setTimeout(function(){
							$('.product-configurations .pc-cart button').removeClass('loading');
							$('.product-configurations .pc-cart button .adding').removeClass('in-work');
		    			}, 160);

		    			setTimeout(function(){
		    				cart_items = [];
		    				$('.product-configurations').find('.pc-size li').removeClass('active');

							jQuery.getJSON('/cart.js', function(cart) {
								for(var i=0; i<cart.items.length; i++){
								  var item = cart.items[i];

								  cart_items.push(item.id+'/'+item.quantity);
								};

								for(var c=0;c<cart_items.length;c++)
								{

									if($('.product-configurations').find('.pc-size ul li[data-size-id="'+cart_items[c].split('/')[0]+'"]').length)
									{
										wanted_real_size_quantity = parseInt($('.product-configurations').find('.pc-size ul li[data-size-id="'+cart_items[c].split('/')[0]+'"]').attr('data-size-total-quantity'))-parseInt(cart_items[c].split('/')[1]);

										if(wanted_real_size_quantity < 1)
										{
											$('.product-configurations').find('.pc-size ul li[data-size-id="'+cart_items[c].split('/')[0]+'"]').addClass('out-of-stock');
										}
									}
								}
							});

							$('.product-configurations .pc-cart button').removeClass('in-cart').addClass('add-to-cart loading');

			    			setTimeout(function(){
								$('.product-configurations .pc-cart button').removeClass('loading');
			    			}, 160);
		    			}, 3160);
					},
					error: function(response) {
						console.log(response);
					}
				});
		    },2000);
		}
  	});


  	/* CART CHANGE ------------------------------------------------------------------ */

  	if($('.template-cart').length)
  	{
  		var current_quantity;
  		var current_id;
  		var item_price;
  		var new_quantity;
  		var cart_subtotal;

  		var current_data_price;
  		var current_final_price;
  		var new_final_price;
  		var new_cart_subtotal;
  		var new_cart_quantity;

  		$('.cart__row').each(function(){
  			$(this).attr('data-inventory-quantity', localStorage.getItem(parseInt($(this).attr('data-cart-item-id'))));

  			if($(this).attr('data-cart-item-quantity') === $(this).attr('data-inventory-quantity'))
			{
				$(this).find('.cart__add').addClass('inactive');
			}

  			current_quantity = $(this).find('.cart__quantity-td input.cart__qty-input').val();
  			$(this).find('.cart__quantity span').text(current_quantity);

  			item_price = $(this).attr('data-cart-item-price').split('$')[1];
  			$(this).attr('data-cart-item-price', item_price);
  		});

  		$('.cart__add button').on('click', function(e){
  			e.preventDefault();

  			current_id = parseInt($(this).parents('.cart__row').attr('data-cart-item-id'));
			current_quantity = parseInt($(this).parents('.cart__row').find('.cart__quantity-td input.cart__qty-input').val());
			new_quantity = current_quantity + 1;

			jQuery.ajax({
				type: 'POST',
				url: '/cart/change.js', 
				data: { quantity: new_quantity, id: current_id }, 
				dataType: 'json',
				success: function() {
					$('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__quantity span').text(new_quantity);
					$('.cart__row[data-cart-item-id="'+current_id+'"]').attr('data-cart-item-quantity', new_quantity);
					$('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__qty-input').val(new_quantity);

					$('.cart__row').each(function(){
						if($(this).attr('data-cart-item-quantity') === $(this).attr('data-inventory-quantity'))
						{
							$(this).find('.cart__add').addClass('inactive');
						}
					});

					current_data_price = parseInt($('.cart__row[data-cart-item-id="'+current_id+'"]').attr('data-cart-item-price'));
					current_final_price = parseInt($('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__final-price > div span').text().split('$')[1]);

					new_final_price = current_final_price + current_data_price;
					$('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__final-price > div span').text('$'+new_final_price);

					cart_subtotal = parseInt($('.cart-subtotal__price').text().split('$')[1]);
					new_cart_subtotal = cart_subtotal + current_data_price;
					$('.cart-subtotal__price').text('$'+new_cart_subtotal);

					new_cart_quantity = parseInt($('.site-header .site-header__cart #CartCount > div').attr('data-cart-count'))+1;
					$('.site-header .site-header__cart #CartCount > div').attr('data-cart-count', new_cart_quantity);
					$('.site-header .site-header__cart #CartCount > div').append('<span>#'+new_cart_quantity+'</span>');

					setTimeout(function(){
						$('.site-header .site-header__cart #CartCount > div').addClass('changing');

						setTimeout(function(){
							$('.site-header .site-header__cart #CartCount > div > span:nth-child(1)').remove();
							$('.site-header .site-header__cart #CartCount > div').removeClass('changing');
						},160);
					},5);
				}
			});
  		});
  		$('.cart__remove button').on('click', function(e){
  			e.preventDefault();

  			current_id = $(this).parents('.cart__row').attr('data-cart-item-id');
			current_quantity = parseInt($(this).parents('.cart__row').find('.cart__quantity-td input.cart__qty-input').val());
			new_quantity = current_quantity - 1;

			jQuery.ajax({
				type: 'POST',
				url: '/cart/change.js', 
				data: { quantity: new_quantity, id: current_id }, 
				dataType: 'json',
				success: function() { 

					if(new_quantity === 0)
					{
						current_data_price = parseInt($('.cart__row[data-cart-item-id="'+current_id+'"]').attr('data-cart-item-price'));
						console.log(current_data_price);

						localStorage.removeItem(current_id);


						$('.cart__row[data-cart-item-id="'+current_id+'"]').remove();
					}else
					{
						$('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__quantity span').text(new_quantity);
						$('.cart__row[data-cart-item-id="'+current_id+'"]').attr('data-cart-item-quantity', new_quantity);
						$('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__qty-input').val(new_quantity);

						$('.cart__row').each(function(){
							if($(this).attr('data-cart-item-quantity') < $(this).attr('data-inventory-quantity'))
							{
								$(this).find('.cart__add').removeClass('inactive');
							}
						});

						current_data_price = parseInt($('.cart__row[data-cart-item-id="'+current_id+'"]').attr('data-cart-item-price'));
						current_final_price = parseInt($('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__final-price > div span').text().split('$')[1]);

						new_final_price = current_final_price - current_data_price;
						$('.cart__row[data-cart-item-id="'+current_id+'"]').find('.cart__final-price > div span').text('$'+new_final_price);
					}

					cart_subtotal = parseInt($('.cart-subtotal__price').text().split('$')[1]);
					new_cart_subtotal = cart_subtotal - current_data_price;
					$('.cart-subtotal__price').text('$'+new_cart_subtotal);

					new_cart_quantity = parseInt($('.site-header .site-header__cart #CartCount > div').attr('data-cart-count'))-1;

					if(new_cart_quantity === 0)
					{
						$('.page-width > div:nth-child(1)').addClass('hide');
						$('.empty-page-content').removeClass('hide');
					}

					$('.site-header .site-header__cart #CartCount > div').attr('data-cart-count', new_cart_quantity);
					$('.site-header .site-header__cart #CartCount > div').append('<span>#'+new_cart_quantity+'</span>');

					setTimeout(function(){
						$('.site-header .site-header__cart #CartCount > div').addClass('changing');

						setTimeout(function(){
							$('.site-header .site-header__cart #CartCount > div > span:nth-child(1)').remove();
							$('.site-header .site-header__cart #CartCount > div').removeClass('changing');
						},160);
					},5);
				}
			});
  		});
  	}

  	$(window).on('load resize scroll', function () {
        var wHeight = $(window).height();
        $('.blog-list-view li').each(function () {
            if ($(window).scrollTop() + (wHeight - 200) >= $(this).offset().top) {
                var id = $(this).attr('id');
                $('.blog-list li').removeClass('active');
                $('.blog-list li a[href="#' + id + '"]').parent().addClass('active');
            }else if($(this).hasClass('services') && $(window).scrollTop() + (wHeight - 200) < $(this).offset().top){
                $('.blog-list li').removeClass('active');
            }
        });
    });

    $('.blog-list a').on('click', function () {
        var aId = $(this).attr('href');
        var aTag = $(aId);
        $('html,body').animate({scrollTop: aTag.offset().top - 100},'slow');

        return false;
    });

    $('.pcp-share > button').on('mouseenter', function(){
    	$(this).parent().addClass('share-active');
    }); 
    $('.pcp-share').on('mouseleave', function(){
    	$(this).removeClass('share-active');
    }); 
    $('.pcp-share .copy-link').on('click', function(){
    	if($(this).hasClass('copied'))
        {
            $(this).removeClass('copied');
        }else{
        	$(this).addClass('copied');
	    	var copy_link = $(this).attr('data-link');
	    	console.log(copy_link);
	    	copyToClipboard(copy_link);
        }

    	$(this).text(($(this).text() == 'COPY LINK') ? 'COPIED' : 'COPY LINK');
    });

	if(window.location.pathname === '/blogs/past-capsules')
    {
    	$('body .site-header .grid .grid-item-right nav ul li').removeClass('active');
    	$('body .site-header .grid .grid-item-right nav ul li:nth-child(1)').addClass('active');
    }
    if(window.location.pathname === '/pages/journal')
    {
    	$('body .site-header .grid .grid-item-right nav ul li').removeClass('active');
    	$('body .site-header .grid .grid-item-right nav ul li:nth-child(2)').addClass('active');

    	$('.journal-carousel').remove();
    }
    if(window.location.pathname === '/pages/info')
    {
    	$('body .site-header .grid .grid-item-right nav ul li').removeClass('active');
    	$('body .site-header .grid .grid-item-right nav ul li:nth-child(3)').addClass('active');
    }

    $('.open-info').on('click', function(){
    	$(this).parents('.site-header').addClass('info-opened');
    });

    $('.site-header__logo-link').on('click', function(e){
    	if($(this).parents('.site-header').hasClass('info-opened'))
    	{
			e.preventDefault();
    		$('header.site-header').removeClass('info-opened');
    	}
    });


    $('.gt-open').on('click tap', function(){
    	closeProductConfig();
    	$('body').addClass('mobile-menu-onscreen');
    });
    $('.mm-close').on('click tap', function(){
    	$('body').removeClass('mobile-menu-onscreen');
    });
    $('.mobile-menu-overlay').on('click tap', function(){
    	$('body').removeClass('mobile-menu-onscreen');
    });


    $('.mm-mainmenu > ul > li > span:not(.tees-nav_tags)').on('click tap', function(e){
    	e.preventDefault();

    	if($('.mm-mainmenu > ul > li.active').length)
  		{}else
  		{
			all_products_quantity = $('.products-list .product-item').length;
			all_products_position = $(window).scrollTop();
  		}

  		if($(this).parent().hasClass('active'))
  		{
  			$('.gt-open span').text('');
  			$('body').removeClass('na-items');
			$(this).parent().removeClass('active');
			$(this).parent().find('span.tees-nav_tags span').removeClass('active');

			$.ajax({
				url: '/products.json',
				type: "get",
				dataType: "json",
				data: jsonData,
				success: function (data) {
					var products = data.products;

					var all_products = '';

					for(var q=0;q<all_products_quantity;q++)
					{
						console.log(products[q]);

						var tgp_price = parseInt(products[q].variants[0].price.split('.'));
						var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
						var tagged_images = '';

						if(products[q].images.length > 0)
						{
							for(var ti=0;ti<products[q].images.length;ti++)
							{
								tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
							}
						}

						all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
							'<div class="product-info">'+
								'<div class="pi-left">'+
									'<h2 class="product-title">'+products[q].title+'.</h2>'+
									'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
									'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
									'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
								'</div>'+
								'<div class="pi-right">'+
									'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
								'</div>'+
							'</div>'+
							'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
						'</div>';
					}

				  	// console.log(all_products);

				  	$('html, body').animate({ scrollTop: 0 },1);
					$('.products-list').html(all_products);

					$('.products-list .product-item').each(function(){
					  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
						    if (!e.namespace)  {
						      return;
						    }
					    	var carousel = e.relatedTarget;
					    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

					    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
					    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

					    	var $this = $(this);
					    	setTimeout(function(){
								$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

								setTimeout(function(){
									$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
									$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
								},160);
							},5);

					    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
					  	}).owlCarousel({
						    loop:true,
						    nav:true,
						    dots:false,
						    autoWidth:true,
						    items:1
					  	});
					});
					$('.tees-nav > ul > li').removeClass('active');

					setTimeout(function(){
						$('html, body').animate({ scrollTop: all_products_position },1);
					}, 1000);
					setTimeout(function(){
						$('.products-list').removeClass('loading');
					}, 1100);


				  
				},
				error: function(request, error) {
				     console.log(arguments);
				     console.log(" Can't do because: " + error);
				}
			});
  		}else
  		{
			$(this).parents('ul').find('li').removeClass('active');
			$(this).parents('ul').find('li span.tees-nav_tags span').removeClass('active');
    		$(this).parent().addClass('active');
  		}
    });
    $('.mm-mainmenu span.tees-nav_tags span:not(.mm-go)').on('click tap', function(){
    	if($(this).hasClass('active'))
  		{
			$(this).removeClass('active');
  		}else
  		{
    		$(this).addClass('active');
  		}
    });
    $('.mm-mainmenu .mm-go').on('click tap', function(){


    	if($('.products-list').length === 0)
    	{
    		var category;
			collection_type_tags = [];

			if($(this).parents('li').find('.tees-nav_label').text() === '#COLOR&SIZE')
	    	{
	    		category = '#COLOR&SIZE';

				$(this).parent().find('span').each(function(){
		  			if($(this).hasClass('active'))
		  			{
		  				collection_type_tags.push($(this).attr('data-tag'));
		  			}
		  		});
	    	}else
	    	{
	    		if($(this).parents('li').find('span.tees-nav_link span').text().indexOf(' '))
				{
					category = $(this).parents('li').find('span.tees-nav_link span').text().split(' ').join('-');
				}else
				{
					category = $(this).parents('li').find('span.tees-nav_link span').text();
				}

				$(this).parent().find('span').each(function(){
					if($(this).hasClass('active'))
					{
						collection_type_tags.push($(this).attr('data-tag'));
					}
				});
	    	}

    		localStorage.setItem('category', category);

    		if(collection_type_tags.length > 0)
    		{
    			localStorage.setItem('tags', collection_type_tags);
    		}
    		location.href= 'https://'+window.location.host+'/collections/all';
    	}else
    	{
	    	$('body').removeClass('link-loaded-product');
	    	$('body').removeClass('na-items');
			collection_type_tags = [];

			$('.gt-open span').text($(this).parents('li').find('.tees-nav_label').text().split('#')[1]);

	    	if($(this).parents('li').find('.tees-nav_label').text() === '#COLOR&SIZE')
	    	{
				$(this).parent().find('span').each(function(){
		  			if($(this).hasClass('active'))
		  			{
		  				collection_type_tags.push($(this).attr('data-tag'));
		  			}
		  		});

			  	if (collection_type_tags.length > 0) {
					colorandsizeTagsLoad();
				}else
				{
					alert('choose an option');
				}
	    	}else
	    	{
	    		if($(this).parents('li').find('span.tees-nav_link span').text().indexOf(' '))
				{
					collection_type = $(this).parents('li').find('span.tees-nav_link span').text().split(' ').join('-');
				}else
				{
					collection_type = $(this).parents('li').find('span.tees-nav_link span').text();
				}

				$(this).parent().find('span').each(function(){
					if($(this).hasClass('active'))
					{
						collection_type_tags.push($(this).attr('data-tag'));
					}
				});

				if(collection_type_tags.length > 0)
				{
					collectionTagsLoad();
				}else
				{
					var collection_products = '';
					var chosen_type = collection_type;

					$.ajax({
						url: '/products.json',
						type: "get",
						dataType: "json",
						data: jsonData,
						success: function (data) {
							var products = data.products;
							// console.log(products);

							for(var q=0;q<products.length;q++)
							{
								if(products[q].product_type === chosen_type)
								{
									var tgp_price = parseInt(products[q].variants[0].price.split('.'));
								  	var tgp_data_price = parseInt(products[q].variants[0].price.split('.'))*100;
								  	var tagged_images = '';

								  	if(products[q].images.length > 0)
								  	{
							  			for(var ti=0;ti<products[q].images.length;ti++)
							  			{
							  				tagged_images += '<div class="item"><img class="product-image lazyload" src="'+products[q].images[ti].src+'" alt="'+products[q].title+'"></div>';
							  			}
								  	}

								  	collection_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'" data-id="'+products[q].id+'" data-url="/product/'+products[q].handle+'">'+
											'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
										'<div class="product-info">'+
											'<div class="pi-left">'+
												'<h2 class="product-title">'+products[q].title+'.</h2>'+
												'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
												'<div class="product-tags" style="display:none">'+products[q].tags.join(',')+'</div>'+
												// '<div class="product-tags" style="display:none">'+products[q].tags.split(', ').join(',')+'</div>'+
												'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
											'</div>'+
											'<div class="pi-right">'+
												'<button class="want-this"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
											'</div>'+
										'</div>'+
										'<div class="product-gallery-counter"><span class="current"><span>1</span></span>/<span class="total"></span></div>'+
									'</div>';
								}
							}


							// console.log(collection_products);

							$('html, body').animate({ scrollTop: 0 },1);
							$('.products-list').html(collection_products);

							$('.products-list .product-item.collection-item').each(function(){
							  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
								    if (!e.namespace)  {
								      return;
								    }
							    	var carousel = e.relatedTarget;
							    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;

							    	$(this).parent().find('.product-gallery-counter').find('span.current').append('<span>'+changing_number+'</span>');
							    	$(this).parent().find('.product-gallery-counter').find('span.total').text(carousel.items().length);

							    	var $this = $(this);
							    	setTimeout(function(){
										$this.parent().find('.product-gallery-counter').find('span.current').addClass('changing');

										setTimeout(function(){
											$this.parent().find('.product-gallery-counter').find('span.current span:nth-child(1)').remove();
											$this.parent().find('.product-gallery-counter').find('span.current').removeClass('changing');
										},160);
									},5);

							    	// $(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
							  	}).owlCarousel({
								    loop:true,
								    nav:true,
								    dots:false,
								    autoWidth:true,
								    items:1
							  	});
							});

							setTimeout(function(){
								$('.products-list').removeClass('loading');
							}, 1000);




						  
						},
						error: function(request, error) {
						     console.log(arguments);
						     console.log(" Can't do because: " + error);
						}
					});
				}
	    	}

	    	$('.mm-close').trigger('click');
    	}
    });

    $('.mm-infomenu .open-info').on('click tap', function(){
    	$(this).parent().addClass('opened');
    });

    
  //   if(localStorage.getItem('signup') === null)
  //   {
		// if(localStorage.getItem('later') === null)
		// {
		//     setTimeout(function(){
		//     	if(localStorage.getItem('newsletter') === null)
		//     	{
		//   			$('.newsletter-signup').addClass('show');
		//   			localStorage.setItem('later', 'show');
		//     	}
		//     }, 5000);
		// }else
		// {
		// 	setTimeout(function(){
		//     	if(localStorage.getItem('newsletter') === null)
		//     	{
		//   			$('.newsletter-signup').addClass('show');
		//     	}
		//     }, 15000);
		// }
  //   }

  	// $('.newsletter-signup .nl-close').on('click', function(){
  	// 	if($('.newsletter-signup').hasClass('done'))
  	// 	{
  	// 		$('.newsletter-signup').removeClass('show done');
  	// 		localStorage.setItem('signup', 'hidden');
  	// 	}else
  	// 	{
	  // 		$('.newsletter-signup').removeClass('show done');
	  // 		localStorage.setItem('newsletter', 'hide');
  	// 	}
  	// });

  	$(document).mouseup(function(e) 
	{
	    var container = $('.newsletter-signup');

	    // if the target of the click isn't the container nor a descendant of the container
	    if (!container.is(e.target) && container.has(e.target).length === 0) 
	    {
	        container.removeClass('show');
	    }
	});

	if($('.journal-carousel').length)
	{
		var jc_width = 0;

		$('.journal-carousel').find('.gallery-item').each(function(){
			jc_width += $(this).find('img').width();
		});
		$('.journal-carousel .gallery-list').width(jc_width);
		var jc_width_window = jc_width - $(window).width();

		$.keyframe.define([{
		    name: 'journal_carousel',
		    '0%':  {left: '0px'},
		    '50%': {left: '-'+jc_width_window+'px'},
		    '100%': {left: '0px'}
		}]);
		// $('.journal-carousel .gallery-list').playKeyframe({
		//     name: 'journal_carousel',
		//     duration: '10s'
		// });
				// move with easing
		$('.journal-carousel .gallery-list').playKeyframe({
		  name: 'journal_carousel',
		  duration: '180s',
		  timingFunction: 'linear',
		  iterationCount: 'infinite',
		  direction: 'normal',
		  fillMode: 'forwards'
		});
		$('.journal-carousel .gallery-list').on('mouseenter', function(){
			$('.journal-carousel .gallery-list').pauseKeyframe();
		});
		$('.journal-carousel .gallery-list').on('mouseleave', function(){
			$('.journal-carousel .gallery-list').resumeKeyframe();
		});

		$(window).on('resize', function(){

			$('.journal-carousel .gallery-list').width(100000);
			jc_width = 0;

			$('.journal-carousel').find('.gallery-item').each(function(){
				jc_width += $(this).find('img').width();
			});
			$('.journal-carousel .gallery-list').width(jc_width);
			jc_width_window = jc_width - $(window).width();

			$.keyframe.define([{
			    name: 'journal_carousel',
			    '0%':  {left: '0px'},
			    '50%': {left: '-'+jc_width_window+'px'},
			    '100%': {left: '0px'}
			}]);
			$('.journal-carousel .gallery-list').playKeyframe({
			  name: 'journal_carousel',
			  duration: '180s',
			  timingFunction: 'linear',
			  iterationCount: 'infinite',
			  direction: 'normal',
			  fillMode: 'forwards'
			});

		});

		$('.journal-carousel').on('click tap', function(){
			location.href = 'https://'+window.location.host+'/pages/gallery';
		});
	}

	// if(localStorage.getItem('signup') === null)
	// {
	// 	if($('.newsletter-signup .form-message.form-message--success').length)
	// 	{
	// 		$('.newsletter-signup').addClass('done');
	// 		localStorage.setItem('signup', 'hidden');
	// 	}
	// }
	if($('.site-footer__item .contact-form .form-message.form-message--success').length)
	{
		$('.site-footer__item:nth-child(3)').addClass('done');
	}

	$('.ns-info-desktop').on('click', function(){
		$(this).parent().addClass('active');
	});

   	$('.site-footer__item .contact-form input[type="email"]').on('keyup', function(){
   		if($(this).val().indexOf('@') > -1)
   		{
   			$('.site-footer__item .contact-form .input-group__btn').addClass('shown');
   		}else
   		{
			$('.site-footer__item .contact-form .input-group__btn').removeClass('shown');
   		}
   	});
});