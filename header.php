<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<title><?php
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( 'Page %s', max( $paged, $page ) );
	?></title>
	
	<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.min.js"></script>
	<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/lazyload.min.js"></script>
	
	<!-- if retina display -->
	<script type="text/javascript">
		function isRetinaDisplay() {
	      if (window.matchMedia) {
	        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
	        if (mq && mq.matches || (window.devicePixelRatio > 1)) {
	          return true;
	        } else {
	          return false;
	        }
	      }
	    }
		$(function() {
			$('img.lazy').lazyload({
	    url_rewriter_fn:function($element,originalSrcInAttr){
	        if(isRetinaDisplay()){
	            return originalSrcInAttr + '2x'
	        }
	        return originalSrcInAttr
	    }
	});
		});
	</script>
	
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" />
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
	<!--[if IE]>
    	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]--> 	
	<?php 
		if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );
		wp_head();
	?>
</head>

<body <?php body_class(); ?>>
		
<header id="header">
	<div id="main_menu">
		<div class="box">
			<h1 id="logo"><a href="<?php echo home_url(); ?>" title="<?php echo esc_attr(get_bloginfo('name')); ?>" rel="home"><span class="icon-reeoo"></span><?php bloginfo('name'); ?></a></h1>
			<ul>
				<li id="nav"><?php wp_nav_menu(array('menu' => 'header-menu')); ?></li>
			</ul>
			<div id="more">
				<div id="search">
					<span class="icon-search"></span>
					<form id="searchform" method="get" action="<?php echo home_url(); ?>">
						<input type="text" value="<?php the_search_query(); ?>" name="s" id="s" size="20" placeholder="Search name or tag" required="">
						<!--<button type="submit">Search</button> -->
					</form>
				</div>
				<div id="contact">
				<a href="<?php echo home_url(); ?>" target="_blank"><span class="icon-facebook"></span></a>
				<a href="mailto:huuchuc7392@gmail.com" target="_blank"><span class="icon-email"></span></a>
				</div>
			</div>
		</div>
	</div>
	<div id="submenu">
		<div class="box">
		<div class="menu-color-menu-container"><ul id="menu-color-menu" class="menu">
			<li id="menu-item-3865" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3865">
					<a title="Black Web Design" href="#">Black</a>
				</li>
			<li id="menu-item-3866" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3866"><a title="Blue Web Design" href="#">Blue</a></li>
			<li id="menu-item-3867" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3867"><a title="Brown Web Design" href="#">Brown</a></li>
			<li id="menu-item-3869" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3869"><a title="Green Web Design" href="#">Green</a></li>
			<li id="menu-item-3868" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3868"><a title="Gray Web Design" href="#">Gray</a></li>
			<li id="menu-item-3871" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3871"><a title="Orange Web Design" href="#">Orange</a></li>
			<li id="menu-item-3872" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3872"><a title="Purple Web Design" href="#">Purple</a></li>
			<li id="menu-item-3873" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3873"><a title="Red Web Design" href="#">Red</a></li>
			<li id="menu-item-3874" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3874"><a title="White Web Design" href="#">White</a></li>
			<li id="menu-item-3875" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3875"><a title="Yellow Web Design" href="#">Yellow</a></li>
			<li id="menu-item-3870" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3870"><a title="Multicolored Web Design" href="#">Multicolored</a></li>
			</ul></div>			
		<div class="filter">
				<span class="icon-category"></span>
				<div class="menu-header-menu-container">
				<ul id="menu-header-menu" class="menu">
			<li id="menu-item-11736" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-11736"><a href="http://www.audic.com">All</a></li>
			<!--<?php wp_list_categories(); ?>-->
			
			
			<li id="menu-item-11737" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11737"><a href="#">App</a></li>
			<li id="menu-item-11750" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11750"><a href="#">Software</a></li>
			</ul></div></div>
		</div>
	</div>
</header>