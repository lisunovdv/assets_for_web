<?php
if ($modx->context->get('key') != "mgr") {
    if ( ("/" != $_SERVER['REQUEST_URI']) AND (preg_match('/\/{1,}$/', $_SERVER['REQUEST_URI']))) {
        $url = preg_replace('/\/{1,}$/',"",$_SERVER['REQUEST_URI']);
        $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
        $host     = $_SERVER['HTTP_HOST'];
        $newUrl = $protocol . '://' . $host . $url;
        header("HTTP/1.1 301 Moved Permanently"); 
        header("Location: " . $newUrl);
        exit();
        
    }
}
