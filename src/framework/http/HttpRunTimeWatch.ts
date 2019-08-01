/** 后端耗时监控器 */
export default class HttpRunTimeWatch {
    public static create = (url: string) => {
        return new HttpRunTimeWatch(url);
    };

    private url: string;
    private timeBegin: Date;
    private timeEnd: Date;

    private constructor(url: string) {
        this.url = url;
        this.timeBegin = new Date();
    }

    public finishWatch = () => {
        this.timeEnd = new Date();
    };

    public GetRunTimeFormatText = () => {
        const runMillisecond = this.timeEnd.getMilliseconds() - this.timeBegin.getMilliseconds();
        const secend = runMillisecond / 1000;
        return "请求( " + this.url + " ), 耗时:" + secend + "秒";
    };
}
