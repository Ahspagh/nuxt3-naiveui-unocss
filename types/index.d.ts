import {
    MessageApi,
    NotificationApi,
    DialogApi,
    LoadingBarApi
} from 'naive-ui'


// 先声明已有类型
interface Window {
    $message: MessageApi,
    $notification: NotificationApi,
    $dialog: DialogApi,
    $loadingBar: LoadingBarApi
}

// 扩展 window 类型
declare global {
    interface Window {
        $message: MessageApi,
        $notification: NotificationApi,
        $dialog: DialogApi,
        $loadingBar: LoadingBarApi
    }
}

declare module '#app' {
    interface NuxtApp {
        $format(date?: Date, msg?: string): string,

    }
}


declare module 'vue' {
    interface ComponentCustomProperties {
        $format(date?: Date, msg?: string): string,

    }
}

export { }