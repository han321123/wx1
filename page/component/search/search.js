Page({
  data: {
    keyword: '',
    keywordTimer: null,

    showSuggest: false,
    suggestList: ['瓜子', '草莓蛋糕', '苹果', '核桃'],

    showResult: false,
    resultList: [],
    recommendList: [
      { id: 1, name: '瓜子', price: 5.9, thumb: '/image/guazi.jpg' },
      { id: 2, name: '草莓蛋糕', price: 19.9, thumb: '/image/cmdangao.jpg' },
      { id: 3, name: '黄瓜', price: 4.9, thumb: '/image/huanggua.jpg' },
    ],

    historyList: [],
    hotList: ['瓜子', '草莓蛋糕', '黄瓜'],
    isFocus: true
  },

  onLoad() {
    this.loadHistory();
  },

  // 输入防抖（官方推荐写法）
  onInput(e) {
    const keyword = e.detail.value.trim();
    this.setData({ keyword });

    clearTimeout(this.data.keywordTimer);
    const timer = setTimeout(() => {
      this.setData({ showSuggest: !!keyword });
    }, 300);

    this.setData({ keywordTimer: timer });
  },

  // 点击搜索/回车搜索
  onSearch() {
    const { keyword } = this.data;
    if (!keyword) {
      wx.showToast({ title: '请输入搜索内容', icon: 'none' });
      return;
    }

    this.saveHistory(keyword);
    this.doSearch(keyword);
  },

  // 执行搜索逻辑
  doSearch(keyword) {
    // 模拟商品库（可替换为你自己的商品数据）
    const allGoods = [
      { id: 1, name: '瓜子', price: 5.9, thumb: '/image/guazi.jpg' },
      { id: 2, name: '草莓蛋糕', price: 19.9, thumb: '/image/cmdangao.jpg' },
      { id: 3, name: '黄瓜', price: 4.9, thumb: '/image/huanggua.jpg' },
      { id: 4, name: '苹果', price: 5.9, thumb: '/image/pingguo.jpg' },
    ];

    // 模糊匹配
    const result = allGoods.filter(item => 
      item.name.includes(keyword)
    );

    this.setData({
      showSuggest: false,
      showResult: true,
      resultList: result
    });
  },

  // 选择搜索建议
  selectSuggest(e) {
    const text = e.currentTarget.dataset.text;
    this.setData({ keyword: text });
    this.saveHistory(text);
    this.doSearch(text);
  },

  // 选择历史/热门
  selectHistory(e) {
    const text = e.currentTarget.dataset.text;
    this.setData({ keyword: text });
    this.doSearch(text);
  },

  // 保存搜索历史（本地缓存）
  saveHistory(keyword) {
    let history = this.data.historyList;
    // 去重
    history = history.filter(item => item !== keyword);
    // 置顶
    history.unshift(keyword);
    // 最多保留10条
    if (history.length > 10) history = history.slice(0, 10);

    wx.setStorageSync('searchHistory', history);
    this.setData({ historyList: history });
  },

  // 加载历史
  loadHistory() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({ historyList: history });
  },

  // 取消搜索
  onCancel() {
    clearTimeout(this.data.keywordTimer);
    this.setData({
      keyword: '',
      showSuggest: false,
      showResult: false,
      isFocus: false
    });
    wx.navigateBack();
  },

  // 跳商品详情
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/component/details/details?id=' + id
    });
  },

  onUnload() {
    clearTimeout(this.data.keywordTimer);
  }
});