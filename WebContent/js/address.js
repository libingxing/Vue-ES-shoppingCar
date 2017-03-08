/**
 * Created by libingxing on 17/2/14.
 */
var vm=new Vue({
	el:".container",
	data:{
		addressList:[],
		isDefault:true,
		limitNum:3,
		currentIndex:0,
		shippingMethod:1
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	filters:{
		
	},
	methods:{
	getAddressList:function(){
		this.$http.get("data/address.json").then(res=>{
		        if(res.data.status=="0"){
		        	this.addressList=res.data.result;		
		        }			
		})
	},
	loadMore(){
		if(this.limitNum==3){
			this.limitNum=this.addressList.length;	
		}else{
			this.limitNum=3;
		}
		
	},
	delAddress:function(index){
		this.addressList.splice(index,1);
	},
	setDefault:function(addressId){
		this.addressList.forEach(function(item,index){
			if(item.addressId==addressId){
				item.isDefault=true;
			}else{
				item.isDefault=false;
			}
		})
	}
	}
});