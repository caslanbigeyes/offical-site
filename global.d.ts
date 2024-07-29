declare module '*.less';


declare interface HTTP_RESPONSE {
    success: 1 | 0,
    data: any,
    message: string
}

// global.d.ts
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        gtag_report_conversion: (url: string) => boolean;
    }
}
