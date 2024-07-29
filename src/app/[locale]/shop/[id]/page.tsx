import React from 'react'
import ShopDetail from '@/components/ShopDetail'
import { getProductDetail } from '@/app/api/shop'

export default async function page({ params }) {
    try {
        const res = await getProductDetail({ id: params.id, locale: params.locale })
        return (
            <div>
                <ShopDetail params={params} productInfo={res.data} />
            </div>
        )
    } catch (error) {
        console.error('Error fetching product detail:', error);
        return (
            <div>
                <p>Error fetching product details.</p>
            </div>
        );
    }
}
