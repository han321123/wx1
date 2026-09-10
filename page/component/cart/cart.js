// page/component/cart/cart.js
Page({
  data: {
    carts: [],        // 购物车列表
    hasList: false,   // 是否有商品
    totalPrice: 0,    // 总价
    selectAllStatus: true  // 全选
  },

  onShow: function () {
    this.getCartData();
  },

  // 读取缓存购物车
  getCartData() {
    let carts = wx.getStorageSync('cart') || [];
    carts.forEach(item => {
      if (item.selected === undefined) item.selected = true;
    });

    this.setData({
      carts,
      hasList: carts.length > 0
    });
    this.getTotalPrice();
  },

  // 选中单个商品
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts[index].selected = !carts[index].selected;

    this.setData({ carts });
    this.getTotalPrice();
  },

  // 删除商品
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);

    wx.setStorageSync('cart', carts);
    this.setData({
      carts,
      hasList: carts.length > 0
    });
    this.getTotalPrice();
  },

  // 全选/取消全选
  selectAll() {
    let selectAllStatus = !this.data.selectAllStatus;
    let carts = this.data.carts;

    carts.forEach(item => {
      item.selected = selectAllStatus;
    });

    this.setData({
      selectAllStatus,
      carts
    });
    this.getTotalPrice();
  },

  // 数量 +1
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts[index].count += 1;

    wx.setStorageSync('cart', carts);
    this.setData({ carts });
    this.getTotalPrice();
  },

  // 数量 -1
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    if (carts[index].count <= 1) return;

    carts[index].count -= 1;
    wx.setStorageSync('cart', carts);
    this.setData({ carts });
    this.getTotalPrice();
  },

  // 计算总价
  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    carts.forEach(item => {
      if (item.selected) {
        total += item.count * item.price;
      }
    });
    this.setData({
      totalPrice: total.toFixed(2)
    });
  },

  // ================================
  // 模拟支付（本地可用，无报错）
  // ================================
  // 去结算 → 跳转到订单页面
  toPay() {
    let carts = this.data.carts;
    let totalPrice = this.data.totalPrice;

    if (totalPrice <= 0) {
      wx.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }

    // 筛选选中的商品
    let orderList = carts.filter(item => item.selected);

    // 跳到订单页，并把商品数据带过去
    wx.navigateTo({
      url: '/page/component/orders/orders?orderList=' + JSON.stringify(orderList)
    })
  }
});