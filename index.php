<?php get_header(); ?>
<article class="box">
	<div id="main">
	<ul id="list">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<section <?php post_class() ?>>
			<li>
				<div class="thumb">
					<a href="<?php the_permalink() ?>"><?php the_post_thumbnail(); ?></a>
				</div>
				<div class="title">
					<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
				</div>
			</li>
		</section>
		<?php endwhile; endif; ?>
	</ul>
	<!-- pb265 --><div class="pagebar">
	<!--<span>&nbsp;</span> -->
	<span><?php previous_posts_link('&laquo;') ?></span>
	<span class="this-page">1</span>
<a href="#" title="Page 2">2</a>
<a href="#" title="Page 3">3</a>
<a href="#" title="Page 4">4</a>
<span class="break">...</span>
<a href="#" title="Page 10">10</a>
<a href="<?php next_posts_link('&raquo;') ?>" title="Page 2">&gt;</a>

</div></div>
</article>

<div class="rss_list">
	<ul>
		<li class="iphone_list">
			<h2>New iPhone Patterns</h2>
										<a href="http://iphone.reeoo.com/gyroscope" target="_blank" title="Gyroscope">
					<img class="lazy" src="http://media.reeoo.com/Gyroscope Splash iPhone.png!iphonemini2x" data-original="http://media.reeoo.com/Gyroscope Splash iPhone.png!iphonemini">
				</a>
							<a href="http://iphone.reeoo.com/boom" target="_blank" title="Boom">
					<img class="lazy" src="http://media.reeoo.com/Boom Splash iPhone.png!iphonemini2x" data-original="http://media.reeoo.com/Boom Splash iPhone.png!iphonemini">
				</a>
					</li>
		<li class="ipad_list">
			<h2>New iPad Patterns</h2>
										<a href="http://ipad.reeoo.com/hopiko" target="_blank" title="HoPiKo">
					<img class="lazy" src="http://media.reeoo.com/HoPiKo Splash iPad.png!ipad2x" data-original="http://media.reeoo.com/HoPiKo Splash iPad.png!ipad">
				</a>
					</li>
		<li class="icon_list">
			<h2>New iOS App Icon Gallery</h2>
										<a href="http://icon.reeoo.com/wokamon/" target="_blank" title="Wokamon">
					<img class="lazy" src="http://media.reeoo.com/Wokamon-icon.png!icon1802x" data-original="http://media.reeoo.com/Wokamon-icon.png!icon180">
				</a>
							<a href="http://icon.reeoo.com/huofar-dailylife/" target="_blank" title="Huofar Dailylife">
					<img class="lazy" src="http://media.reeoo.com/Huofar Dailylife-icon.png!icon1802x" data-original="http://media.reeoo.com/Huofar Dailylife-icon.png!icon180">
				</a>
							<a href="http://icon.reeoo.com/djay-pro/" target="_blank" title="djay Pro">
					<img class="lazy" src="http://media.reeoo.com/djay Pro-icon.png!icon1802x" data-original="http://media.reeoo.com/djay Pro-icon.png!icon180">
				</a>
							<a href="http://icon.reeoo.com/music-memos/" target="_blank" title="Music Memos">
					<img class="lazy" src="http://media.reeoo.com/Music Memos-icon.png!icon1802x" data-original="http://media.reeoo.com/Music Memos-icon.png!icon180">
				</a>
					</li>
	</ul>
</div>

<?php get_footer(); ?>