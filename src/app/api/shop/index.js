export const recommendProductsInfo = async (locale) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const body = JSON.stringify({
            page: 1,
            limit: 8,
        });

        const response = await fetch('https://www.bincial.com/api/companyCommon/selectByWebsiteList', {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const searchProductsInfo = async (data, locale) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const body = JSON.stringify({
            page: 1,
            limit: 8,
            ...data // 合并其他数据
        });

        const response = await fetch('https://www.bincial.com/api/companyCommon/commodityProductEsPage', {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const getSearchInfo = async (locale) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://www.bincial.com/api/common/querySearchContent', {
            method: 'GET',
            headers: headers,
            cache: 'force-cache'
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const getRecommendKeyWord = async (locale) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://www.bincial.com/api/common/bincialSearchContent', {
            method: 'POST',
            headers: headers,
            cache: 'force-cache'
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const getCertificateInfo = async (locale) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://www.bincial.com/api/companyCommon/commodityProductCertificateInfo', {
            method: 'POST',
            headers: headers,
            cache: 'force-cache'
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const getCityInfo = async (locale) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://www.bincial.com/api/companyCommon/cityDataNumber', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({}),
            cache: 'force-cache'
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const getProductDetail = async ({ id, locale }) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://www.bincial.com/api/companyCommon/commodityDetail', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export const getCompanyInfo = async ({ id, locale }) => {
    try {
        const headers = {
            'Language': locale,
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://www.bincial.com/api/userInfo/info', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return { error: response.statusText };
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};
