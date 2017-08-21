<?php
/**
 * Theme Name: Salient Child Theme created for CometFocus.com
 * Description: A Salient child theme created for CometFocus.com
 * Version: 1.0.0
 * Author: Daniel Chen
 * Template: salient
 * License: MIT
*/
add_action( 
    'wp_enqueue_scripts', 
    'cf_enqueue_parent_styles'
);
function cf_enqueue_parent_styles() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}

add_action( 
    'wp_enqueue_scripts', 
    'cf_front_page_scripts'
);
function cf_front_page_scripts() {
    if (is_front_page()) {
        wp_enqueue_script(
            'cf-howlerjs',
            get_stylesheet_directory_uri() . '/scripts/howler.min.js',
            array(),
            '1.0.0',
            TRUE
        );
        wp_enqueue_script(
            'cf-custom-music-player',
            get_stylesheet_directory_uri() . '/scripts/jquery.custom-music-player.min.js',
            array('jquery', 'cf-howlerjs'),
            '1.0.0',
            TRUE
        );
        wp_enqueue_script(
            'cf-main',
            get_stylesheet_directory_uri() . '/scripts/main.js',
            array('jquery', 'cf-howlerjs', 'cf-custom-music-player'),
            '1.0.0',
            TRUE
        );
    }
}
?>
