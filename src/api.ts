import req from '@/utils/req';

// 联系我们 
export const concatApi = (contactAddress: string, appealContent: string) => req.post('common/contactUs', { contactAddress, appealContent })


// 加入我们
export const joinApi = (data: any) => req.post('common/joinUs', { ...data })  