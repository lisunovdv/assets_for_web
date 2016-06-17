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
<script>document.addEventListener("DOMContentLoaded", function(event) { 
$('head').append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css">');
});</script>
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<!-- Right Clearfix Hack by Nicolas Gallagher (http://nicolasgallagher.com/micro-clearfix-hack/ -->
<style>
  .container::before, .container::after {
    content:"";
    display:table;
}
.container::after {
    clear:both;
}
</style>
</body>
</html>
