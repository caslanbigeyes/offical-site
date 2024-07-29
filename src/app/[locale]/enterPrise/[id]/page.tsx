import React from 'react'
import EnterPriseDetail from '@/components/EnterPriseDetail'
import { getCompanyInfo } from '@/app/api/shop'

export default async function page({ params }) {
  try {
    const res = await getCompanyInfo({ id: params.id, locale: params.locale })
    console.log(res,'1111')
    return (
      <div>
        <EnterPriseDetail params={params} companyInfo={res.data} />
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
