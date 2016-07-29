//Допил новостейт на сайт
//В functions.php :
// NEWS
<?php
if ( ! function_exists( 'my_news_init' ) ) {
    add_action('init', 'my_news_init');
    function my_news_init()
    {
      $labels = array(
        'name' => 'Новости',
        'singular_name' => 'Новость',
        'all_items' => 'Все Новости',
        'add_new' => 'Добавить новую',
        'add_new_item' => 'Добавить новую новость',
        'edit_item' => 'Редактировать новость',
        'new_item' => 'Новая новость',
        'view_item' => 'Посмотреть новость',
        'search_items' => 'Найти новость',
        'not_found' =>  'Новостей не найдено',
        'not_found_in_trash' => 'В корзине новостей не найдено',
        'parent_item_colon' => '',
        'menu_name' => 'Новости'

      );
      $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-media-document',
        /*'taxonomies' => array('category','post_tag'),*/
        'rewrite'  => array( 'slug' => 'novosti' ),
        'supports' => array('title','editor','author','thumbnail','excerpt','custom-fields','post-formats')
      );
      register_post_type('novosti',$args);
    }
}

// Excerpt
function new_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'new_excerpt_length');

function new_excerpt_more($more) {
    return '... <a href="'. get_permalink($post->ID) . '" rel="nofollow" title="Подробнее" class="news-readmore">Подробнее >></a>';
}
add_filter('excerpt_more', 'new_excerpt_more');

?>
//Вывод новости в index.php
<ul class="news-list kill-list">
                <?php
                    $mypost = array( 'post_type' => 'novosti' );
                    $loop = new WP_Query( $mypost );
                    ?>
                    <?php while ( $loop->have_posts() ) : $loop->the_post();?>
                        <li class="news-item"><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php
                                 if (has_post_thumbnail()) {
                                    $default_attr = array('title' => $post->post_title);
                                    echo get_the_post_thumbnail(null, 'full', $default_attr);
                                } 
                                ?><span class="news-title"><?php the_title(); ?></span></a><?php the_excerpt(); ?></li>
                    <?php endwhile; ?>
                <?php wp_reset_query(); ?>
            </ul>
