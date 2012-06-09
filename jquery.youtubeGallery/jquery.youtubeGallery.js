/**
 * jquery.youtubeGallery.js
 * Description: YoutubeのURLをもとにギャラリーを生成
 * Version: 1.0
 * Author: Takashi Kitajima
 * Autho URI: http://2inc.org
 * created: Jun 7, 2012
 * License: GPL2
 *
 * Copyright 2012 Takashi Kitajima (email : inc@2inc.org)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * @param	Num	width
 * 			Num	height
 * 			Num	speed
 * 			Array	urls['http://www.youtube.com/watch?v=xxxxx', 'http://www.youtube.com/watch?v=xxxxx']
 */
( function( $ ) {
	$.fn.youtubeGallery = function( config ) {
		var defaults = {
			'width': '320',
			'height': '180',
			'speed': '1000',
			'urls': []
		};
		config = $.extend( defaults, config );
		var zindex = 0;

		return this.each( function( i, elem ) {
			var ytg_thumbnails = [];
			$.each( config.urls, function( q, url ) {
				var _id = url.match( '[\\?&]v=([^&#]*)' );
				if ( _id !== null ) {
					var id = _id[1];
					var thumbnail = $('<img />')
										.attr( 'src', 'http://img.youtube.com/vi/' + id + '/2.jpg' )
										.attr( 'id', id );
					ytg_thumbnails.push( thumbnail );
				}
			});
			
			if ( ytg_thumbnails.length > 0 ) {
				$(elem).append( '<div class="ytg_player"></div>' );
				$(elem).append( '<div class="ytg_thumbnails"></div>' );
				
				$.each( ytg_thumbnails, function( q, thumbnail ) {
					$(elem).find('.ytg_thumbnails').append( thumbnail );
				});
				
				var youtube = getYoutube( ytg_thumbnails[0].attr('id')  );
				$(elem).find('.ytg_player')
					.css({
						'height': config.height,
						'width': config.width
					})
					.html( youtube.show() );
				
				var clickFlg = true;
				$(elem).find('.ytg_thumbnails img').click( function() {
					if ( clickFlg ) {
						clickFlg = false;
						var id = $(this).attr( 'id' );
						var youtube = getYoutube( id );
						$(elem).find('.ytg_player').append(
							youtube.fadeIn( 'config.speed', function() {
								$(elem).find('.ytg_player iframe:not(:last)').remove();
								clickFlg = true;
							} )
						);
					}
				});
			}
		});
		
		function getYoutube( id ) {
			zindex += 1;
			return $('<iframe />')
						.attr( 'width', config.width )
						.attr( 'height', config.height )
						.attr( 'src', 'http://www.youtube.com/embed/' + id + "?rel=0" )
						.attr( 'frameborder', "0" )
						.attr( 'allowfullscreen', true )
						.css( {
							'z-index': zindex
						} )
						.hide();
		}
	};
} )(jQuery);