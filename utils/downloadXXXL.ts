
// declare global {
//     interface Window {
//         showSaveFilePicker?: (options?: SaveFilePickerOptions) => Promise<FileSystemHandle>;
//     }
// }

// interface SaveFilePickerOptions {
//     suggestedName?: string;
//     types?: FileType[];
// }

// interface FileType {
//     description: string;
//     accept: Record<string, string[]>;
// }
async function downloadFile() {
    // 创建的文件实例
    const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'test.mp4',
    });
    // 执行fetch去下载
    writeURLToFile(fileHandle, 'http://127.0.0.1:8080/20220119.mp4')
}

// PIPE流实现大文件前端下载并返回真实进度条
export async function writeURLToFile(fileHandle: any, url: string) {
    // 创建要写入的FileSystemWritableFileStream实例
    const writable = await fileHandle.createWritable();
    // 请求资源
    const response = await fetch(url);
    // response.body是一个readableStream实例，使用pipeTo建立管道进行数据传输
    const totalLength = Number(response.headers.get("content-length"))
    let currentLength = 0
    let completeRadio = ''
    const getRadioTransformStream = new TransformStream({
        transform(chunk, controller) {
            currentLength += chunk.length
            completeRadio = `${(currentLength / totalLength * 100).toFixed(0)}%` //  // 进度值
            controller.enqueue(chunk)
        }
    })

    const reader = response.body
    if (reader != null)
        await reader.pipeThrough(getRadioTransformStream)
            .pipeTo(writable);
    // pipeTo()创建的管道会自动关闭
    console.log('完成')
}
