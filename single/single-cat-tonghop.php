<?php get_header(); ?>
<!--<section id="single">-->
<div class="container">
	<?php while (have_posts()) : the_post(); ?>	
		
	<div class="row">
		<div class ="col-,d-12">
			<header id="single-header">
				<h1><?php the_title(); ?></h1>
				<div class="meta">
					<?php the_tags('','',''); ?>
				</div>
			</header>
		</div>
		<!-- post content -->
		<div class="col-md-8">
			<!--<article id="post">-->
			<article>
				<div id="p-content">
					<div id="post_content">

						

						<?php the_content(); ?>
						<?php wp_link_pages(); ?>
					</div>
				</div>
				<!--
				<hr>
				<div id="p-comment">	
					<div class="panel panel-primary">
						<div class="panel-heading">Comment</div>
						<div class="panel-content"><?php //comments_template(); ?></div>
						
					</div>
					
				</div>
				-->
			</article>
		</div>

		<!-- Side bar -->
		<div class="col-md-4">
			<div class="row">
				<?php get_sidebar(); ?>
			</div>
		</div>	

	</div>
		
	<?php endwhile; ?>
</div>
<!--</section>-->

<?php get_footer(); ?>


