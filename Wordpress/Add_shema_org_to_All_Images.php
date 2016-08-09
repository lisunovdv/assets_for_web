function filter_function_ImageObject_Schema( $content ) {
	$result = '';
	$tplBefore = '<script type="application/ld+json">{"@context": "http://schema.org","@type": "ImageObject","author": "Yes i do","contentUrl":"';
	$tplAfter = '",}</script>';
	$count;

	$data = $content;
	preg_match_all('/(img|src)=("|\')[^"\'>]+/i', $data, $media);
	unset($data);
	$data = preg_replace('/(img|src)("|\'|="|=\')(.*)/i', "$3",$media[0]);
	foreach ($data as $url) {
    	$result = $result . $tplBefore . $url . $tplAfter;
	}
	return $content . $result;

}
add_filter( 'the_content', 'filter_function_ImageObject_Schema' );
