# 让图片爆炸开来吧！ #
 兼容ie7、8 

	var sample = Object.create(Boom);

	sample.init({
		imgDom:$('img'),//必须 img
		wrapDom:$('.wrap'), //必须 img parent
		boomTime:5000,//可选
		boomWidth:50,//可选
		rowCols:[10,10]//可选
	});
	
	//直接爆炸
	sample.runBoo();
	
	//恢复原图
	sample.runBoo(false);
	
	//可指定动画时长
	sample.runBoo(true,2000)	

	// 可链式调用
	sample.runBoo(true,2000).runBoo(false,300)

	//初始化后可改变参数，多次爆炸
	sample.change('rowCols',[20,20]).runBoo(true).runBoo(false,1000)



![爆炸收缩示例](https://github.com/guoshengze/Boom/blob/master/img/first.gif)