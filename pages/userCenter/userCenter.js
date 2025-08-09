Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // 当前选中的标签索引
    orders: [], // 订单列表数据
    loading: false // 加载状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 页面加载时默认获取全部订单
    this.getOrdersByType(0);
  },

  /**
   * 切换标签
   */
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.currentTab !== index) {
      this.setData({
        currentTab: index
      });
      // 根据标签索引获取对应类型的订单
      this.getOrdersByType(index);
    }
  },

  /**
   * 根据类型获取订单列表
   * @param {number} type - 0:全部 1:待支付 2:已完成
   */
  getOrdersByType(type) {
    this.setData({
      loading: true // 显示加载状态
    });

   //接口地址
    let url = '';
    switch (type) {
      case 0:
        url = '/api/orders/all'; // 全部订单接口
        break;
      case 1:
        url = '/api/orders/unpaid'; // 待支付订单接口
        break;
      case 2:
        url = '/api/orders/completed'; // 已完成订单接口
        break;
    }

    this.mockApiRequest(url).then(res => {
      this.setData({
        orders: res.data,
        loading: false // 隐藏加载状态
      });
    }).catch(err => {
      console.error('获取订单失败:', err);
      this.setData({
        loading: false,
        orders: []
      });
      wx.showToast({
        title: '获取订单失败',
        icon: 'none'
      });
    });
  },

  /**
   * 模拟接口请求
   * @param {string} url - 请求地址
   */
  mockApiRequest(url) {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        // 根据不同接口返回不同模拟数据
        let mockData = [];
        
        if (url.includes('unpaid')) {
          // 待支付订单模拟数据
          mockData = [
            {
              orderNo: '20250801001',
              status: 'unpaid',
              amount: 99.99,
              createTime: '2025-08-01 10:30:00'
            },
            {
              orderNo: '20250801002',
              status: 'unpaid',
              amount: 159.00,
              createTime: '2025-08-01 09:15:00'
            }
          ];
        } else if (url.includes('completed')) {
          // 已完成订单模拟数据
          mockData = [
            {
              orderNo: '20250730005',
              status: 'completed',
              amount: 299.00,
              createTime: '2025-07-30 15:45:00'
            },
            {
              orderNo: '20250729003',
              status: 'completed',
              amount: 49.99,
              createTime: '2025-07-29 11:20:00'
            }
          ];
        } else {
          // 全部订单模拟数据
          mockData = [
            {
              orderNo: '20250801001',
              status: 'unpaid',
              amount: 99.99,
              createTime: '2023-08-01 10:30:00'
            },
            {
              orderNo: '20250730005',
              status: 'completed',
              amount: 299.00,
              createTime: '2025-07-30 15:45:00'
            },
            {
              orderNo: '20250729003',
              status: 'completed',
              amount: 49.99,
              createTime: '2025-07-29 11:20:00'
            }
          ];
        }
        
        resolve({
          code: 0,
          data: mockData,
          message: 'success'
        });
      }, 800); // 模拟0.8秒网络请求时间
    });
  },

  /**
   * 跳转到支付页面
   */
  goToPayment(e) {
    const orderNo = e.currentTarget.dataset.orderNo;
    wx.navigateTo({
      url: `/pages/payment/payment?orderNo=${orderNo}`
    });
  },

  /**
   * 跳转到登录页面
   */
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
});
