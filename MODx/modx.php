[[*description:notempty=`<p>[[*description]]</p>`]]
[[*tv_tabs:isnot=``:then=``]]


[[%5:babelid]]


//richtext TO plain text
[[+title:strip_tags=``:stripString=`"`:strip:htmlent]]

UPDATE `modx_site_htmlsnippets` SET `snippet` = replace(`snippet`, '/storage/', '/assets/images/');

@DATABASE@_%H-%i_%d-%m-%Y
