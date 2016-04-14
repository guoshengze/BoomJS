# 兼容IE7+的图片爆炸效果 #

	var sample = Object.create(Boom);

	sample.init({
		imgDom:$('img'),//img 
		wrapDom:$('.wrap') //img parent
	});

	// 可链式调用，爆炸和回复
	sample.runBoo(true,2000).runBoo(false,300)


![爆炸收缩示例](https://github.com/guoshengze/Boom/blob/master/img/first.gif)