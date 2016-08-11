<div id="comment">	
	<?php if ( post_password_required() ) : ?>
		<p>This post is password protected. Enter the password to view any comments.</p>
	<?php return; endif; ?>
	<?php if ( have_comments() ) : ?>
		<h3><?php comments_number(__('No Comments', '1 Comment', '% Comments' ));?></h3>
		<ol class="comment_list">
			<?php 
				wp_list_comments( array ('style' => 'ol', 'avatar_size'=>24,'type'=>'comment'));
				//wp_list_comments(args);
			?>
		</ol>
		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
			<nav class="navigation">	
    	    	<span class="alignleft"><?php previous_comments_link(('&laquo;' )); ?></span>
        		<span class="alignright"><?php next_comments_link(( '&raquo;' )); ?></span>
    		</nav>
		<?php endif; ?>
	<?php endif; ?>
	<?php if ( ! comments_open() ) : ?>
	<p>Comments are closed.</p>
	<?php endif; ?>

	<?php comment_form(); ?>
</div>