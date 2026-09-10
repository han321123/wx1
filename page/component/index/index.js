Page({
  data: {
    imgUrls: [
      '/image/00.jpg',
      '/image/01.jpg',
      '/image/02.jpg'
    ]
  },

  // 跳果味分类
  goFruit() {
    // wx.switchTab({
    //   url: '/page/component/category/category',
    //   success: () => {
    //     // 跳过去后，自动选中第一个分类
    //     // wx.setStorageSync('autoTab', 0)
    //     const app = getApp()
    //     app.globalData.selectedTab = 0
    //   }
    // })

    // 先存起来，再跳转
    wx.setStorageSync('autoTab', 0)
    wx.switchTab({
      url: '/page/component/category/category'
    })
  },

  // 跳点心分类
  goSnack() {
    // wx.switchTab({
    //   url: '/page/component/category/category',
    //   success: () => {
    //     // 跳过去后，自动选中第四个分类
    //     // wx.setStorageSync('autoTab', 3)
    //     const app = getApp()
    //     app.globalData.selectedTab = 3
    //   }
    // })

    // 先存起来，再跳转
    wx.setStorageSync('autoTab', 3)
    wx.switchTab({
      url: '/page/component/category/category'
    })
  },

  // 跳商品1
  goDetail1() {
    wx.navigateTo({
      url: "/page/component/details/details?id=1"
    })
  },

  // 跳商品2
  goDetail2() {
    wx.navigateTo({
      url: "/page/component/details/details?id=2"
    })
  },

  // 跳转到搜索页面
  goSearch() {
    wx.navigateTo({
      url: '/page/component/search/search'
    })
  }
})