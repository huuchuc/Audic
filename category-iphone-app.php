<?php
/**
 * The template for displaying Category Tong hop
*/

get_header(); ?>

<article class="box">
	<div id="main">
	
	<ul id="list">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<!--<section <?php post_class() ?>>-->
			<li>
				<div class="thumb">
					<a href="<?php the_permalink() ?>">
						<?php the_post_thumbnail('iphone-app', array('class' => 'lazy')); ?>
					</a>
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