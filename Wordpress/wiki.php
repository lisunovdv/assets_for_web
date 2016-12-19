<?php 
// functions.php
/* Wiki */
if ( ! function_exists( 'register_post_type_wiki' ) ) {

	add_action('init', 'register_post_type_wiki');

	function register_post_type_wiki() {
		$labels = array(
			'name' => 'Термины',
			'singular_name' => 'Термин',
			'all_items' => 'Все Термины',
			'add_new' => 'Добавить новый',
			'add_new_item' => 'Добавить новый термин',
			'edit_item' => 'Редактировать термин',
			'new_item' => 'Новый термин',
			'view_item' => 'Посмотреть термин',
			'search_items' => 'Найти термин',
			'not_found' =>  'Терминов не найдено',
			'not_found_in_trash' => 'В корзине терминов не найдено',
			'parent_item_colon' => '',
			'menu_name' => 'Wiki'
		);
		$args = array(
			'labels' => $labels,
			'public' => true,
			'publicly_queryable' => true,
			'show_ui' => true,
			'show_in_menu' => true,
			'query_var' => true,
			'capability_type' => 'post',
			'has_archive' => true,
			'hierarchical' => false,
			'menu_position' => 5,
			'menu_icon' => 'dashicons-format-quote',
			'taxonomies' => array('category','post_tag'),
			'rewrite'  => array( 'slug' => 'wiki' ),
			'supports' => array('title','editor','author','thumbnail','excerpt','custom-fields','post-formats')
		);
		register_post_type('wiki',$args);
	}
}

function save_wiki_meta( $post_id, $post, $update ) {

    $slug = 'wiki'; //Slug of CPT

    // If this isn't a 'news' post, don't update it.
    if ( $slug != $post->post_type ) {
        return;
    }

    wp_set_object_terms( $post->ID, 'wiki', 'category' );
}
add_action( 'save_post', 'save_wiki_meta', 10, 3 );
?>





// wp-content/domriyecommerce/theme/modules/post-items/wiki-list-content.php

<?php
$posts_per_page = -1;
$letter = mb_substr($_GET['letter'], 0, 1, 'utf-8');
$letter_upp = $letter ? mb_strtoupper($letter, 'UTF-8') : "А";
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array (
    'posts_per_page' => $posts_per_page,
    'post_type' => 'wiki',
    'orderby' => 'title',
    'order' => 'ASC',
    'paged' => $paged
);
?>
<style>
    .wiki-letters {
        list-style: none;
    }

    .wiki-letters li {
        display: inline-block;
        margin-right: 1rem;
    }
</style>
<ul class="wiki-letters">
<?php
     foreach (range(chr(0xC0), chr(0xDF)) as $b) {
         $abc_rus[] = iconv('CP1251', 'UTF-8', $b);
     }
     foreach ($abc_rus as $lette_rus) {
         $cssClass = strnatcasecmp($letter_upp,$lette_rus) == 0 ? ' class="wiki-active" ' : '';
         echo '<li'. $cssClass .'><a href="/category/wiki/?letter='.$lette_rus.'">'.$lette_rus.'</a></li>';
     }
?>
</ul>
<?php


$posts = get_posts($args);
foreach( $posts as $k => $post ){
    $wiki_term_letter = mb_substr(get_the_title(), 0, 1, 'utf-8');
    if( strnatcasecmp ($letter_upp, $wiki_term_letter) == 0) {
        echo '<li>' . get_the_title(). '</li>';
    }
}
wp_reset_postdata();
?>
