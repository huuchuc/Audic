<div class="panel panel-primary">
    <div class="panel-heading">Information</div>
    <div class="panel-content">
        <div class="alert alert-success">
          <strong>Type:</strong> <span class="views-count stats-num">
                    <?php echo get_post_meta(get_the_id(), 'son_type', true); ?>
                  </span>
        </div>
        <div class="alert alert-success">
          <strong>Price:</strong> 
          <span class="stats-label likes-count">
            <?php echo get_post_meta(get_the_id(), 'son_price', true); ?>
          </span>
        </div>
        <table class="table">
          <thead>
            <tr class="warning">
              <th>Contact</th>
              <th>Phone No</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>080-1234-5678</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>Mary Moe</td>
              <td>090-4556-1223</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>July Dooley</td>
              <td>050-2444-3333</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>
                    
<?php
if ( is_active_sidebar('main-sidebar') ) {
	echo '<div id="random"><ul>';
        dynamic_sidebar( 'main-sidebar' );
    echo '</ul></div>';
} else { ?>
    <div class="panel panel-primary">
        <div class="panel-heading">Related post</div>
        <div class="panel-content">
        <div class="row">
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
                <?php $cat_id = the_category_id(false);
                      $rand_posts = get_posts('category='.$cat_id.'&numberposts=8&orderby=rand');  foreach( $rand_posts as $post ) : ?>
                <div class="col-md-6">
                <div class="p-thumbnail"><a href="<?php the_permalink() ?>"><?php the_post_thumbnail(array(160,85)); ?></a></div></div>
                <?php endforeach; wp_reset_query(); ?>          
            <?php endif; ?>
        </div>
        </div>
    </div>
<?php } ?>