<?php 
// Add hidden field 'your-description'  to all forms
add_filter('wpcf7_form_hidden_fields', function($hidden_fields) {
    $form = WPCF7_ContactForm::get_current();
    $hidden_fields['your-description'] = $form->title;
    return $hidden_fields;
});




// Add form id Version 1
/* Contact Form 7 - add form id*/
add_filter('wpcf7_form_id_attr', function($html_id) {
    if ($html_id) {
        return $html_id;
    } else {
        $f_id = WPCF7_ContactForm::get_current();
        return 'wpcf7_id-' . $f_id->id . '_'.get_post_type().'_id_' .get_queried_object_id();
    }
});

// Add form id Version 2
/* Contact Form 7 - add form id*/
add_filter('wpcf7_form_id_attr', function($html_id) {
    if ($html_id) {
        return $html_id;
    } else {
        $f_id = WPCF7_ContactForm::get_current();
        return 'wpcf7_id-' . $f_id->id . '_'.get_post_type().'_id_' .get_queried_object_id();
    }
});




/* Contact Form 7 - add attr [contact-form-7 id="123" title="Contact Form" your-description="Hello World!"]
<form>
	[hidden your-description default:shortcode_attr]
</form>
*/
add_filter( 'shortcode_atts_wpcf7', 'wp_description_shortcode_atts_wpcf7_filter', 10, 3 );
function wp_description_shortcode_atts_wpcf7_filter( $out, $pairs, $atts ) {
    $my_attr = 'your-description';
 
    if ( isset( $atts[$my_attr] ) ) {
        $out[$my_attr] = $atts[$my_attr];
    }
 
    return $out;
}
