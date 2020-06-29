const exp = {};

Object.defineProperty(exp, "__esModule", {
    value: !0
});

var e = exp.formatTime = function(e) {
    return {
        year: e.getFullYear(),
        month: e.getMonth() + 1,
        day: e.getDate(),
        hour: e.getHours(),
        minute: e.getMinutes(),
        second: e.getSeconds(),
        weekday: e.getDay()
    };
}, t = (exp.formatYMDLocal = function(r) {
    var n = e(r);
    return [ n.year, n.month, n.day ].map(t).join("/");
}, exp.formatYMD = function(r) {
    var n = e(r);
    return [ n.year, n.month, n.day ].map(t).join("-");
}, exp.formatHMS = function(r) {
    var n = e(r);
    return [ n.hour, n.minute, n.second ].map(t).join(":");
}, exp.formatWithoutSecond = function(r) {
    var n = e(r);
    return [ n.year, n.month, n.day ].map(t).join("-") + " " + [ n.hour, n.minute ].map(t).join(":");
}, exp.formatFull = function(r) {
    var n = e(r);
    return [ n.year, n.month, n.day ].map(t).join("-") + " " + [ n.hour, n.minute, n.second ].map(t).join(":");
}, exp.formatMD = function(r) {
    var n = e(r);
    return [ n.month ].map(t) + "月" + [ n.day ].map(t) + "日";
}, exp.formatYMDPoint = function(r) {
    var n = e(r);
    return [ n.year, n.month, n.day ].map(t).join(".");
}, exp.formatYMDHMPoint = function(r) {
    var n = e(r);
    return [ n.year, n.month, n.day ].map(t).join(".") + " " + [ n.hour, n.minute ].map(t).join(":");
}, exp.formatMDHM = function(r) {
    var n = e(r);
    return [ n.month ].map(t) + "." + [ n.day ].map(t) + " " + [ n.hour, n.minute ].map(t).join(":");
}, exp.formatWeekday = function(t) {
    var r = e(t), n = "";
    switch (r.weekday) {
      case 0:
        n = "周日";
        break;

      case 1:
        n = "周一";
        break;

      case 2:
        n = "周二";
        break;

      case 3:
        n = "周三";
        break;

      case 4:
        n = "周四";
        break;

      case 5:
        n = "周五";
        break;

      case 6:
        n = "周六";
    }
    return r.weekday = n, r;
}, exp.formatNumber = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
});

exp.getBeginTime = function(r, n) {
    var o = new Date(new Date(1 * n).getTime() + 864e5);
    o.setHours(0), o.setMinutes(0), o.setSeconds(0);
    var a = o.getTime(), u = e(new Date(1 * r));
    return r < a ? "今日" + [ u.hour, u.minute ].map(t).join(":") + "开抢" : a < r && r < a + 864e5 ? "明日" + [ u.hour, u.minute ].map(t).join(":") + "开抢" : "即将开抢";
};

export default exp
