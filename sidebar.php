
<!--<aside id="side_right">-->
	<div id="random">
		<ul>
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
				<?php $cat_id = the_category_id(false);
                      $rand_posts = get_posts('category='.$cat_id.'&numberposts=8&orderby=rand');  foreach( $rand_posts as $post ) : ?>
				<li><a href="<?php the_permalink() ?>"><?php the_post_thumbnail('sidebar'); ?></a></li>
				<?php endforeach; wp_reset_query(); ?>    		
			<?php endif; ?>
		</ul>
			
	</div>
<!--</aside>-->