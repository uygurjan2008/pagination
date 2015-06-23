var data_on_page = [];
function bootstrap_pagination(data, pagesize, target1, target2) {
	//col_tmp   html array
//	bootstrap_pagination(col_tmp, 20, $(
	//		".page", root), $(".content", root));

	// target = $(".pagination");
	var dt = data_page(data, pagesize);
	var tmps = "<div class='col-md-12' style='/*border:1px solid;border-radius:10px;*/'>"
			+ "<ul class='pagination' style='margin:0px;'>";
	var p_before = "<li><a class='previous btn btn-default'>&laquo;上5页</a></li>";
	var p_next = "<li><a class='next btn btn-default'>下5页&raquo;</a></li>";
	var p_goto = "<li><a class='btn btn-default go'>GO</a><input type='text' class='p_number' style='width:60px;height:30px;' />"
			+ "</li>";
	var p_all = "<li><span>总共" + dt.length + "页</span></li>";
	var p_end = "<li><span class=\"page_end\" >最后一页</span></li>";
	var p_start = "<li><span class=\"page_start\">第一页</span></li>";

	var pages_num = "";
	if (dt.length <= 5) {
		for (var i = 0; i < dt.length; i++) {
			if (i == 0) {
				pages_num += "<li><a page=\"1\" class=\"selected\" style=\"background: rgb(32, 163, 153);\">1</a></li>";
			} else {
				pages_num += "<li><a page=" + (i + 1) + " class=\"pages\">"
						+ (i + 1) + "</a></li>";
			}
		}
	} else {
		for (var i = 0; i < 5; i++) {
			if (i == 0) {
				pages_num += "<li><a page=\"1\" class=\"selected\" style=\"background: rgb(32, 163, 153);\">1</a></li>";
			} else {
				pages_num += "<li><a page=" + (i + 1) + " class=\"\">"
						+ (i + 1) + "</a></li>";
			}
		}
	}

	var page_html = tmps + p_before + pages_num + p_next + p_all
			+ "</ul></div>";
	target1.html(page_html);

	$(".page_start").click(function() {

	});
	$(".page_end").click(function() {

	});

	var cl = $(".pagination li a[class]");
	var selected;
	for (var i = 0; i < cl.length; i++) {
		if ($(cl[i]).hasClass("selected")) {
			selected = parseInt($(cl[i]).attr("page"));
		}
	}
	target2.html(dt[0]);

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
				// console.log("data_on_page" + sd + ":", data_on_page);
				target2.html(data_on_page);
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
				// console.log("data_on_page" + sd + ":", data_on_page);
				target2.html(data_on_page);
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
				$(pages[i]).attr("style", "");
				$(pages[i]).removeClass("selected");
			}
			$(this).attr("style", "background: rgb(32, 163, 153);");
			$(this).addClass("selected");
			data_on_page = dt[pagenumber - 1];
		}
		data_on_page = [];
		data_on_page = dt[pagenumber - 1];
		// console.log("data_on_page" + pagenumber + ":", data_on_page);
		target2.html(data_on_page);
	});

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

function dict1() {
	var root = $("#home");

	var dt = [];

	if (data1.length == 0) {

		$.ajax({
			url : "lib/data/name_A.json",
			type : "get",
			async : false,
			success : function(e) {
				dt = e;
			}
		});
		data1 = dt;
	} else {

		dt = data1;

	}

	var tmp = "<li role='presentation'>" + "<a role='menuitem' >aron</a>"
			+ "</li>";

	$(".search", root)
			.keyup(
					function(e) {

						var value = this.value;
						$(".content", root).html("");

						if (value.length > 0) {
							$(".page", root).html("");
							var count = 0;
							tmp = "";
							for (var i = 0; i < dt.length; i++) {

								var flag = dt[i].name.toString().substr(0,
										value.length + 1);
								var sv = dt[i].name.toString().toLowerCase()
										.search(value);

								if (flag != "" && sv > -1) {

									tmp += "<li role='presentation'>"
											+ "<a role='menuitem' id='"
											+ dt[i].id + "'>" + dt[i].name
											+ "</a>" + "</li>";
									count++;

									if (count > 100) {
										break;
									}

								}

							}
							if (count == 0) {

							} else {
								$(".tmp", root).html("");
								$(".tmp", root).html(tmp);
							}
						}

						$(".tmp li a", root)
								.click(
										function() {

											$(".content", root).html("");
											$(".page", root).html("");

											if (this.id) {

												for (var i = 0; i < dt.length; i++) {
													if (this.id == dt[i].id) {

														var content_tmp = "<div><label>result containning ("
																+ dt[i].name
																+ "):</label></div><div style='border-bottom:1px solid;margin-bottom:5px;'><div><label >"
																+ dt[i].name
																+ "</label>"
																+ "</div><div><label>"
																+ dt[i].value
																+ "</label></div></div>";
														$(".content", root)
																.html(
																		content_tmp);
													}
												}
											}
										});

						var dcount = 0;
						var ucount = 0;
						if (e.keyCode == 38) {
							dcount++;
							// console.log($("li",".tmp")[0]);

							// $("li",".tmp")[0].addClass("okk");

						}
						if (e.keyCode == 40) {

							ucount++;
							// console.log("||",dcount,ucount);
						}
						if (e.keyCode == 13) {
							$(".ok", root).trigger("click");
						}

					});

	$(".tmp li a", root)
			.click(
					function() {
						// console.log(this);
						$(".content", root).html("");
						$(".page", root).html("");

						if (this.id) {
							// console.log(this.id);
							for (var i = 0; i < dt.length; i++) {
								if (this.id == dt[i].id) {

									var content_tmp = "<div><label>result containning ("
											+ dt[i].name
											+ "):</label></div><div style='border-bottom:1px solid;margin-bottom:5px;'><div><label >"
											+ dt[i].name
											+ "</label>"
											+ "</div><div><label>"
											+ dt[i].value
											+ "</label></div></div>";
									$(".content", root).html(content_tmp);
								}
							}
						}
					});

	$(".ok", root)
			.click(
					function() {
						var value = $(".search", root).val();

						if (value.length > 0) {

							// console.log("dict1
							// value:",value,value.search(/[^\x00-\xff]/));

							var zh = value.search(/[^\x00-\xff]/);
							if (zh > -1) {

								// $(".content",root).html("");
								content_tmp = "";
								var count = 0;
								var col_tmp = [];
								for (var i = 0; i < dt.length; i++) {

									var flag = dt[i].value.toString()
											.substring(zh, value.length);
									var sv = dt[i].value.toString()
											.toLowerCase().search(value);

									if (flag != "" && sv > -1) {

										content_tmp += "<div style='border-bottom:1px solid;margin-bottom:5px;'><div><label >"
												+ dt[i].name
												+ "</label>"
												+ "</div><div><label>"
												+ dt[i].value
												+ "</label></div></div>";

										count++;

										col_tmp[col_tmp.length] = "<div style='border-bottom:1px solid;margin-bottom:5px;'><div><label >"
												+ dt[i].name
												+ "</label>"
												+ "</div><div><label>"
												+ dt[i].value
												+ "</label></div></div>";

									}
									// console.log(count);

								}
								// console.log(count,col_tmp);
								if (count > 20) {

									var df = col_tmp[20];

									col_tmp[20] = df;// +tmp_page;
									var dt_tmp = data_page(col_tmp, 20);
									// console.log("count",count,col_tmp[21]);
									// console.log("data-page:",dt_tmp);
									content_tmp = "";

									var tmps = "<div class='col-md-12' style='border:1px solid;border-radius:10px;'><ul class='pagination' style='margin:0px;'>";

									var pg_tmp = [];
									for (var i = 0; i < dt_tmp.length; i++) {
										tmps += "<li><a page='" + i + "'>"
												+ (i + 1) + "</a></li>";
										pg_tmp[pg_tmp.length] = "<li><a page='"
												+ i + "'>" + (i + 1)
												+ "</a></li>";
									}

									var ts = tmps + "</ul></div>";

									// console.log("dict 1 ts:",pg_tmp);

									var a_tmp = "";
									var b_tmp = "";
									var c_tmp = "";
									if (pg_tmp.length < 6 && pg_tmp.length > 0) {
										for (var i = 0; i < 6; i++) {
											a_tmp += pg_tmp[i];
										}

									} else if (pg_tmp.length > 6) {

										for (var i = 0; i < 6; i++) {
											a_tmp += pg_tmp[i];
										}
										if ((pg_tmp.length - 3) > 0) {
											for (var i = pg_tmp.length - 3; i < pg_tmp.length; i++) {

												b_tmp += pg_tmp[i];

											}

											for (var i = 0; i < 3; i++) {
												c_tmp += "<li><a >...</a></li>";
											}

										}

									}

									// console.log("new
									// pg_tmp:",a_tmp,b_tmp,c_tmp);

									tmps = "<div class='col-md-12' style='border:1px solid;border-radius:10px;'><ul class='pagination' style='margin:0px;'>";

									var np_tmp = tmps + a_tmp + c_tmp + b_tmp
											+ "</ul></div>";

									// $(".page",root).html(ts);
									// $(".page",root).html(np_tmp);

									for (var i = 0; i < 21; i++) {
										content_tmp += col_tmp[i];
									}

								}
								var add = "<div><label>result containning ("
										+ value + "):</label></div>"
										+ content_tmp;
								$(".content", root).html(add);

								$(".page a", root)
										.click(
												function() {
													if (this
															.getAttribute("page")) {
														// console.log("dict 1
														// page:",this.getAttribute("page"));

														$(".content", root)
																.html("");
														content_tmp = "";
														var index = this
																.getAttribute("page");
														// console.log(col_tmp[index*20],index*20);
														for (var i = index * 20; i < (20 + index * 20); i++) {
															if (col_tmp[i] != undefined) {
																content_tmp += col_tmp[i];
															}

														}

														$(".content", root)
																.html(
																		content_tmp);
													}

												});

								if (count == 0) {
									content_tmp = "<div style='border-bottom:1px solid;margin-bottom:5px;'><div>"
											+ "<label >no ruslut found</label></div>";

									var add = "<div><label>result containning ("
											+ value
											+ "):</label></div>"
											+ content_tmp;
									$(".content", root).html(add);

								}

								return;

							} else {

								// console.log("else dict1");
								$(".content", root).html("");
								$(".page", root).html("");
								content_tmp = "";
								var count = 0;
								var col_tmp = [];
								for (var i = 0; i < dt.length; i++) {

									var flag = dt[i].name.toString().substr(0,
											value.length + 1);
									var sv = dt[i].name.toString()
											.toLowerCase().search(value);

									if (flag != "" && sv > -1) {

										content_tmp += "<div style='border-bottom:1px solid;margin-bottom:5px;'><div><label >"
												+ dt[i].name
												+ "</label>"
												+ "</div><div><label>"
												+ dt[i].value
												+ "</label></div></div>";

										count++;
										col_tmp[col_tmp.length] = "<div style='border-bottom:1px solid;margin-bottom:5px;'><div><label >"
												+ dt[i].name
												+ "</label>"
												+ "</div><div><label>"
												+ dt[i].value
												+ "</label></div></div>";

									}

								}
								// console.log(count,col_tmp);
								if (count > 20) {

									var df = col_tmp[20];

									col_tmp[20] = df;// +tmp_page;

									// var dt=bootstrap_pagination(data1,250,"")

									var dt_tmp = data_page(col_tmp, 20);

									content_tmp = "";

									console.log("sum:", col_tmp.length);

									bootstrap_pagination(col_tmp, 20, $(
											".page", root), $(".content", root));

									for (var i = 0; i < 21; i++) {
										content_tmp += col_tmp[i];
									}

								}
								var add = "<div><label>result containning ("
										+ value + "):</label></div>"
										+ content_tmp;
								// $(".content", root).html(add);

							}

						} else {

							$(".cl", ".modal").text("close");
							$(".modal-title", ".modal").text("System info");
							$(".font", ".modal").text(
									"search content can not be empty");
							$(".modal").modal("show");
						}

					});

	var tmp = "<li role='presentation'>" + "<a role='menuitem' >aron</a>"
			+ "</li>";

}

var data1 = [];
var data2 = [];
var data3 = [];

$(function() {

	var dict = $("#myTab li a");
	dict1();
	dict.click(function() {
		// console.log(this.getAttribute("class"));
		var dt2 = this.getAttribute("class");

		if (dt2 == "zhongwenchengyu") {

			dict2();
		} else if (dt2 == "hanzi") {

			dict3();

		} else if (dt2 == "unicode2char") {

			dict4();

		} else {
			dict1();
		}

	});
});

/**
 * 
 */
