// 轮播图
// 作者：陈晓东
var HBSlider = {
  // 配置及数据
  data: {
    config: {
      autoPlay: true,
      delay: 3
    },
    items: [],
    autoPlayFlag: null,
    current: 0
  },
  // 设置参数
  setConfig: function (config) {
    Object.assign(this.data.config, config)
  },
  // 设置轮播图项目数据
  setItems: function (items) {
    this.data.items = items;
  },
  // 初始化函数
  init: function () {
    // 轮播图列表
    var sliderList = $(".slider-item-list");
    // 切换按钮
    var sliderDots = $(".slider-dots-wrap");
    // 项目数量
    var count = this.data.items.length;
    // 轮播图列表宽度计算
    var itemWidth = 100 / count + '%';
    sliderList.css('width', count * 100 + '%');
    // 添加项
    for (var i = 0; i < count; i++) {
      var item = this.data.items[i];
      sliderList.append("<div class=\"slider-item\" style=\"width: " + itemWidth + "\"><a href=\"" + item.url + "\" class=\"img\" style=\"background-image: url(" + item.pic + ")\"><div class=\"slider-item-title\">" + item.title + "</div><\/a><\/div>");
      sliderDots.append("<span class=\"slider-dot\" id=\"slider-dot-" + (i + 1) + "\" onclick=\"HBSlider.go(" + (i + 1) + ")\"></span>");
    }
    // 选中第一个切换按钮
    $("#slider-dot-1").addClass('slider-dot-selected');
  },
  // 跳转i(i:项数, 1, -1)
  turn: function (i) {
    var count = this.data.items.length;
    var _i = this.data.current + i;
    if (_i < 0) {
      _i = _i + count;
    }
    if (_i >= count) {
      _i = _i - count;
    }
    this.data.current = _i;
    $(".slider-item-list").css('left', -100 * this.data.current + '%');
    $("span[id^=slider-dot-]").removeClass('slider-dot-selected');
    $("#slider-dot-" + (_i + 1)).addClass('slider-dot-selected');
    this.pause();
    this.play();
  },
  // 播放
  play: function () {
    var self = this;
    if (this.data.config.autoPlay) {
      this.data.autoPlayFlag = setInterval(function () {
        self.turn(1);
      }, this.data.config.delay * 1000);
    }
  },
  // 暂停
  pause: function () {
    clearInterval(this.data.autoPlayFlag);
  },
  // 跳转到第i个(1,2,3..)
  go: function (i) {
    var option = i - 1 - this.data.current;
    this.turn(option);
  }
};
