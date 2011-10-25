/*
 * doticker.min.js v0.9.0
 *
 * Copyright (c) 2011 tokkonoPapa http://tokkono.cute.coocan.jp/blog/slow/
 *
 * doticker.js is freely distributable under the terms of an MIT-style license.
 * For details, see http://www.opensource.org/licenses/MIT
 */
(function ($) {
	$.fn.doticker = function (opts) {
		var $this = this;
		var defaults = {
			loop: true,
			maxCodes: 10,
			interval: 6000,
			scrollbar: false,
			duration: 'normal',
			width: 'auto',
			height: '300px',
			background: '#9bc6f2',
			bodyground: '#fff',
			bordercolor: '#888',
			url_user: 'http://api.jsdo.it/v0.2/user/show.json',
			url_list: 'http://api.jsdo.it/v0.2/user/codes.json',
			url_code: 'http://api.jsdo.it/v0.2/code/show.json',
			url_logo: 'http://jsdo.it/img/common/sitename_03.png',
			name: ''
		};
		var options = $.extend(defaults, opts);

		// For restart
		$this.empty();
		clearTimeout(options.timer);

		//
		// Setup styles
		//
		var setupStyles = function () {
			var s = 
'#[id]wrap {' +
	'width:[width];' +
	'margin:0 auto;' +
	'padding:0;' +
	'border-radius:5px;' +
	'background:[background];' +
//	'font-family:"lucida grande",lucida,tahoma,helvetica,arial,sans-serif;' +
'}\n' +
'#[id]wrap * {' +
	'margin:0 !important;' +
	'padding:0 !important;' +
'}\n' +
'#[id]wrap img {' +
	'float:left;' +
	'border:none;' +
'}\n' +
'#[id]wrap li {' +
	'overflow:hidden;' +
	'list-style-type:none !important;' +
'}\n' +
'#[id]wrap li:before {' +
	'content:none !important;' +
'}\n' +
'#[id]head,\n' +
'#[id]foot {' +
	'min-height:32px !important;' +
	'padding:10px !important;' +
	'overflow:hidden;' +
	'position:relative;' +
'}\n' +
'#[id]head {' +
	'font-size:14px !important;' +
	'line-height:1.4 !important;' +
'}\n' +
'#[id]head img {' +
	'width:32px !important;' +
	'height:32px !important;' +
'}\n' +
'#[id]head div {' +
	'margin-top:-4px !important;' +
	'margin-left:40px !important;' +
'}\n' +
'#[id]head li {' +
	'margin-right:4px !important;' +
	'font-size:12px !important;' +
	'float:left;' +
'}\n' +
'#[id]body {' +
	'clear:both;' +
	'height:[height];' +
	'margin:0 1px !important;' +
	'font-size:14px !important;' +
	'line-height:1.2 !important;' +
	'overflow:[scrollbar];' +
	'border-radius:5px;' +
	'background:[bodyground];' +
'}\n' +
'#[id]body li {' +
	'padding:8px !important;' +
	'border-bottom:1px dotted [bordercolor];' +
'}\n' +
'#[id]doc img {' +
	'width:50px !important;' +
	'height:50px !important;' +
'}\n' +
'#[id]doc div {' +
	'margin-left:58px !important;' +
'}\n' +
'#[id]doc h5 {' +
	'font-weight:normal;' +
'}\n' +
'#[id]doc p {' +
	'margin-top:4px !important;' +
	'font-size:12px !important;' +
'}\n' +
'#[id]foot {' +
	'font-size:12px !important;' +
	'line-height:1.2 !important;' +
	'padding-bottom:6px !important;' +
'}\n' +
'#[id]foot img {' +
	'width:79px;' +
	'height:39px;' +
	'margin-top:-3px !important;' +
'}\n' +
'#[id]foot p {' +
	'top:50%;' +
	'display:block;' +
	'margin-left:90px !important;' +
	'margin-right:8px !important;' +
'}\n';
			// Style options
			options.id = $this.attr('id') + '-dt-';
			options.scrollbar = options.scrollbar === true ? 'auto' : 'hidden';

			// Replace '[key]' with value in options
			$.each('id width height scrollbar background bodyground bordercolor'.split(' '), function (i, key) {
				s = s.replace(new RegExp('\\[' + key + '\\]', 'img'), options[key]);
//				s = s.split('[' + key + ']').join(options[key]);
			});

			// Add styles into the head
			var e = document.createElement('style');
			e.type = 'text/css';
			if (e.styleSheet) {
				e.styleSheet.cssText = s;
			} else {
				e.innerHTML = s;
			}
			document.getElementsByTagName("head")[0].appendChild(e);
		};

		//
		// Setup ticker widget
		//
		var setupWidget = function () {
			var id = options.id;
			$this.append(
'<div id="' + id + 'wrap">' +
	'<div id="' + id + 'head"></div>' +
	'<div id="' + id + 'body">' +
		'<ul id="' + id + 'doc"></ul>' +
	'</div>' +
	'<div id="' + id + 'foot">' +
		'<a href="http://jsdo.it/">' +
			'<img src="' + options.url_logo + '" title="jsdo.it" />' +
		'</a>' +
		'<p><a href="http://jsdo.it/">Share JavaScript, HTML5 and CSS</a></p>' +
	'</div>' +
'</div>'
			);

			// Shortcut objects
			options.bottom = $('#' + id + 'foot').offset().top;
			options.doc = $('#' + id + 'doc');
			options.doc.pend = options.loop === true ? options.doc.prepend : options.doc.append;

			// Mouse event
			$('#' + id + 'body').hover(
				function () { options.doc.addClass('doticker-stop'); },
				function () { options.doc.removeClass('doticker-stop'); }
			);
		};

		//
		// Setup widget header with user info
		//
		var showProfile = function (user) {
			// Correct bug
			user.url = 'http://jsdo.it/' + user.name;

			$('#' + options.id + 'head').append(
'<a href="' + user.url + '">' +
	'<img src="' + user.icon + '" title="profile" />' +
'</a>' +
'<div>' +
	'<h4>' +
		'<a href="' + user.url + '" title="profile" target="_blank">' + user.name + '</a>' +
	'</h4>' +
	'<ul>' +
		'<li>' +
			'<a href="' + user.url + '/codes" title="codes" target="_blank">codes ' + user.counts.codes + '</a> /' +
		'</li>' + 
		'<li>' +
			'forked ' + user.counts.forked + ' /' +
		'</li>' +
		'<li>' +
			'<a href="' + user.url + '/favorites" title="favorites" target="_blank">&hearts; ' + user.counts.favorited + '</a>' +
		'</li>' +
	'</ul>' +
'</div>'
			);
		};

		//
		// Keep the codes of interest
		//
		var setupCodes = function (list) {
			options.codes = [];
			var n = 0;
			if (list.results !== undefined) {
				n = list.results.length < options.maxCodes ?
					list.results.length : options.maxCodes;
				var i;
				for (i = 0; i < n; i++) {
					var code = list.results[i];
					options.codes[i] = code;
					options.codes[i].content =
'<li>' +
	'<a href="' + code.url + '" target="_blank">' +
		'<img src="' + code.thumbnail['100'] + '" title="' + code.title + '" />' +
	'</a>' +
	'<div>' +
		'<h5>' +
			'<a href="' + code.url + '" target="_blank">' + code.title + '</a>' +
		'</h5>' +
		'<p>' +
			'Last modified ' + code.modified_date.split(' ')[0] + '<br />' +
			'views ' + code.statistic.pageview + ' / ' +
			'forked ' + code.statistic.forked + ' / ' +
			'&hearts; ' + code.statistic.favorite +
		'</p>' +
	'</div>' +
'</li>';
				}
			}

			// Behavior options
			options.current = options.maxCodes = n;
			options.timer = false;
			options.timeout = options.interval;
			if (options.loop !== true) {
				options.interval = options.duration = 0;
			}

			return n;
		};

		//
		// Main loop
		//
		var mainLoop = function () {
			clearTimeout(options.timer);
			if (options.doc.hasClass('doticker-stop') === false) {
				// Restet pointer
				if (options.current >= options.maxCodes) {
					options.current = 0;
				}

				// Add content
				var e = options.doc.pend(options.codes[options.current].content).children(':first');

				// It causes jump effect without height setting
				// cf: http://blog.pengoworks.com/index.cfm/2009/4/21/Fixing-jQuerys-slideDown-effect-ie-Jumpy-Animation
				e.height(e.height());

				// Show with animation
//				e.hide().css({opacity: 0}).slideDown(options.duration)
//					.animate({opacity: 1}, options.duration, function () {
				e.hide().slideDown(options.duration, function () {
					var f = options.doc.children();
					var i = f.length - 1;
					if (options.loop === true && options.scrollbar === false) {
						// Remove unvisible items
						while (i >= 0) {
							if ($(f[i]).offset().top > options.bottom) {
								$(f[i--]).remove();
							} else {
								break;
							}
						}
					} else {
						// Remove overflow items
						while (i >= options.maxCodes) {
							$(f[i--]).remove();
						}
					}
				});

				// Set next item
				options.current++;
			}

			// Next loop
			if (options.loop === true || options.current !== options.maxCodes) {
				options.timer = setTimeout(mainLoop, options.interval);
			}
		};

		//
		// Initialization
		//
		var init = function () {
			setupStyles();
			setupWidget();

			// Setup Ajax default settings
			$.ajaxSetup({
				dataType: "jsonp",
				data: {
					name: options.name
				},
				timeout: options.timeout,
				error: function (jqXHR, textStatus, errorThrown) {
					options.doc.append('<li>' + textStatus + '</li>');
				}
			});

			// Now get the user infomation
			$.ajax({
				url: options.url_user,
				success: function (user, textStatus, jqXHR) {
					showProfile(user);

					// Now get the codes list
					$.ajax({
						url: options.url_list,
						success: function (list, textStatus, jqXHR) {
							if (setupCodes(list)) {
								mainLoop();
							}
						}
					});
				}
			});
		};

		init();
		return $this;
	};
})(jQuery);