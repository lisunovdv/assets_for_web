<?php
$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
$output = '<link rel="alternate" href="' . $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . '" hreflang="';
$contextKey = $modx->context->get('key');
switch ($contextKey) {
    case "ru":
        $output .= 'ru-UA';
        break;
    case "en":
        $output .= 'en-UA';
        break;
    case "web":
    default:
        $output .= 'x-default';
        break;
}
$output .= '" />';
return $output;
