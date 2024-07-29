

"use client"
const isDev = process.env.NODE_ENV === 'development';

const getThemeBg = (theme = true) => {
  return theme ? {
    backgroundColor: 'rgba(73, 82, 123, 0.3)',
    color: 'rgba(255, 255, 255, 1)'
  } : {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 1)'
  }
}

enum open_type {
  tablet = 0,
  mobile = 1,
  web = 2
}

const detectDeviceType = (userAgent: any) => {
  const mobileRegex = /(?:iphone|ipod|ipad|android|windows phone)/i;
  const tabletRegex = /(?:ipad|tablet|playbook)/i;

  if (mobileRegex.test(userAgent)) {
    // 如果匹配移动设备  
    if (tabletRegex.test(userAgent)) {
      // 如果同时匹配平板设备  
      return open_type.tablet;
    } else {
      // 仅为移动设备  
      return open_type.mobile;
    }
  } else {
    // 不匹配移动设备，则默认为Web或其他  
    return open_type.web;
  }
}

export enum OPEN_TYPE {
  // WECHAT = 0,
  IOS = 1,
  ANDROID = 2,
  WEB = 3,
}


const queryMobileType = () => {
  if (typeof window !== 'undefined' && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    return OPEN_TYPE.IOS;
  } else if (typeof window !== 'undefined' && navigator.userAgent.match(/android/i)) {
    return OPEN_TYPE.ANDROID;
  } else {
    return OPEN_TYPE.WEB;
  }
};


const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}


// 打开app
const handleOpen = (type, isEn) => {
  const appId = isEn ? '6472703992' : '6449456872';
  if (type === OPEN_TYPE.IOS) {
    const url = `https://apps.apple.com/app/id${appId}`
    window.location.href = url; // 打开app store
  } else {
    const url = isEn ? 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/apk/xiaoluo-overseas.apk' : 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/apk/xiaoluo-release.apk'
    window.location.href = url;
  }
}

const validateForm = (formData) => {
  const newErrors = {};
  if (!formData.name) newErrors.name = 'Product name is required';
  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else {
    // 校验邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
  }
  return newErrors;
};


const handleRouterDetail = (id, router, isEn, type) => {
  let time = Date.now();
  const url = type === 'enterPrise' ? `/enterPrise/${id}` : `/shop/${id}`
  if (typeof (window as any).gtag === 'function') {
    window.gtag(url);
  }
  // window.open(url, '_blank');
  router.prefetch(`${url}`)
  router.push(`${url}`)
}


const handleRecommendAndSearch = (i, isEn, router, type) => {
  let val = isEn ? i.nameEn : i.name;
  if (type === "recommend") {
    router.prefetch(`/shop?keyword=${val}`)
    router.push(`/shop?keyword=${val}`)

  } else {
    router.prefetch(`/shop?keyword=${i}`)
    router.push(`/shop?keyword=${i}`)

  }
}




export {
  handleRecommendAndSearch,
  handleRouterDetail,
  validateForm,
  getThemeBg,
  isDev,
  detectDeviceType,
  debounce,
  queryMobileType,
  handleOpen,
}