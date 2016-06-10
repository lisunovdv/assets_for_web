  //Redirect 301 for http://example.com////////////////////// to http://example.com/
  if ( ("/" != $_SERVER['REQUEST_URI']) AND (preg_match('/\/{1,}$/', $_SERVER['REQUEST_URI']))) {
    $url = preg_replace('/\/{1,}$/',"",$_SERVER['REQUEST_URI']);
    $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
    $host     = $_SERVER['HTTP_HOST'];
    $newUrl = $protocol . '://' . $host . $url;
    header("HTTP/1.1 301 Moved Permanently"); 
    header("Location: " . $newUrl);
    exit();
  }
  
// Minify PHP-output  
  function sanitize_output($buffer) {
      $search = array(
          '/\>[^\S ]+/s',  // strip whitespaces after tags, except space
          '/[^\S ]+\</s',  // strip whitespaces before tags, except space
          '/(\s)+/s'       // shorten multiple whitespace sequences
      );
      $replace = array(
          '>',
          '<',
          '\\1'
      );
      $buffer = preg_replace($search, $replace, $buffer);
      return $buffer;
  }
  if ("/shop_content.php?coID=12" != $_SERVER['REQUEST_URI']) {
    ob_start("sanitize_output");
  }
?>
