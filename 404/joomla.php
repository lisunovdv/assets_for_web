<?php
/**
 * @package		Joomla.Site
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */
defined('_JEXEC') or die;
if (($this->error->getCode()) == '404') {
    header('HTTP/1.1 404 Not Found');
	echo "<script>window.location.replace('http://www.bastion.ua/404.html');</script>";
	header("Location: http://www.bastion.ua/404.html");
exit;
}
