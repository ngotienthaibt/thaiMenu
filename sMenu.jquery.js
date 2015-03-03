(function($,document, window){
	var 
		defaults = {
			large : 'float-style', //center-style
			small : 'collapsed', //canvas-off
			openOne: true,
			titleOpen : '',
			titleClose : 'CLOSE',
			close : function(){},
			open  : function(){}
		},
		pluginName = 'sMenu';

	function sMenu(element, options) {

		
		this.element = element;
		var settings = $.extend({},defaults,options),
			checkScreen = '',test=true;
	
		if($(window).width()<=481){
			  checkScreen = 'small';
			  test = true	;	  			
		} else {
			checkScreen = 'large';
			test=false;
			  			
		}
		element.children('ul').wrap('<div id="thaiMenu"></div>');

		var mainId = element.find('#thaiMenu');
		mainId.prepend('<button class="menu-control"><span class="button-text">'+settings.titleOpen+'  ☰ </span><span class="button-icon"></span></button>').find('.first-level').wrapAll('<div class="inner-menu"></div>');
	
		mainId.find('.inner-menu').prepend('<button class="menu-close"><span class="close-text">'+settings.titleClose+'</span><span class="close-icon"></span></button>');
	
		mainId.addClass(settings.large + " " + settings.small);


	 $(element).on('click','#thaiMenu button.menu-control',function(e){
	 	//canvas-off
	 	$(this).addClass('disappear');
	 	$('#thaiMenu.canvas-off .inner-menu').addClass('appear');
	 	//toggle-menu
	 	if($(window).width() > 480) {
	 		$('#thaiMenu.toggle-menu .inner-menu').css({'left':'0%'});
		 }
	 	//collapsed
	 	$('#thaiMenu.collapsed').find('.inner-menu').slideToggle(500);
	 	e.stopPropagation();
	 });
	  $(element).on('click','#thaiMenu button.menu-close',function(e){
	  		//canvas-off
	  		 $('#thaiMenu.canvas-off button.menu-control').removeClass('disappear');
	 		$('#thaiMenu.canvas-off .inner-menu').removeClass('appear');
	 		if($(window).width() > 480) {
	 			//toggle-menu
	 			$('#thaiMenu.toggle-menu .inner-menu').css({'left':'-100%'});
	 		}
	 		e.stopPropagation();
	  });
	  $('body').on('click',function(){
	  		$(element).find('#thaiMenu button.menu-close').click();
	  });
	  mainId.find('ul.second-level,ul.third-level').addClass('get-up');
		 function togggleSubMenu(suMenu){
		 		//mainId.find(suMenu).parent('li').children(suMenu).slideUp();
				mainId.find(suMenu).parent('li').on('click',function(e){
					e.preventDefault();
		  			$(this).children(suMenu).slideToggle(500).toggleClass('get-down').toggleClass('get-up');
		  			test= true;
		  			return false;
		  			
				});
		  	mainId.find(suMenu).parent('li').bind({
		  		
		  		mouseenter: function(e){
		  			if(suMenu=='ul.third-level') {

		  				var offsetLeft = $(this).parent('ul.second-level').offset().left,
		  					offsetRight = $(window).width() - (offsetLeft + $(this).parent('ul.second-level').width());

		  					if(offsetLeft > offsetRight){
		  						$(this).children('ul.third-level').css({'left':'-100%'});
		  					}
		  			}
		  			$(this).children(suMenu).slideDown(300); //#thaiMenu .inner-menu ul.first-level > li >ul.second-level>li>.third-level
		  			test= false;	
		  		},
		  		mouseleave: function(e){
		  			$(this).children(suMenu).slideUp(50);
		  			test = false;
		  			
		  		}
		  	});
		  	if($(window).width()<481 || checkScreen == 'small' ){
		  			mainId.find(suMenu).parent('li').off('mouseenter mouseleave');
	  		} else if($(window).width() > 480 || checkScreen=='large') {
	  			if(settings.large != 'toggle-menu'){
	  				mainId.find(suMenu).parent('li').off('click');
	  			}else {
	  				mainId.find(suMenu).parent('li').off('mouseenter mouseleave');
	  			}
	  		}	



	  	// 	$(window).resize(function(){
		  // 		if($(window).width()<=481){
		  // 			checkScreen = 'small';
		  // 			if(test == false){
			 //  			mainId.find(suMenu).parent('li').off('mouseenter mouseleave');
		  // 				// mainId.find(suMenu).parent('li').click(function(e){
		  // 				// 	e.preventDefault();
				//   		// 	$(this).children(suMenu).slideToggle(500).toggleClass('get-down').toggleClass('get-up');
				//   		// 	test= true;
				//   		// 	return false;
		  // 				// });
	  	// 			}

		  // 		} else {
		  // 			checkScreen = 'large';
		  // 			if(test==true){
			  			
	  	// 			}
		  // 		}
	 		// });
		  	
		}

		togggleSubMenu('ul.second-level');
		togggleSubMenu('ul.third-level');

		if(settings.openOne == true) {
			mainId.find("ul.second-level").parent('li').on('click',function(e){
	  			$(this).siblings('li').children('ul').slideUp(500).addClass('get-up').removeClass('get-down');
	  			return false;
			});
			mainId.find("ul.third-level").parent('li').on('click',function(e){
	  			$(this).siblings('li').children('ul').slideUp(500).addClass('get-up').removeClass('get-down');
	  			return false;
			});

		}
		
		
	//for select box

	if(settings.small == 'select-box'){
		$('<select class="select-menu" />').prependTo(mainId);
		$('.select-menu').wrap('<div class="wrapper-sb"></div>');
			mainId.find('.first-level').children('li').each(function(){
			$(this).children('a').each(function(){
				$('<option  />',{
					'value': $(this).attr('href'),
					'text' : $(this).text(),
					'class' : 'first'
				}).appendTo('.select-menu');
				$(this).prev('ul.second-level').children('li').children('a').each(function(){
					$('<option  />',{
						'value': $(this).attr('href'),
						'text' : '-' + $(this).text(),
						'class' : 'second'
					}).appendTo('.select-menu');

					$(this).prev('ul.third-level').children('li').children('a').each(function(){
						$('<option  />',{
							'value': $(this).attr('href'),
							'text' : '+' + $(this).text(),
							'class' : 'third'
						}).appendTo('.select-menu');
					});

				});
			});
			
		});
		$(mainId).on('change','.select-menu',function(){
			window.open($(this).find('option:selected').val(),'_self');
		});
	}

	  return true;
	}
	sMenu.prototype.close = function(){
		 $('#thaiMenu.canvas-off button.menu-control').removeClass('disappear');
	 	$('#thaiMenu.canvas-off .inner-menu').removeClass('appear');
	 	if($('#thaiMenu.collapsed').find('.inner-menu').is(':visible')){
	 		$('#thaiMenu.collapsed').find('.inner-menu').slideToggle(500);
	 	}
	 	
	}
	sMenu.prototype.open = function(){
		$("#thaiMenu button.menu-control").addClass('disappear');
	 	$('#thaiMenu.canvas-off .inner-menu').addClass('appear');
	 	//collapsed
	 	if($('#thaiMenu.collapsed').find('.inner-menu').is(':visible')==false){
	 		$('#thaiMenu.collapsed').find('.inner-menu').slideToggle(500);
	 	}
	 	
	}
	sMenu.prototype.toogle = function(){

	}

	$.fn[pluginName] = function(options){	
		if(typeof options == 'undefined' || typeof options == 'object' ){
			 sMenuObj = new sMenu(this,options);
		} else if(typeof options == 'string') {
			if(typeof sMenuObj == 'undefined') {
				sMenuObj = new sMenu(this,options);
			}
			sMenuObj[options]();
		}
		return this;

	}



}(jQuery, document, window))