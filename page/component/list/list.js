Page({
  data: {
    goodsList: []
  },

  onLoad(options) {
    this.loadGoods()
  },

  // 加载商品
  loadGoods() {
    // 模拟商品数据（可对接接口）
    const data = [
      { id: 1, name: '瓜子', thumb: '/image/guazi.jpg', price: 5.9 },
      { id: 2, name: '草莓', thumb: '/image/caomei.jpg', price: 11.9 },
      { id: 3, name: '生菜', thumb: '/image/shengcai.jpg', price: 5.9 },
      { id: 4, name: '蛋挞', thumb: '/image/danta.jpg', price: 5.9 },
      { id: 5, name: '核桃', thumb: '/image/hetao.jpg', price: 9.9 }
    ]

    this.setData({
      goodsList: data
    })
  },

  // 搜索
  onSearch(e) {
    const keyword = e.detail.value
    console.log('搜索关键词：', keyword)
  },

  // 加入购物车
  addToCart(e) {
    const item = e.currentTarget.dataset.item
    let cart = wx.getStorageSync('cart') || []

    let exist = false
    cart.forEach(goods => {
      if (goods.id === item.id) {
        goods.count++
        exist = true
      }
    })

    if (!exist) {
      cart.push({
        ...item,
        count: 1,
        selected: true
      })
    }

    wx.setStorageSync('cart', cart)
    wx.showToast({ title: '加入成功' })
  },

  // 进入详情
  goDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/page/component/details/details?id=' + item.id
    })
  }
})