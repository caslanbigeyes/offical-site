import req from '@/utils/req';

// 联系我们 
export const concatApi = (contactAddress: string, appealContent: string) => req.post('common/contactUs', { contactAddress, appealContent })


// 加入我们
export const joinApi = (data: any) => req.post('common/joinUs', { ...data })

// 查询菜单
export const queryNabs = (data: any) => req.post('companyCommon/commoditySecondSorts', {
    ...data
})

// app 下载统计
export const addDownloadChannel = (data: any) => req.post('common/addDownloadChannel', {
    ...data
})

// 获取官网图片
export const queryImages = (data: any) => req.get('common/officialWebsitePicList', {
    ...data
})

// 查询分类  
export const queryCateGories = (data: any) => req.post('companyCommon/querySortByCode', {
    ...data
})

// 新增产品信息
export const addProductsInfo = (data: any) => req.post('common/sendProduct', {
    ...data
})

// 搜索产品信息
export const searchProductsInfo = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post(`companyCommon/commodityProductEsPage`, { ...data }, { ...headers })
}

//  获取搜索底纹
export const getSearchInfo = (locale) => {
    const headers = {
        'Language': locale,
    };
    return req.get(`common/querySearchContent`, { ...headers })
}

// 推荐信息
export const recommendProductsInfo = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post('companyCommon/selectByWebsiteList', {
        ...data
    }, { ...headers })
}

// 获取推荐的关键词
export const getRecommendKeyWord = (data: any) => req.post('common/bincialSearchContent', {
    ...data
})



// 查询所有产品

export const getAllProducts = (data: any) => req.post('companyCommon/queryAllClassification', {
    ...data
})



// 产品详情

export const getProductDetail = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post('companyCommon/commodityDetail', {
        ...data
    }, { ...headers })
}

// 详情推荐
export const getDetailRecommend = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post('companyCommon/commodityDetailsPage', {
        ...data
    }, { ...headers })
}



// 网站城市筛选服务
export const getAreaCites = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.get('companyCommon/areaByNumberInfo', {
        ...data
    }, { ...headers })
}



// 获取证书列表

export const getCertificateInfo = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post('companyCommon/commodityProductCertificateInfo', {
        ...data
    }, { ...headers })
}



// 获取城市接口 
export const getCityInfo = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post('/companyCommon/cityDataNumber', {
        ...data
    }, { ...headers })
}

// 获取企业相关信息
export const getCompanyInfo = (data: any, locale) => {
    const headers = {
        'Language': locale,
    };
    return req.post('/userInfo/info', {
        ...data
    }, { ...headers })
}
