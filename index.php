<?php get_header(); ?>
<article class="box">
	<!-- bootstrum-->
	<div class="jumbotron">
	    <h1>Find your interests</h1>
	    <p>Everything on AudiC is chosen, created, or inspired by our enthusiast communities.</p>
  	</div>

	<div id="main">
	
	<ul id="list">
		<?php 
			  if (have_posts()) : while (have_posts()) : the_post(); ?>
		<!--<section <?php post_class() ?>>-->
			<li>
				<div class="thumb">
					<a href="<?php the_permalink() ?>"><?php the_post_thumbnail(array(300,200)); ?></a>
				</div>
				<div class="title">
					<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
				</div>
			</li>
		<!--</section>-->
		<?php endwhile; endif; ?>
	</ul>
	<div class="pagebar">

	<?php wp_pagination(); ?>

	</div></div>
</article>

<?php get_footer(); ?>