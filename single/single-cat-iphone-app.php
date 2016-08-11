<?php get_header(); ?>
<div class="container">
<!--<section id="single">-->
	<?php while (have_posts()) : the_post(); ?>	
		
	<div class="row">
		<!-- post content -->
		<div class="col-md-12">

			<header id="single-header">
				<h1><?php the_title(); ?>
					<a class= "ios_link" href="<?php echo get_post_meta(get_the_id(), 'ios_link', true); ?>" target="_blank"></a>
				</h1>
				<div class="meta"><?php the_tags('','',''); ?></div>
			</header>
			<!--<article id="post">-->
			<article>
			<div class="col-md-12">
				<div id="p-content">
					<div id="iphone_app_content">
						<?php the_content(); ?>
						<?php wp_link_pages(); ?>
					</div>
				</div>
			</div>
			<!--<hr>-->
			<div class="col-md-12" style="margin-top:10px;">
			<div class="row">
				<div class="panel panel-primary">
					<div class="panel-heading">Related post</div>
					<div class="panel-content">
						<?php get_sidebar(); ?>
					</div>
				</div>
			</div>
			<div class="row">
				<div id="p-comment">
					<div class="panel panel-primary">
					<div class="panel-heading">Comment</div>
					<div class="panel-content"><?php comments_template(); ?></div>
				</div>
			</div>
			</div>
					
			</div>
			</article>
		</div>

	</div>


		
	<?php endwhile; ?>
	
	
<!--</section>-->
</div>

<?php get_footer(); ?>


