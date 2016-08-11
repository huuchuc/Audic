<?php
	/* Create sidebar1 */
	if ( function_exists('register_sidebar') )
	register_sidebar(array(
		'name' => __('sidebar 1', 'Audic'),
		'id' => 'sidebar1',
		'before_widget' => '<li id="%1$s" class="widget %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h2>',
		'after_title' => '</h2>',
	));
	
	/* Create main-sidebar */
	$sidebar = array(
	  'name' => __('Main Sidebar', 'Audic'),
	  'id' => 'main-sidebar',
	  'description' => 'Main sidebar for Audic theme',
	  'class' => 'main-sidebar',
	  'before_title' => '<h3 class="widgettitle">',
	  'after_title' => '</h3>'
	);
	register_sidebar( $sidebar );

	/* Create menu */
	register_nav_menus(
		array(
			'header-menu' => 'header-menu'
		)
	);

	if ( ! isset( $content_width ) )
	$content_width = 600;
	if ( function_exists( 'add_theme_support' ) ) {
		
		add_theme_support( 'automatic-feed-links' );

    	add_theme_support( 'post-thumbnails', array( 'post', 'page' ) );

    	add_theme_support( 'post-formats', array( 'aside', 'gallery' ) );

		// add post-formats to post_type 'page'
		add_post_type_support( 'page', 'post-formats' );


    	set_post_thumbnail_size( 300, 200, true );

    	add_image_size( 'iphone-app', 300, 532 ); 
    	add_image_size( 'tonghop', 400, 300 ); 
    	add_image_size( 'sidebar', 220, 180 ); 
	};

	// hien thi Category 13 tren home page
	add_action( 'pre_get_posts', 'one_category_home_page' );
	function one_category_home_page( $query ) {
		if ( $query->is_home() && $query->is_main_query() ) {
			$query->set( 'cat', '13' );
		}
	}

	//if ( ! function_exists( 'audic_style' ) )
	function audic_style() {
		//style.css
		wp_register_style('main-style', get_template_directory_uri().'/style.css', 'all');
		wp_enqueue_style('main-style');

		//Global.css
		wp_register_style('global-css', get_template_directory_uri().'/css/global.css', 'all');
		wp_enqueue_style('global-css');

		// Dribbble
		wp_register_style('dribbble-css', get_template_directory_uri().'/css/dribbble.css', 'all');
		wp_enqueue_style('dribbble-css');

		//bootstrap.css
		wp_register_style('bootstrap-css', get_template_directory_uri().'/css/bootstrap.min.css', 'all');
		wp_enqueue_style('bootstrap-css');

		//jquery
		wp_register_script('jquery-js', get_template_directory_uri().'/js/jquery.min.js', 'all');
		wp_enqueue_script('jquery-js');

		//lazy load
		wp_register_script('lazyload-js', get_template_directory_uri().'/js/lazyload.min.js', 'all');
		wp_enqueue_script('lazyload-js');

		// Share 
		wp_register_script('share-js', get_template_directory_uri().'/js/global-share.js', 'all');
		wp_enqueue_script('share-js');

	}
	add_action('wp_enqueue_scripts', 'audic_style');

	// Định nghĩa đường dẫn mặc định cho folder template single
	define(SINGLE_PATH, TEMPLATEPATH . '/single');
	 
	// Lọc single_template bằng custom function
	add_filter('single_template', 'my_single_template');
	 
	// Function template single chọn template
	function my_single_template($single)
	{
	     global $wp_query, $post;
	 
	     // Kiểm tra template single theo category
	     // Kiểm tra category slug và ID
	     foreach((array)get_the_category() as $cat) :
		     if(file_exists(SINGLE_PATH . '/single-cat-' . $cat->slug . '.php'))
		          return SINGLE_PATH . '/single-cat-' . $cat->slug . '.php';
		 
		     elseif(file_exists(SINGLE_PATH . '/single-cat-' . $cat->term_id . '.php'))
		          return SINGLE_PATH . '/single-cat-' . $cat->term_id . '.php';
		 	 else
		 	 	return SINGLE_PATH.'/single.php'; 
	     endforeach;
	}



	/* Pagination */
	//if ( ! function_exists('wp_pagination') )
	function wp_pagination() {
	global $wp_query;
	$big = 12345678;
	$page_format = paginate_links( array(
	    'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
	    'format' => '?paged=%#%',
	    'current' => max( 1, get_query_var('paged') ),
	    'total' => $wp_query->max_num_pages,
	    'type'  => 'array',
	    'prev_next'          => true,
		'prev_text'          => __('&lt;'),
		'next_text'          => __('&gt;'),
		'before_page_number' => '',
		'after_page_number'  => ''

	) );
	if( is_array($page_format) ) {
	            $paged = ( get_query_var('paged') == 0 ) ? 1 : get_query_var('paged');
	            //echo '<span>'. $paged . ' of ' . $wp_query->max_num_pages .'</span>';
	            foreach ( $page_format as $page ) {
	                    echo "$page";
	            }
	}
	}

/**
 * Class Name: wp_bootstrap_navwalker
 * GitHub URI: https://github.com/twittem/wp-bootstrap-navwalker
 * Description: A custom WordPress nav walker class to implement the Bootstrap 3 navigation style in a custom theme using the WordPress built in menu manager.
 * Version: 2.0.4
 * Author: Edward McIntyre - @twittem
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */
class Audic_walker extends Walker_Nav_Menu {
	/**
	 * @see Walker::start_lvl()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param int $depth Depth of page. Used for padding.
	 */
	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul role=\"menu\" class=\" dropdown-menu\">\n";
	}
	/**
	 * @see Walker::start_el()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param object $item Menu item data object.
	 * @param int $depth Depth of menu item. Used for padding.
	 * @param int $current_page Menu item ID.
	 * @param object $args
	 */
	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
		/**
		 * Dividers, Headers or Disabled
		 * =============================
		 * Determine whether the item is a Divider, Header, Disabled or regular
		 * menu item. To prevent errors we use the strcasecmp() function to so a
		 * comparison that is not case sensitive. The strcasecmp() function returns
		 * a 0 if the strings are equal.
		 */
		if ( strcasecmp( $item->attr_title, 'divider' ) == 0 && $depth === 1 ) {
			$output .= $indent . '<li role="presentation" class="divider">';
		} else if ( strcasecmp( $item->title, 'divider') == 0 && $depth === 1 ) {
			$output .= $indent . '<li role="presentation" class="divider">';
		} else if ( strcasecmp( $item->attr_title, 'dropdown-header') == 0 && $depth === 1 ) {
			$output .= $indent . '<li role="presentation" class="dropdown-header">' . esc_attr( $item->title );
		} else if ( strcasecmp($item->attr_title, 'disabled' ) == 0 ) {
			$output .= $indent . '<li role="presentation" class="disabled"><a href="#">' . esc_attr( $item->title ) . '</a>';
		} else {
			$class_names = $value = '';
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[] = 'menu-item-' . $item->ID;
			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
			if ( $args->has_children )
				$class_names .= ' dropdown';
			if ( in_array( 'current-menu-item', $classes ) )
				$class_names .= ' active';
			$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';
			$id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
			$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';
			$output .= $indent . '<li' . $id . $value . $class_names .'>';
			$atts = array();
			$atts['title']  = ! empty( $item->title )	? $item->title	: '';
			$atts['target'] = ! empty( $item->target )	? $item->target	: '';
			$atts['rel']    = ! empty( $item->xfn )		? $item->xfn	: '';
			// If item has_children add atts to a.
			if ( $args->has_children && $depth === 0 ) {
				$atts['href']   		= '#';
				$atts['data-toggle']	= 'dropdown';
				$atts['class']			= 'dropdown-toggle';
				$atts['aria-haspopup']	= 'true';
			} else {
				$atts['href'] = ! empty( $item->url ) ? $item->url : '';
			}
			$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );
			$attributes = '';
			foreach ( $atts as $attr => $value ) {
				if ( ! empty( $value ) ) {
					$value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
					$attributes .= ' ' . $attr . '="' . $value . '"';
				}
			}
			$item_output = $args->before;
			/*
			 * Glyphicons
			 * ===========
			 * Since the the menu item is NOT a Divider or Header we check the see
			 * if there is a value in the attr_title property. If the attr_title
			 * property is NOT null we apply it as the class name for the glyphicon.
			 */
			if ( ! empty( $item->attr_title ) )
				$item_output .= '<a'. $attributes .'><span class="glyphicon ' . esc_attr( $item->attr_title ) . '"></span>&nbsp;';
			else
				$item_output .= '<a'. $attributes .'>';
			$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
			$item_output .= ( $args->has_children && 0 === $depth ) ? ' <span class="caret"></span></a>' : '</a>';
			$item_output .= $args->after;
			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}
	/**
	 * Traverse elements to create list from elements.
	 *
	 * Display one element if the element doesn't have any children otherwise,
	 * display the element and its children. Will only traverse up to the max
	 * depth and no ignore elements under that depth.
	 *
	 * This method shouldn't be called directly, use the walk() method instead.
	 *
	 * @see Walker::start_el()
	 * @since 2.5.0
	 *
	 * @param object $element Data object
	 * @param array $children_elements List of elements to continue traversing.
	 * @param int $max_depth Max depth to traverse.
	 * @param int $depth Depth of current element.
	 * @param array $args
	 * @param string $output Passed by reference. Used to append additional content.
	 * @return null Null on failure with no changes to parameters.
	 */
	public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        if ( ! $element )
            return;
        $id_field = $this->db_fields['id'];
        // Display this element.
        if ( is_object( $args[0] ) )
           $args[0]->has_children = ! empty( $children_elements[ $element->$id_field ] );
        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }
	/**
	 * Menu Fallback
	 * =============
	 * If this function is assigned to the wp_nav_menu's fallback_cb variable
	 * and a manu has not been assigned to the theme location in the WordPress
	 * menu manager the function with display nothing to a non-logged in user,
	 * and will add a link to the WordPress menu manager if logged in as an admin.
	 *
	 * @param array $args passed from the wp_nav_menu function.
	 *
	 */
	public static function fallback( $args ) {
		if ( current_user_can( 'manage_options' ) ) {
			extract( $args );
			$fb_output = null;
			if ( $container ) {
				$fb_output = '<' . $container;
				if ( $container_id )
					$fb_output .= ' id="' . $container_id . '"';
				if ( $container_class )
					$fb_output .= ' class="' . $container_class . '"';
				$fb_output .= '>';
			}
			$fb_output .= '<ul';
			if ( $menu_id )
				$fb_output .= ' id="' . $menu_id . '"';
			if ( $menu_class )
				$fb_output .= ' class="' . $menu_class . '"';
			$fb_output .= '>';
			$fb_output .= '<li><a href="' . admin_url( 'nav-menus.php' ) . '">Add a menu</a></li>';
			$fb_output .= '</ul>';
			if ( $container )
				$fb_output .= '</' . $container . '>';
			echo $fb_output;
		}
	}
}
?>