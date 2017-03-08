/**
 * Created by libingxing on 17/2/14.
 */


//定义全局过滤器money函数
Vue.filter("money",function(value,type){
	return "￥"+value.toFixed(2)+type;
});

var vm = new Vue({
	el:'#app',
	data:{
		productList:[],
		totalMoney:0,
		checkAllFlag:false,
		delFlag:false,
		curProduct:""
	},
	mounted: function () {
		this.$nextTick(function(){
			this.cartView();
		});
	},
	filters: {
		formatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	methods:{
		cartView: function () {
			//此处this指向vm的实例，箭头函数解决了this的问题
			this.$http.get("data/cartData.json").then(res=>{					
					this.productList = res.data.result.list;
					//this.total Money = res.data.result.totalMoney;	
			});
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;			
				if(product.productQuentity<1)
					product.productQuentity=1;  
			}
			this.calcTotalPrice();
		},
		selectProduct:function(product){
			//首先进行判断商品的checked属性有没有被注册;如果没有被注册,需要重新设置商品的set属性;
			if(typeof product.checked=="undefined"){
				//全局使用函数
				//Vue.set(product,"checked",true);
				//局部使用函数
				this.$set(product,"checked",true);
			}else{
				//全局使用函数
				//Vue.set(product,"checked",false);
				//局部使用函数
				//this.$set(product,"checked",false);
				product.checked=!product.checked;
			}
			this.calcTotalPrice();
		},
		checkAll:function(flag){
			   this.checkAllFlag=flag;	
				this.productList.forEach((product,index)=>{
					//首先判断单件商品有没有被先前选中
					if(typeof product.checked=="undefined"){
						//全局使用函数
						Vue.set(product,"checked", this.checkAllFlag);
					}else{
						product.checked= this.checkAllFlag;
					}
					this.calcTotalPrice();
				})		
		},
		calcTotalPrice:function(){
			this.totalMoney=0;
			this.productList.forEach((product,index)=>{
				if(product.checked){
					this.totalMoney+=product.productPrice*product.productQuentity;		
				}
			})		
		},
		delConfirm:function(product){
			this.delFlag=true;
			this.curProduct=product;
		},
		delProduct(){
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false;
		}
		
	}
});


