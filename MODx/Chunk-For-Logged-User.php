[[!User.isLogged:is=`1`:then=`[[BabelLinks? &tpl=`tpl.BabelLink`]]`]]


=== User.isLogged=== (snippet)
<?php
global $modx;
//if ($modx->user->isAuthenticated('web')) {
//if (isset ($_SESSION['mgrValidated'])) {
if ($modx->user->hasSessionContext($context)) {
    return 1;
} else {
    return 0;
}
