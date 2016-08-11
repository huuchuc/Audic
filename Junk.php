<!--
	<div id="main_menu">
		<div class="box">
			<h1 id="logo"><a href="<?php echo home_url(); ?>" title="<?php echo esc_attr(get_bloginfo('name')); ?>" rel="home"><span class="icon1-office"> </span><?php bloginfo('name'); ?></a></h1>
			<ul>
				<li id="nav"><?php wp_nav_menu(array('menu' => 'header-menu')); ?></li>
			</ul>
			<div id="more">
				<div id="search">
					<span class="icon-search"></span>
					<form id="searchform" method="get" action="<?php echo home_url(); ?>">
						<input type="text" value="<?php the_search_query(); ?>" name="s" id="s" size="20" placeholder="Search name or tag" required="">
	-->
						<!--<button type="submit">Search</button> -->
	<!--
					</form>
				</div>
				<div id="contact">
				<a href="<?php echo home_url(); ?>" target="_blank"><span class="icon-facebook"></span></a>
				<a href="mailto:huuchuc7392@gmail.com" target="_blank"><span class="icon-email"></span></a>
				</div>
			</div>
		</div>
	</div>
	-->
	
<aside id="side">
	<header id="header">
		<h1 id="logo"><a href="<?php echo home_url(); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<nav id="nav"><?php wp_nav_menu( array('menu' => 'header-menu' )); ?></nav>
		<div id="search">
			<a id="rss" href="<?php bloginfo('rss2_url'); ?>" target="_blank" alt="RSS" title="Subscribe in a reader"></a>
			<form id="searchform" method="get" action="<?php echo home_url(); ?>">
				<input type="text" value="<?php the_search_query(); ?>" name="s" id="s" size="20" placeholder="Search" required>
				<button type="submit">Search</button>
			</form>
		</div>
	</header>
	<footer id="footer">
		<p>&copy; 2016 <a href="<?php echo home_url(); ?>"><?php bloginfo( 'name' ); ?></a>.</p>
		<p>Powered by <a href="http://wordpress.org/" target="_blank">WordPress</a>.</p>
		<p>Theme by <a href="http://audic.com" target="_blank">AudiC</a>.</p>
	</footer>
</aside>
