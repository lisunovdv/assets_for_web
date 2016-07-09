[[*description:notempty=`<p>[[*description]]</p>`]]
[[*tv_tabs:isnot=``:then=``]]

UPDATE `modx_site_htmlsnippets` SET `snippet` = replace(`snippet`, '/storage/', '/assets/images/');

@DATABASE@_%H-%i_%d-%m-%Y
