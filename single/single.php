<?php get_header(); ?>
<div class="container">
<!--<section id="single">-->
	<?php while (have_posts()) : the_post(); ?>	
		
	<div class="row">
		<!-- post content -->
		<div class="col-md-8">

			<header id="single-header">
				<div class="time">
					<time datetime="<?php the_time('Y-m-d'); ?>" pubdate>
						<div class="label label-default"><?php the_time('Y-m-d') ?></div>
					</time>
				</div>
				<h1><?php the_title(); ?></h1>
				<div class="meta"><?php the_tags('','',''); ?></div>
			</header>
			<!--<hr>-->

			<!--<article id="post">-->
			<article>
			<div class="col-md-12">
			<div id="p-content">
				<div id="post_content">
					<?php the_content(); ?>
					<?php wp_link_pages(); ?>
				</div>
			</div>
			</div>
			<!--<hr>-->
			<div class="col-md-12">
			<div id="p-comment">	
				<div class="panel panel-primary">
				<div class="panel-heading">Comment</div>
				<div class="panel-content"><?php comments_template(); ?></div>
			</div>
			</div>
					
			</div>
			</article>
		</div>
	
		<!-- Side bar -->
		<div class="col-md-4">
			<div class="row">
				<?php get_sidebar( 'right' ); ?>
			</div>
			
		</div>

	</div>
		
	<?php endwhile; ?>
	
	
<!--</section>-->
</div>

<?php get_footer(); ?>


