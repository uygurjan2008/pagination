function pagination(data, pagesize, target1, target2, fn) {

	var add_my_event;
	if (fn instanceof Function) {
		add_my_event = fn;
	}

	var data_on_page = [];
	var a_style = "position: relative;float: left;"
			+ "padding: 6px 12px; margin-left: -1px;"
			+ "line-height: 1.42857143;color: #337ab7;"
			+ "text-decoration: none;  background-color: #fff;"
			+ "border: 1px solid #ddd;";
	var li_style = "display: inline;";
	var span_style = "position: relative;" + " float: left;"
			+ " padding: 6px 12px;" + "margin-left: -1px;"
			+ "line-height: 1.42857143;" + "color: #337ab7;"
			+ "text-decoration: none;" + "background-color: #fff;"
			+ "border: 1px solid #ddd;";

	var dt = data_page(data, pagesize);
	var tmps = "<ul class='pagination' style='margin:0px;margin:0px;display: inline-block;"
			+ "padding-left: 0;margin: 20px 0;border-radius: 4px;'>";
	var p_before = "<li style=\"" + li_style + "\"><a style=\"" + a_style
			+ "\" class='previous  '>&laquo;上5页</a></li>";
	var p_next = "<li style=\"" + li_style + "\"><a style=\"" + a_style
			+ "\"  class='next  '>下5页&raquo;</a></li>";
	var p_goto = "<li style=\""
			+ li_style
			+ "\"><a style=\""
			+ a_style
			+ "\"  class='  go'>GO</a><input type='text' class='p_number' style='width:60px;height:30px;' />"
			+ "</li>";
	var p_all = "<li style=\"" + li_style + "\"><span style=\"" + span_style
			+ "\">总共" + dt.length + "页</span></li>";
	var p_end = "<li style=\"" + li_style
			+ "\"><span class=\"page_end\" >最后一页</span></li>";
	var p_start = "<li style=\"" + li_style
			+ "\"><span class=\"page_start\">第一页</span></li>";

	var pages_num = "";
	if (dt.length <= 5) {
		for (var i = 0; i < dt.length; i++) {
			if (i == 0) {
				pages_num += "<li style=\""
						+ li_style
						+ "\"><a style=\""
						+ a_style
						+ "\"  page=\"1\" class=\"selected\" style=\"background: rgb(32, 163, 153);\">1</a></li>";
			} else {
				pages_num += "<li style=\"" + li_style + "\"><a style=\""
						+ a_style + "\"  page=" + (i + 1) + " class=\"pages\">"
						+ (i + 1) + "</a></li>";
			}
		}
	} else {
		for (var i = 0; i < 5; i++) {
			if (i == 0) {
				pages_num += "<li style=\""
						+ li_style
						+ "\"><a style=\""
						+ a_style
						+ "\"  page=\"1\" class=\"selected\" style=\"background: rgb(32, 163, 153);\">1</a></li>";
			} else {
				pages_num += "<li style=\"" + li_style + "\"><a style=\""
						+ a_style + "\"  page=" + (i + 1) + " class=\"\">"
						+ (i + 1) + "</a></li>";
			}
		}
	}

	var page_html = tmps + p_before + pages_num + p_next + p_all
			+ "</ul>";
	target1.html(page_html);

	var cl = $(".pagination li a[class]");
	var selected;
	for (var i = 0; i < cl.length; i++) {
		if ($(cl[i]).hasClass("selected")) {
			selected = parseInt($(cl[i]).attr("page"));
		}
	}
	target2.html(dt[0]);
	var pages = $(".pagination li a[page]");

	$(pages[0]).attr("style", a_style + "background: rgb(32, 163, 153);");
	$(pages[0]).addClass("selected");

	add_my_event();

	$("ul li .next", target1).click(
			function() {
				var pagination = $(".pagination li a[page]");
				var cl = $(".pagination li a[class]");
				var selected;
				for (var i = 0; i < cl.length; i++) {
					if ($(cl[i]).hasClass("selected")) {
						selected = parseInt($(cl[i]).attr("page"));
					}
				}
				var index = selected - 1;
				var old_num = parseInt($(pagination[0]).attr("page"));
				var last_num = parseInt($(pagination[pagination.length - 1])
						.attr("page"));
				var pgs = 1;
				if (dt.length > 5) {
					pgs = parseInt(dt.length / 5);
				}
				var left = (dt.length) % 5;
				if (last_num > dt.length) {
					alert("没数据了");
					return;
				}
				for (var i = 0; i < pagination.length; i++) {
					var data_pages = (old_num + 5) + i;
					if (data_pages > dt.length) {
						if (left == 0) {
							return;
						}
						for (var i = left; i < 5; i++) {
							$(pagination[i]).attr("page", dt.length + 1);
							$(pagination[i]).text("...");
						}
						return;
					}
					$(pagination[i]).attr("page", data_pages);
					$(pagination[i]).text(data_pages);
				}
				var sd;
				for (var i = 0; i < cl.length; i++) {
					if ($(cl[i]).hasClass("selected")) {
						sd = parseInt($(cl[i]).attr("page"));
					}
				}
				data_on_page = [];
				data_on_page = dt[sd - 1];

				target2.html(data_on_page);
				add_my_event();
			});

	$("ul li .previous", target1).click(
			function() {
				var pagination = $(".pagination li a[page]");
				var cl = $(".pagination li a[class]");
				var data_on_page;
				var selected;
				for (var i = 0; i < cl.length; i++) {
					if ($(cl[i]).hasClass("selected")) {
						selected = parseInt($(cl[i]).attr("page"));
					}
				}
				var index = selected - 1;
				var old_num = parseInt($(pagination[0]).attr("page"));
				var last_num = parseInt($(pagination[pagination.length - 1])
						.attr("page"));
				var pgs = 1;
				if (dt.length > 5) {
					pgs = parseInt(dt.length / 5);
				}
				var left = (dt.length) % 5;
				if (old_num < 0) {
					alert("没数据了");
					return;
				}
				for (var i = 0; i < pagination.length; i++) {
					var data_pages = (old_num - 5) + i;
					if (data_pages < 1) {
						return;
					}
					$(pagination[i]).attr("page", data_pages);
					$(pagination[i]).text(data_pages);
				}
				var sd;
				for (var i = 0; i < cl.length; i++) {
					if ($(cl[i]).hasClass("selected")) {
						sd = parseInt($(cl[i]).attr("page"));
					}
				}
				data_on_page = [];
				data_on_page = dt[sd - 1];

				target2.html(data_on_page);
				add_my_event();
			});

	$(".pagination li a[page]", target1).click(function() {
		var pagenumber = parseInt($(this).attr("page"));
		if (pagenumber > 0) {
			if (pagenumber > dt.length) {
				alert("没有此页面");
				return;
			}
			var pages = $(".pagination li a[page]");
			for (var i = 0; i < pages.length; i++) {
				$(pages[i]).attr("style", a_style);
				$(pages[i]).removeClass("selected");
			}
			$(this).attr("style", a_style + "background: rgb(32, 163, 153);");
			$(this).addClass("selected");
			data_on_page = dt[pagenumber - 1];
		}
		data_on_page = [];
		data_on_page = dt[pagenumber - 1];

		target2.html(data_on_page);
		add_my_event();
	});

	var aaa = 1;

	/*
	 * function add_my_event() { console.log("call:"+(aaa++)); if (fnn
	 * instanceof Function) {
	 * 
	 * fnn.call(this); }
	 * 
	 * //return fnn; }
	 */

}

function data_page(d, pagesize) {
	var pagesize = pagesize;
	if (d.length > pagesize) {
		var page = parseInt(d.length / pagesize);
		var rear = d.length % pagesize;
		var dt = [];
		var pagecount = 1;
		for (var i = 0; i < page; i++) {
			var pagedata = [];
			for (var j = 0; j < pagesize; j++) {
				pagedata[j] = d[((pagecount - 1) * pagesize) + j];
			}
			dt[pagecount - 1] = pagedata;
			pagecount++;
		}
		if (rear > 0) {
			var rdt = [];
			for (var i = rear; i > 0; i--) {
				rdt[rdt.length] = d[d.length - i];
			}
			dt[dt.length] = rdt;
		}
	}
	return dt;
}
