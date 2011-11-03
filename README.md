My codes ticker for jsdo.it jQuery plugin
=========================================

[jsto.it](http://jsdo.it/) に投稿したマイコードをブログに表示する jQuery 
プラグインです。  
A [jsto.it](http://jsdo.it/) my codes ticker like the official twitter profile 
widget.

解説記事 Article
----------------

[jsdo.itの最新マイコードをブログに流すjQueryプラグインdoticker.js]
(http://tokkono.cute.coocan.jp/blog/slow/index.php/programming/dotickerjs/)

動作条件 Dependency
-------------------

* jQuery 1.3 or heigher

使い方 Usage
------------

### CSS: ###

```css
#ticker {
	min-height: 300px;
}
```

### HTML: ###

```html
<div id="ticker"></div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script type="text/javascript" src="doticker.min.js"></script>
<script type="text/javascript">
$(function() {
	$("#ticker").doticker({name: 'username'});
});
</script>
```

概要 Synopsys
-------------

```javascript
$("#some-element").doticker({options, …});
```

where `options` [ default ] are

*	`name` [ _required_ ]  
	jsdo.it のユーザー名を指定します。  
	Specify user name for jsdo.it.

*	`loop` [ `true` ]  
	一定間隔毎に表示を更新する場合には `true` を、一気に表示させるには `false` 
	を指定します。  
	If `true` then timed interval, or `false` then load all codes.

*	`maxCodes` [ `10` ]  
	表示するコードの最大数を指定します。  
	Maximum number of codes to show.

*	`interval` [ `6000` ]  
	表示を更新する間隔をミリ秒で指定します。  
	Update interval in msec.

*	`scrollbar` [ `false` ]  
	スクロールバーを表示させる場合には `true` を指定します。  
	If `true`, include scrollbar automatically.

*	`duration` [ `'slow'` ]  
	アニメーションの遷移時間をミリ秒、または `'slow'`、`'normal'`、`'fast'` で
	指定します。  
	Specify animation duration in msec or `'slow'`, `'normal'`, `'fast'` 
	same as `jQuery.animation()`.

*	`width` [ `'auto'` ]  
	横幅のスタイルを `px` または `'auto'`、`'100%'`（ラッパー要素の横幅に応じて
	中央に配置される）で指定します。  
	Specify width in `px` or `'auto'`, `'100%'` to fit in a page.

*	`height` [ `'300px'` ]  
	ウィジェットは上から順にヘッダー（ユーザー名が表示される部分）、ボディー
	（コードが紹介される部分）、フッター（jsdo.it へのリンク）の3つのブロックで
	構成されていますが、そのうちボディー部分の高さを `px` で指定します。
	ヘッダー及びフッターは、横幅に合わせて高さが変わります。  
	Widget are composed of three blocks, header, body, footer.
	Here specify height of the body in `px`.

*	`background` [ `'#9bc6f2'` ]  
	ヘッダー、フッターの背景スタイルを設定します。書式は CSS の background 
	プロパティと同じです。  
	Specify style same as background of css.

*	`bodyground` [ `'#fff'` ]  
	ボディーの背景スタイルを設定します。書式は background と同じす。  
	Specify style same as background of css.

*	`bordercolor` [ `'#888'` ]  
	ボディー中の各記事を区切る点線の色を指定します。  
	Specify border color.

Licence
-------

Copyright 2011 [tokkonopapa](http://tokkono.cute.coocan.jp/blog/slow/)  
Licensed under the terms of an MIT-style license.  
See http://www.opensource.org/licenses/MIT