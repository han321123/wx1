Page({
  data: {
    category: [
      { name: '水果', id: 'guowei' },
      { name: '蔬菜', id: 'shucai' },
      { name: '炒货', id: 'chaohuo' },
      { name: '点心', id: 'dianxin' }
    ],
    detail: [],
    curIndex: 0,
    toView: 'guowei'
    // toView 已经删除 → 不再报 undefined
  },

  //首页跳转
  onShow() {
    // let idx = wx.getStorageSync('autoSelectTab')
    // if (idx !== '' && idx !== null) {
    //   this.setData({
    //     curIndex: idx
    //   })
    //   wx.removeStorageSync('autoSelectTab')
    // }

    // const app = getApp()
    // const tab = app.globalData.selectedTab

    let autoTab = wx.getStorageSync('autoTab')

    if (autoTab === 0) {
      this.setData({
        curIndex: 0,
        toView: 'guowei'
      })
    }

    if (autoTab === 3) {
      this.setData({
        curIndex: 3,
        toView: 'dianxin'
      })
  }
  // 清空标记，防止返回重复触发
  // app.globalData.selectedTab = null
  wx.removeStorageSync('autoTab')
},
  
  onLoad(options) {
    this.loadProductData();
  },

  // 加载商品数据
  loadProductData() {
    this.setData({
      detail: [
        {
          id: 'guowei',
          cate: '果味',
          banner: '/image/02.jpg',
          products: [
            { id: 12, name: '鸭梨', image: '/image/yali.jpg', price: 9.9 },
            { id: 1, name: '草莓', image: '/image/caomei.jpg', price: 11.9 },
            { id: 3, name: '苹果', image: '/image/pingguo.jpg', price: 5.9 },
          ]
        },
        {
          id: 'shucai',
          cate: '蔬菜',
          banner: '/image/03.jpg',
          products: [
            { id: 4, name: '生菜', image: '/image/shengcai.jpg', price: 5.9 },
            { id: 5, name: '土豆', image: '/image/tudou.jpg', price: 7.9 },
            { id: 6, name: '黄瓜', image: '/image/huanggua.jpg', price: 4.9 },
          ]
        },
        {
          id: 'chaohuo',
          cate: '炒货',
          banner: '/image/01.jpg',
          products: [
            { id: 7, name: '瓜子', image: '/image/guazi.jpg', price: 5.9 },
            { id: 8, name: '花生', image: '/image/huasheng.jpg', price: 6.9 },
            { id: 9, name: '核桃', image: '/image/hetao.jpg', price: 9.9 }
          ]
        },
        {
          id: 'dianxin',
          cate: '点心',
          banner: '/image/dianxin.jpg',
          products: [
            { id: 10, name: '蛋挞', image: '/image/danta.jpg', price: 5.9 },
            { id: 11, name: '泡芙', image: '/image/paofu.jpg', price: 4.9 },
            { id: 2, name: '草莓蛋糕', image: '/image/cmdangao.jpg', price: 19.9 },
          ]
        }
      ]
    })
  },

  // ✅ 切换分类（只切换 curIndex → 界面自动刷新）
  switchTab(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      curIndex: parseInt(index)
    })
  },

  // 加入购物车
  addToCart(e) {
    const item = e.currentTarget.dataset.item;
    let cart = wx.getStorageSync('cart') || [];
    let exist = false;

    cart.forEach(v => {
      if (v.id === item.id) {
        v.count++;
        exist = true;
      }
    })
    if (!exist) {
      cart.push({ ...item, count: 1, selected: true });
    }

    wx.setStorageSync('cart', cart);
    wx.showToast({ title: '加入成功' });
  },

  // 跳详情
  goToDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/component/details/details?id=' + id
    })
  }
});