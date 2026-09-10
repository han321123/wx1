Page({
  data: {
    goods: {},
    count: 1,
    totalNum: 0,
    curIndex: 0
  },

  onLoad(options) {
    console.log("接收ID=>", options.id);
    this.getGoodsData(options.id);
    this.getCartCount();
  },

  // 两个商品数据
  getGoodsData(id) {
    let goodsList = {
      1: {
        id: 1,
        image: '/image/caomei.jpg',
        title: '草莓',
        price: 11.9,
        stock: '有货',
        detail: '鲜摘草莓清甜，草莓蛋糕绵密回甘。',
        parameter: '11.9/斤',
        service: '新鲜水果不支持退货'
      },
      2: {
        id: 2,
        image: '/image/cmdangao.jpg',
        title: '草莓蛋糕',
        price: 19.9,
        stock: '有货',
        detail: '清甜草莓入糕，一口治愈味蕾。',
        parameter: '19.9/个',
        service: '可支持提前预定'
      },
      3: {
        id: 3,
        image: '/image/pingguo.jpg',
        title: '苹果',
        price: 5.9,
        stock: '有货',
        detail: '脆甜多汁苹果，果香浓郁爽口。',
        parameter: '5.9/斤',
        service: '新鲜水果不支持退货'
      },
      4: {
        id: 4,
        image: '/image/shengcai.jpg',
        title: '生菜',
        price: 5.9,
        stock: '有货',
        detail: '新鲜脆嫩生菜，健康低脂即食。',
        parameter: '5.9/斤',
        service: '新鲜蔬菜不支持退货'
      },
      5: {
        id: 5,
        image: '/image/tudou.jpg',
        title: '土豆',
        price: 7.9,
        stock: '有货',
        detail: '粉糯香甜土豆，家常百搭蔬菜。',
        parameter: '7.9/斤',
        service: '新鲜蔬菜不支持退货'
      },
      6: {
        id: 6,
        image: '/image/huanggua.jpg',
        title: '黄瓜',
        price: 4.9,
        stock: '有货',
        detail: '清爽脆嫩黄瓜，补水减脂佳品。',
        parameter: '4.9/斤',
        service: '新鲜蔬菜不支持退货'
      },
      7: {
        id: 7,
        image: '/image/guazi.jpg',
        title: '瓜子',
        price: 5.9,
        stock: '有货',
        detail: '香脆饱满瓜子，休闲解馋零食。',
        parameter: '5.9/斤',
        service: '新鲜炒货不支持退货'
      },
      8: {
        id:8,
        image: '/image/huasheng.jpg',
        title: '花生',
        price: 6.9,
        stock: '有货',
        detail: '香酥可口花生，下酒追剧必备。',
        parameter: '6.9/斤',
        service: '新鲜炒货不支持退货'
      },
      9: {
        id: 9,
        image: '/image/hetao.jpg',
        title: '核桃',
        price: 9.9,
        stock: '有货',
        detail: '营养醇香核桃，补脑健康零食。',
        parameter: '9.9/斤',
        service: '新鲜炒货不支持退货'
      },
      10: {
        id: 10,
        image: '/image/danta.jpg',
        title: '蛋挞',
        price: 5.9,
        stock: '有货',
        detail: '酥软嫩滑蛋挞，奶香浓郁诱人。',
        parameter: '5.9/个',
        service: '可支持提前预定'
      },
      11: {
        id: 11,
        image: '/image/paofu.jpg',
        title: '泡芙',
        price: 4.9,
        stock: '有货',
        detail: '绵密奶油泡芙，香甜松软可口。',
        parameter: '4.9/包',
        service: '可支持提前预定'
      },
      12: {
        id: 12,
        image: '/image/yali.jpg',
        title: '鸭梨',
        price: 9.9,
        stock: '有货',
        detail: '清甜润喉鸭梨，皮薄肉嫩多汁。',
        parameter: '9.9/斤',
        service: '新鲜水果不支持退货'
      }
    };
    let goods = goodsList[id] || {};
    this.setData({ goods });
  },

  // 数量+
  addCount() {
    this.setData({
      count: this.data.count + 1
    })
  },

  // 数量-（最低1）
  minusCount() {
    if (this.data.count <= 1) return
    this.setData({
      count: this.data.count - 1
    })
  },

  // 加入购物车（真实同步缓存）
addToCart() {
  const { goods, count } = this.data;
  if (!goods.id) {
    wx.showToast({ title: "商品异常", icon: "none" });
    return;
  }

  let cart = wx.getStorageSync('cart') || [];
  let exist = false; // ✅ 这里必须先声明

  cart.forEach(item => {
    if (item.id === goods.id) {
      item.count += count;
      exist = true;
    }
  })

  if (!exist) {
    cart.push({
      id: goods.id,
      image: goods.image,
      title: goods.title,
      price: goods.price,
      unit: goods.unit,
      count: count,
      selected: true
    })
  }

  wx.setStorageSync('cart', cart);
  this.getCartCount();
  wx.showToast({ title: '加入成功' })
},

  // 获取购物车总数量
  getCartCount() {
    let cart = wx.getStorageSync('cart') || []
    let total = 0
    cart.forEach(i => total += i.count)
    this.setData({ totalNum: total })
  },

  // 切换tab
  bindTap(e) {
    this.setData({
      curIndex: parseInt(e.currentTarget.dataset.index)
    })
  }
})