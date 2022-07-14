import * as React from 'react';

export const isReadyRef:any = React.createRef();
export const navigationRef: any = React.createRef();


export function RootNavnNvigate(name:any, params:any) {
    console.log('RootNavnNvigate : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    if (isReadyRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
    } else {
        console.log('RootNavnNvigate :  없음 !!!!!!!!');
    };
};