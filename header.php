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
		?>	
	</title>
	
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

<body <?php body_class(); ?> style="background: #f8f8f8;">
		
<header id="header">
	<nav class="navbar navbar-inverse" style="border-radius: 0px; margin-bottom: 0px;">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <h1 id="logo">
	      	<a href="<?php echo home_url(); ?>" title="<?php echo esc_attr(get_bloginfo('name')); ?>" rel="home" class="navbar-brand"><span class="icon1-office"> </span><?php bloginfo('name'); ?></a>
	      </h1>
	    </div>
	    
	    
	  	<?php
            wp_nav_menu( array(
                'menu'              => 'main',
                'theme_location'    => 'header-menu',
                'depth'             => 2,
                'container'         => 'div',
                //'container_class'   => 'collapse navbar-collapse',
        		//'container_id'      => 'bs-example-navbar-collapse-1',
                'menu_class'        => 'nav navbar-nav',
                'fallback_cb'       => 'Audic_walker::fallback',
                'walker'            => new Audic_walker())
            );
        ?>

    	<ul class="nav navbar-nav navbar-right">
			<?php
			if ( is_user_logged_in() ) {
					echo '<li><a href="'.wp_logout_url( get_permalink() ).'" title="Logout"><span class="glyphicon glyphicon-user"></span> Logout</a></li>';
				} else {
					echo '<li><a href="'.wp_registration_url().'" title="Logout"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
						<li><a href="'.wp_login_url( get_permalink() ).'" title="Signup"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>';
			}
			?>
      
    	</ul>

	  </div>
	</nav>

	<div id="submenu">
		<div class="box">
			<?php wp_nav_menu(array('menu' => 'color')); ?>

		<!-- Create menu  -->
		<div class="filter">
			<span class="icon-category"></span>
			<!-- <div class="menu-header-menu-container"> -->
			<!--<ul id="menu-header-menu" class="menu">-->
				<?php wp_nav_menu(array('menu' => 'header')); ?>
			<!--</ul>-->
			<!-- </div> -->
		</div>
		</div>
	</div>
</header>