var last_item_offset = 10000;
var scrollReaction = true;
var all_products_quantity;
var all_products_position;

var collection_type;
var collection_type_tags;

var checker = (arr, target) => target.every(v => arr.includes(v));

function ajaxProductLoader(){
	// console.log('function init');

	products_count = 0;
	product_ajax_images = '';
	uploaded_products = '';

	$.ajax({
		url: '/admin/products.json',
		type: "get",
		dataType: "json",
		success: function (data) {
			var products = data.products;
			products_count = $('.products-list .product-item').length;

			// console.log(products_count);
			// console.log(products.length);

			if(products_count<products.length)
			{
				for(var ac = products_count;ac<products_count+10;ac++)
				{
					if(ac<products.length)
					{
						var tgp_price = parseInt(products[ac].variants[0].price.split('.'));
					  	var tgp_data_price = parseInt(products[ac].variants[0].price.split('.'))*100;var tagged_images = '';

					  	if(products[ac].images.length > 0)
						  	{
					  			for(var ti=0;ti<products[ac].images.length;ti++)
					  			{
					  				product_ajax_images += '<div class="item"><img class="product-image lazyload" src="'+products[ac].images[ti].src+'" alt="'+products[ac].title+'"></div>';
					  			}
						  	}

						uploaded_products += '<div class="product-item ajax-loaded" id="product-'+products[ac].id+'">'+
							'<div class="product-gallery owl-carousel">'+product_ajax_images+'</div>'+
							'<div class="product-info">'+
								'<div class="pi-left">'+
									'<h2 class="product-title">'+products[ac].title+'.</h2>'+
									'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
									'<div class="product-tags" style="display:none">'+products[ac].tags.split(', ').join(',')+'</div>'+
									'<div class="product-type" style="display:none">'+products[ac].product_type+'</div>'+
								'</div>'+
								'<div class="pi-right">'+
									'<button class="add to cart"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
								'</div>'+
							'</div>'+
							'<div class="product-gallery-counter"></div>'+
						'</div>';
					}
				}
				$('.products-list').append(uploaded_products);

				$('.products-list .product-item.ajax-loaded').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	$(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
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
		url: '/admin/products.json',
		type: "get",
		dataType: "json",
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

				  	collection_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[q].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[q].tags.split(', ').join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="add to cart"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"></div>'+
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
			    	$(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
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
				$('.tees-nav').removeClass('loading');
			}, 1000);




		  
		},
		error: function(request, error) {
		     console.log(arguments);
		     console.log(" Can't do because: " + error);
		}
	});
}

function collectionTagsLoad()
{
	$('.products-list').addClass('loading');

	if(collection_type_tags.length > 0)
	{
		$.ajax({
			url: '/admin/products.json',
			type: "get",
			dataType: "json",
			success: function (data) {
				var products = data.products;
				console.log(products);

				var collection_product_type;
				var collection_product_tags;
				var chosen = [];
				var tagged_products = '';

				for(var q=0;q<products.length;q++)
				{
					collection_product_type = products[q].product_type;

					if(collection_product_type === collection_type)
					{
						collection_product_tags = products[q].tags.split(', ');

						if(checker(collection_product_tags, collection_type_tags) === true)
						{
							chosen.push(q);
						}
					}
					
				}
				if(chosen.length>0)
				{
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

				  	tagged_products += '<div class="product-item tag-item" id="product-'+products[chosen[ch]].id+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[chosen[ch]].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[chosen[ch]].tags.split(', ').join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[chosen[ch]].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="add to cart"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"></div>'+
					'</div>';
				  }
				  console.log(tagged_products);
				}

				// console.log(collection_products);

				$('html, body').animate({ scrollTop: 0 },1);
				$('.products-list').html(tagged_products);

				$('.products-list .product-item.tag-item').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	$(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
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
		collectionLoad();
	}
}

$(function(){

	$('.tees-slider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
	    if (!e.namespace)  {
	      return;
	    }
    	var carousel = e.relatedTarget;
    	$('.tees-slider-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
  	}).owlCarousel({
	    loop:true,
	    nav:true,
	    dots:false,
	    items:1
  	});

  	$('.homepage-slider').on('mousemove', function(e){
	    $('.tees-slider-counter').css({
	       left:  e.pageX,
	       top:   e.pageY - 70
	    });
	});

  	if($('.products-list').length)
  	{
  		var product_item_price;
  		var product_item_tags;
  		var product_item_type;

  		var products_count;
		var product_ajax_images;
		var uploaded_products;

		$('html, body').animate({ scrollTop: 0 },1);

		setTimeout(function(){
			$('.products-list').removeClass('loading');
		}, 1000);

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
		    	$(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
		  	}).owlCarousel({
			    loop:true,
			    nav:true,
			    dots:false,
			    autoWidth:true,
			    items:1
		  	});

		  	product_item_tags = $(this).find('.product-tags').text();
		  	product_item_tags = product_item_tags.split(',');

		  	product_item_type = $(this).find('.product-type').text();
		  	product_item_type = 'type_'+product_item_type.split('#')[1].toLowerCase();
		  	$(this).addClass(product_item_type);
		});

		$(window).on('scroll', function(){
			if(scrollReaction === true)
			{
			    if($(window).scrollTop() > last_item_offset)
			    {
			        ajaxProductLoader();
			        scrollReaction = false;
			    }
			}
		});
  	}

  	$('.tees-nav > ul > li .tees-nav_tags:not(.tees-nav_tags-cs)').html('');

  	$.ajax({
	    url: '/admin/products.json',
	    type: "get",
	    dataType: "json",
	    success: function (data) {
	      var products = data.products;
	      // console.log(products);

	      var product_type;
	      var product_tags;
	      var typetag_list = [];
	      var typetag_item;

	      for(var q=0;q<products.length;q++)
	      {
	      	product_type = products[q].product_type.toLowerCase();
	      	product_tags = products[q].tags.split(', ');

	      	for(var pt=0;pt<product_tags.length;pt++)
	      	{
	      		typetag_item = product_type+'_'+product_tags[pt];
	      		typetag_list.indexOf(typetag_item) === -1 ? typetag_list.push(typetag_item) : console.log();
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
      				$(this).find('.tees-nav_tags').append('<span data-tag="'+typetag_list[tti].split('_')[1]+'">'+typetag_list[tti].split('_')[1]+'</span>');
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

  	var newsletter_form = $('#shopify-section-footer').find('.site-footer__newsletter').html();
  	console.log(newsletter_form);

  	$('.site-footer__content .site-footer__item:nth-child(3) p').eq(3).after(newsletter_form);
  	$('.site-footer__content .site-footer__item:nth-child(3) p strong').on('click', function(){
  		$(this).parents('.site-footer__item').addClass('active');
  	})


  	/* COLLECTION LOAD ======================================================================================== */

  	$('.tees-nav > ul > li:not(:last-child) > a').on('click', function(e){
  		e.preventDefault();

  		if($(this).parent().hasClass('active'))
  		{
  			$('.tees-nav').addClass('loading');
			$('.products-list').addClass('loading');

			$(this).parent().removeClass('active');
			$(this).parent().find('.tees-nav_tags span').removeClass('active');

  			console.log(all_products_quantity);
  			console.log(all_products_position);

  			$.ajax({
				url: '/admin/products.json',
				type: "get",
				dataType: "json",
				success: function (data) {
					var products = data.products;
					// console.log(products);

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

						all_products += '<div class="product-item collection-item hidden" id="product-'+products[q].id+'">'+
							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
						'<div class="product-info">'+
							'<div class="pi-left">'+
								'<h2 class="product-title">'+products[q].title+'.</h2>'+
								'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
								'<div class="product-tags" style="display:none">'+products[q].tags.split(', ').join(',')+'</div>'+
								'<div class="product-type" style="display:none">'+products[q].product_type+'</div>'+
							'</div>'+
							'<div class="pi-right">'+
								'<button class="add to cart"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
							'</div>'+
						'</div>'+
						'<div class="product-gallery-counter"></div>'+
					'</div>';
					}

				  	console.log(all_products);

				  	$('html, body').animate({ scrollTop: 0 },1);
					$('.products-list').html(all_products);

					$('.products-list .product-item').each(function(){
					  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
						    if (!e.namespace)  {
						      return;
						    }
					    	var carousel = e.relatedTarget;
					    	$(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
					  	}).owlCarousel({
						    loop:true,
						    nav:true,
						    dots:false,
						    autoWidth:true,
						    items:1
					  	});
					});

					$('.tees-nav').removeClass('tees-subnav-show');
					$('.tees-nav > ul > li').removeClass('active');

					setTimeout(function(){
						$('html, body').animate({ scrollTop: all_products_position },1);
					}, 1000);
					setTimeout(function(){
						$('.products-list').removeClass('loading');
						$('.tees-nav').removeClass('loading');
					}, 1100);


				  
				},
				error: function(request, error) {
				     console.log(arguments);
				     console.log(" Can't do because: " + error);
				}
			});
  		}else
  		{
  			$('.tees-nav').addClass('loading');
			$('.tees-nav > ul > li').removeClass('active');
			$(this).parent().addClass('active');


			$('.products-list').addClass('loading');
			all_products_quantity = $('.products-list .product-item').length;
			all_products_position = $(window).scrollTop();

  			collectionLoad();

  			setTimeout(function(){
  				$('.tees-nav').addClass('tees-subnav-show');
  			},150);
  		}
  	});

	/* COLLECTION TAGS LOAD ================================================================================== */

  	$('body').on('click', '.tees-nav_tags:not(.tees-nav_tags-cs) span', function(){

		$(this).toggleClass('active');
		collection_type = $(this).parents('li').find('a.tees-nav_link span').text();

		collection_type_tags = [];
		$(this).parent().find('span').each(function(){
			if($(this).hasClass('active'))
			{
				collection_type_tags.push($(this).attr('data-tag'));
			}
		});

  		collectionTagsLoad();
  	});

	/* COLOR & SIZE TAGS LOAD =============================================================================== */

  	$('.tees-nav > ul > li:last-child > a').on('click', function(e){
  		e.preventDefault();

  		if($(this).hasClass('active'))
  		{
			$(this).removeClass('active');
	  		$(this).parent().removeClass('active');
			$('.tees-nav').removeClass('tees-subnav-show');
  		}else
  		{
	  		$(this).addClass('active');
	  		$(this).parent().addClass('active');
			$('.tees-nav').addClass('tees-subnav-show');
  		}
  	});

  	$('body').on('click', '.tees-nav_tags.tees-nav_tags-cs span', function(){

  		collection_type_tags = [];

  		$(this).toggleClass('active');

  		$(this).parent().find('span').each(function(){
  			if($(this).hasClass('active'))
  			{
  				collection_type_tags.push($(this).attr('data-tag'));
  			}
  		});

  		if(collection_type_tags.length > 0)
  		{
  			$.ajax({
				url: '/admin/products.json',
				type: "get",
				dataType: "json",
				success: function (data) {
				  var products = data.products;
				  console.log(products);

				  var collection_product_tags;
				  var chosen = [];
				  var tagged_products = '';

				  for(var q=0;q<products.length;q++)
				  {
				  	collection_product_tags = products[q].tags.split(', ');

			  		if(checker(collection_product_tags, collection_type_tags) === true)
		  			{
		  				chosen.push(q);
		  			}
				  	
				  }
				  if(chosen.length>0)
				  {
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

					  	tagged_products += '<div class="product-item" id="product-'+products[chosen[ch]].id+'">'+
  							'<div class="product-gallery owl-carousel">'+tagged_images+'</div>'+
							'<div class="product-info">'+
								'<div class="pi-left">'+
									'<h2 class="product-title">'+products[chosen[ch]].title+'.</h2>'+
									'<div class="product-price" data-price="'+tgp_data_price+'"><span>'+tgp_price+'</span>US DOLLARS</div>'+
									'<div class="product-tags" style="display:none">'+products[chosen[ch]].tags.split(', ').join(',')+'</div>'+
									'<div class="product-type" style="display:none">'+products[chosen[ch]].product_type+'</div>'+
								'</div>'+
								'<div class="pi-right">'+
									'<button class="add to cart"><span class="want">want</span><span class="in-cart" style="display: none">IN CART</span></button>'+
								'</div>'+
							'</div>'+
							'<div class="product-gallery-counter"></div>'+
						'</div>';
					  }
					  console.log(tagged_products);
				  }

			  	$('.products-list-loaded').html(tagged_products);

				$('.products-list-loaded .product-item').each(function(){
				  	$(this).find('.product-gallery').on('initialized.owl.carousel changed.owl.carousel', function(e) {
					    if (!e.namespace)  {
					      return;
					    }
				    	var carousel = e.relatedTarget;
				    	$(this).parent().find('.product-gallery-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
				  	}).owlCarousel({
					    loop:false,
					    nav:true,
					    dots:false,
					    autoWidth:true,
					    items:1
				  	});
				});

				$('body').addClass('ajax-products-list');
			  	$('.products-list-loaded').addClass('loaded-items');
				  
				},
				error: function(request, error) {
				     console.log(arguments);
				     console.log(" Can't do because: " + error);
				}
			});
  		}
  	});



  	// $('.tees-nav li.active a').on('click', function(e){
  	// 	e.preventDefault();
  	// 	window.location = 'https://porntees.myshopify.com/collections/all';
  	// });

});