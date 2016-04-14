/**
 * @authors  guoshengze
 * @date    2016-04-14 20:22:47
 */
;(function($){

// 兼容ie7、8
if(!Object.create){
	Object.create = function(o){
		function F(){};
		F.prototype = o;
		return new F();
	};
}

var Boom = {
		width:null,
		height:null,
		imgWidth:null,
		imgHeight:null,
		minWidth:null,
		minHeight:null,
		rowCols:[10,10],//行列
		position:[], //[{x: , y: },...]
		boomPosition:[],
		boomXY:[0,0],//爆炸的中心点
		boomWidth:50,
		boomTime:100,
		beforeFn:function(){
			console.log("准备爆炸~");
		},
		callback:function(){
			console.log("爆炸结束！");
		},
		init:function(o){
			// 入口函数
			if(!o || !o.imgDom || !o.wrapDom){
				return "请输入图片节点";
			}else{
				var $img = o.imgDom;

				this.imgDom = o.imgDom;
				this.wrapDom = o.wrapDom;
				this.imgSrc = o.imgDom.attr('src');

				this.width = $img.css('width').split('px')[0];
				this.height = $img.css('height').split('px')[0];

				if(o.wrapDom.css('position') !== 'relative' && o.wrapDom.css('position') !== 'absolute'){
					o.wrapDom.css('position','relative');
				}

				this.getOriData();
				this.getPosition();
				this.domForPiece();
				this.bindEvent();
			}
		},
		getOriData:function(){
			var that = this;
			$("<img/>").attr("src", that.imgSrc).load(function() {
					that.imgWidth = this.width;
					that.imgHeight = this.height;
			});
		},
		getPosition:function(){
			var x = 0,
				y = 0;

			this.minWidth = Math.round(this.width / this.rowCols[0]);
			this.minHeight = Math.round(this.height / this.rowCols[1]);
			//计算每块的x,y,存进position数组 
			for(var i = 0; i < this.rowCols[0]; i++){
				x = i * this.minWidth;

				for(var j = 0; j < this.rowCols[1]; j++){
					y = j * this.minHeight;
					this.position.push({x:x,y:y});
					this.boomPosition.push({
						x:x + parseInt(this.minWidth/2) - ( this.width / 2 ),
						y:y + parseInt(this.minHeight/2) - ( this.height /2 )
					});//相对于中心点的位置坐标
				}

			}	

			//计算最终每块的left，top坐标
			(function(arr,that){
				var new_arr = [],
					x,
					y,
					param;

				for(var i = 0, len = arr.length; i < len; i++ ){
				 	param = parseFloat(arr[i].y/arr[i].x).toFixed(3);
				 	x = arr[i].x + ( arr[i].x > 0 ? that.boomWidth : - that.boomWidth );
				 	y = param * x;
				 	new_arr.push({
				 		x: ( x + that.width / 2 + parseInt(Math.random()* 200) ).toFixed(2),//纠正偏移坐标 + 随机位置抖动
				 		y: ( y + that.height / 2 + parseInt(Math.random()* 50) ).toFixed(2)
				 	});
				}

				that.boomPosition = new_arr;

			})(this.boomPosition,this);			
		},
		domForPiece:function(){
			//写入html 
			var str = '';

			for(var i = 0; i < this.position.length; i++){
				str += '<div style="width:' + this.minWidth + 'px;height:' + this.minHeight + 'px;position:absolute;top:' + this.position[i].y + 'px;left:' + this.position[i].x + 'px;overflow:hidden;">'
						+ '<img src="' + this.imgSrc + '" style="display:block;width:' + this.width + 'px;position:absolute;left:-' + this.position[i].x + 'px;top:-' + this.position[i].y + 'px;"/>'
					+ '</div>';
			}

			this.imgDom.hide();
			this.wrapDom.append(str);
		},
		bindEvent:function(){
			var that = this;
			// 绑定事件
			this.wrapDom.on('click',function(){
				var flag;

				if($(this).data('run')){
					flag = false;
					$(this).data('run',false);
				}else{
					flag = true;
					$(this).data('run',true);
				}

				that.runBoo(flag);
			});
		},
		runBoo:function(flag,time){
			var that = this,
				dom = that.wrapDom.find('div'),
				position;

			dom.each(function(i,v){
				position = flag ? that.boomPosition[i] : that.position[i] ;
				$(v).animate({left:position.x,top:position.y}, time ? time : this.boomTime);
			});

			return this;
		}

}
 
window.Boom = window.Boom ? window.Boom : Boom;

})(jQuery);
