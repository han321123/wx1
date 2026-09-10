Page({
  data: {
    thumb: '/image/12.png',
    nickname: '微信用户',
    hasAddress: false,
    address: {}
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.getAddress();
  },

  // 加载本地保存的用户信息
  loadUserInfo() {
    // try {
    //   let userInfo = wx.getStorageSync('userInfo');
    //   if (userInfo) {
    //     this.setData({
    //       thumb: userInfo.avatarUrl,
    //       nickname: userInfo.nickName
    //     });
    //   }
    // } catch (e) { }
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      thumb: userInfo.avatarUrl || '/image/41.png',
      nickname: userInfo.nickName || '微信用户'
    });
  },

  //新版本
  onChooseAvatar(e) {
    // 获取微信真实头像
    const avatarUrl = e.detail.avatarUrl;

    // 更新界面 + 缓存
    this.setData({
      thumb: avatarUrl
    })

    // 保存到本地
    let userInfo = wx.getStorageSync('userInfo') || {};
    userInfo.avatarUrl = avatarUrl;
    wx.setStorageSync('userInfo', userInfo);
  },

  // ==============================================
  // ✅ 官方最新获取昵称方法（input输入）
  // ==============================================
  onChangeNickname(e) {
    const nick = e.detail.value;

    this.setData({
      nickname: nick
    })

    let userInfo = wx.getStorageSync('userInfo') || {};
    userInfo.nickName = nick;
    wx.setStorageSync('userInfo', userInfo);
  },

  //老版本
  // getUserInfo() {
  //   wx.getUserProfile({
  //     desc: '用于展示用户信息',
  //     success: (res) => {
  //       console.log('获取成功', res.userInfo);
  //       this.setData({
  //         thumb: res.userInfo.avatarUrl,
  //         nickname: res.userInfo.nickName
  //       });
  //       // 保存到本地，下次自动显示
  //       wx.setStorageSync('userInfo', res.userInfo);
  //     },
  //     fail: () => {
  //       wx.showToast({
  //         title: '取消授权',
  //         icon: 'none'
  //       });
  //     }
  //   });
  // },

  // 获取地址
  getAddress() {
    try {
      let address = wx.getStorageSync('address');
      if (address && address.name) {
        this.setData({
          hasAddress: true,
          address: address
        });
      } else {
        this.setData({ hasAddress: false, address: {} });
      }
    } catch (e) {
      this.setData({ hasAddress: false });
    }
  },

  goCart() {
    wx.switchTab({
      url: "/page/component/cart/cart"
    })
  },
});