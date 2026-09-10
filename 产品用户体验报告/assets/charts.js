(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();

  var commonAxis = function (isX) {
    return {
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: muted, fontFamily: 'InstrumentSans' },
      splitLine: isX ? { show: false } : { lineStyle: { color: rule } }
    };
  };

  // ---------- 图 1：核心体验五维度达成率 ----------
  (function () {
    var el = document.getElementById('chart-dimension');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true,
        valueFormatter: function (v) { return v + '%'; }
      },
      grid: { left: 10, right: 46, top: 10, bottom: 6, containLabel: true },
      xAxis: Object.assign(commonAxis(false), {
        type: 'value', max: 100,
        axisLabel: { color: muted, fontFamily: 'GeistMono', formatter: '{value}%' }
      }),
      yAxis: Object.assign(commonAxis(true), {
        type: 'category',
        data: ['快速理解产品用途', '完整走完流程', '拆解步骤"够小"', '愿意照着步骤做', '情绪陪伴有被接住感'],
        axisLabel: { color: ink, fontFamily: 'InstrumentSans' }
      }),
      series: [{
        type: 'bar', barWidth: 20,
        data: [
          { value: 100, itemStyle: { color: accent2 } },
          { value: 100, itemStyle: { color: accent2 } },
          { value: 60, itemStyle: { color: accent } },
          { value: 80, itemStyle: { color: accent } },
          { value: 60, itemStyle: { color: accent } }
        ],
        label: {
          show: true, position: 'right', fontFamily: 'GeistMono',
          color: ink, formatter: '{c}%'
        },
        itemStyle: { borderRadius: [0, 6, 6, 0] }
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  })();

  // ---------- 图 2：推荐意愿评分分布 ----------
  (function () {
    var el = document.getElementById('chart-nps');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true,
        formatter: function (p) { return p[0].name + ' 分：' + p[0].value + ' 人'; }
      },
      grid: { left: 10, right: 20, top: 20, bottom: 6, containLabel: true },
      xAxis: Object.assign(commonAxis(true), {
        type: 'category',
        data: ['7 分', '8 分', '9 分', '10 分'],
        axisLabel: { color: ink, fontFamily: 'GeistMono' }
      }),
      yAxis: Object.assign(commonAxis(false), {
        type: 'value', minInterval: 1,
        axisLabel: { color: muted, fontFamily: 'GeistMono' }
      }),
      series: [{
        type: 'bar', barWidth: 46,
        data: [
          { value: 1, itemStyle: { color: muted } },
          { value: 1, itemStyle: { color: muted } },
          { value: 1, itemStyle: { color: accent2 } },
          { value: 2, itemStyle: { color: accent } }
        ],
        label: { show: true, position: 'top', fontFamily: 'GeistMono', color: ink },
        itemStyle: { borderRadius: [6, 6, 0, 0] }
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  })();

  // ---------- 图 3：吐槽主题频次 ----------
  (function () {
    var el = document.getElementById('chart-pain');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var data = [
      { name: '回应有点空、像套话', v: 2 },
      { name: '没有 App / 换设备数据就没了', v: 2 },
      { name: '拆解结果不好用', v: 1 },
      { name: '功能太少', v: 1 },
      { name: '界面不够好看', v: 1 },
      { name: '其他（字体偏小 / 一起完善）', v: 2 }
    ].slice().reverse();
    chart.setOption({
      animation: false,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true },
      grid: { left: 10, right: 40, top: 10, bottom: 6, containLabel: true },
      xAxis: Object.assign(commonAxis(false), {
        type: 'value', minInterval: 1,
        axisLabel: { color: muted, fontFamily: 'GeistMono' }
      }),
      yAxis: Object.assign(commonAxis(true), {
        type: 'category',
        data: data.map(function (d) { return d.name; }),
        axisLabel: { color: ink, fontFamily: 'InstrumentSans' }
      }),
      series: [{
        type: 'bar', barWidth: 18,
        data: data.map(function (d) { return d.v; }),
        itemStyle: { color: accent, borderRadius: [0, 6, 6, 0] },
        label: { show: true, position: 'right', fontFamily: 'GeistMono', color: ink }
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  })();
})();