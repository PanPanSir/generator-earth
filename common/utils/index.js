import { xssFilter } from './libs/xssFilter'
import { getCookie, setCookie } from './libs/cookie'
import { strReverse, strTirm, strTrunc } from './libs/string'
import { arrSortQuick, arrSortBubble, arrSortMerge } from './libs/sort'

const matchSearch = (search, reg) => search.match(reg) && search.match(reg)[1] ? search.match(reg)[1] : null;

/**
 * 配合fetch 格式化body
 * @param params
 */
const stringifyParams = (params) => (
    Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&')
);

/**
 * 判断是否是58iosapp
 * @returns {boolean}
 */
const isIosApp = () => {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && getCookie('58ua') === '"58app"'
};


/**
 * 判断是否是58app
 */
const is58App = () => {
    return /WUBA/i.test(navigator.userAgent) || getCookie('58ua') === '"58app"'
};

/**
 * 判断是否是微信
 */
const isWechat = () => {
    return (/micromessenger/i).test(window.navigator.userAgent.toLowerCase());
};

const supportLocalStorage = (function () {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

const supportSessionStorage = (function () {
    const test = 'test';
    try {
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

const locStorage = {
    set: function (key, value) {
        if (supportLocalStorage) {
            localStorage.setItem(key, value);
        } else if (supportSessionStorage) {
            sessionStorage.setItem(key, value);
        }
    },
    get: function (key) {
        if (supportLocalStorage) {
            return localStorage.getItem(key);
        } else if (supportSessionStorage) {
            return sessionStorage.getItem(key);
        }
    },
    removeItem: function (key) {
        if (supportLocalStorage) {
            return localStorage.removeItem(key);
        } else if (supportSessionStorage) {
            return sessionStorage.removeItem(key);
        }
    },
    isSupport: function (key) {
        return supportLocalStorage || supportSessionStorage;
    }
};

const getAbsoultePath = href => {
    let link = document.createElement('a');
    link.href = href;
    return (link.protocol + '//' + link.host + link.pathname + link.search + link.hash);
};


/**
 * 监听浏览器回退事件
 * @param actionToDo
 */
const pageBackFromNextPage =(actionToDo) => {

    // pageshow
    // UA.android && window.addEventListener('focus', actionToDo, false);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            actionToDo(e);
        }
    }, false);

    // visibilityChange
    document.addEventListener('visibilitychange', function (e) {
        if (document.visibilityState == 'visible' || !document.hidden) {
            actionToDo(e);
        }
    }, false);

    // webkitVisibilityChange
    document.addEventListener('webkitVisibilitychange', function (e) {
        if (document.webkitVisibilityState == 'visible' || !document.webkitHidden) {
            actionToDo(e);
        }
    }, false);
};

/**
 * 截流函数
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
const debounce = (func, wait, immediate) => {
    let timeout, result;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

/**
 * 获取URL 参数对象
 * @param query
 * @returns {{}}
 */
const getRequestParams = (query) => {
    let search = query || window.location.search.substring(1);
    return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
            return key === "" ? value : decodeURIComponent(value);
        }) : {};
};


export {

    matchSearch,
    stringifyParams,
    isIosApp,
    isWechat,
    is58App,
    locStorage,
    pageBackFromNextPage,
    xssFilter,
    getAbsoultePath,
    debounce,
    arrSortQuick,
    arrSortBubble,
    arrSortMerge,
    strReverse,
    strTirm,
    strTrunc,
    getCookie,
    setCookie,
    getRequestParams,

}
