import React, { Suspense } from 'react';

// 创建一个高阶组件 withSuspense
const withSuspense = (Component) => {
    // 这个函数是新的组件，它使用 Suspense 包裹传入的 Component
    const WrappedComponent = (props) => {
        return (
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
                {/* 这里渲染传入的组件，并传递所有必要的 props */}
                <Component {...props} />
            </Suspense>
        );
    };

    // 返回新的组件
    return WrappedComponent;
};

export default withSuspense;