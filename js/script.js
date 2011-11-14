$(function () {
	/* language navigation */
	$(".language").click(function () {
		if (!$(this).hasClass("current")) {
			$(".language").toggleClass("current");
			$(".article").toggleClass("hidden");
		}
	});

	/* contents open/close */
	$(".toggle").click(function () {
		$(this).toggleClass("closed");
		$(this).next(":first").slideToggle();
	});

	/* google-code-prettify */
	prettyPrint();
});
