var elems = $('.post-type-archive-special_offer')
	.find('.special-offers-bl[href="http://psn.in.ua/special_offer/sri-lanka/"],'+
		'.special-offers-bl[href="http://psn.in.ua/special_offer/tanzania/"],'+
		'.special-offers-bl[href="http://psn.in.ua/special_offer/oae/"]');

elems.find('.special-offers-bl-desc').text('');
elems.not('[href="http://psn.in.ua/special_offer/tanzania/"]').find('.special-offers-bl-title').text(function (index, oldText) {
	return oldText.split(',')[0];
})
elems.attr('href', function () {
	switch($(this).attr('href')) {
		case 'http://psn.in.ua/special_offer/sri-lanka/':
			return 'http://psn.in.ua/shri-lanka';
		case 'http://psn.in.ua/special_offer/tanzania/':
			return 'http://psn.in.ua/zanzibar';
		case 'http://psn.in.ua/special_offer/oae/':
			return 'http://psn.in.ua/oae';			
	}
});
