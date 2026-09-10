Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: []
  },

  onLoad(options) {
    // 接收购物车数据
    if (options.orderList) {
      try {
        let orderList = JSON.parse(options.orderList);
        this.setData({
          orders: orderList
        });
        this.getTotalPrice();
      } catch (e) {
        console.log("解析失败", e);
      }
    }
  },

  onShow() {
    this.getAddress();
  },

  getAddress() {
    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        });
      }
    });
  },

  // 计算总价
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].count * orders[i].price;
    }
    this.setData({
      total: total.toFixed(2)
    });
  },

  // 支付成功 → 删除购物车已结算商品
  toPay() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认支付￥' + this.data.total,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ icon: "success", title: "仅模拟支付成功" });

          setTimeout(() => {
            // 删除已支付商品
            let cart = wx.getStorageSync('cart') || [];
            let orderIds = that.data.orders.map(item => item.id);
            let newCart = cart.filter(item => !orderIds.includes(item.id));

            wx.setStorageSync('cart', newCart);

            // 返回个人中心
            wx.switchTab({
              url: '/page/component/user/user'
            });
          }, 1500);
        }
      }
    });
  }
});