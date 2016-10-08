<!-- In Template: -->
[[!getImageList?
    &docid=`1`
    &tvname=`tv_menu`
    &tpl=`tpl.menuItem`
    &level=`0`
]]

<!-- In chank `tpl.menuItem`: -->
<li class="nav-item level[[+property.level]]">
    <a href="[[+menu_url:is=`--`:then=`[[~[[+menu_item]]]]`:else=`[[+menu_url]]`]]" class="nav-link [[+menu_icon]]">
        [[+menu_text:default=`[[!#[[+menu_item]].menutitle:default=`[[!#[[+menu_item]].pagetitle]]`]]`]]
    </a>
[[+menu_children:notempty=`    
    <ul class="sub-nav-wrap">
        [[!getImageList?
            &value=`[[+menu_children]]`
            &tpl=`tpl.menuItem`
            &level=`[[+property.level:add]]`
        ]]
    </ul>
`]]    
</li>
