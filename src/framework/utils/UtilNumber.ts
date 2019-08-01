export class NumberClass {
    /** 获取货币显示文本 */
    public numberToRMB(money: number, prefixText: string = ""): string {
        const text = "" + this.numberToFixed(money, 2);

        if (text.length <= 6) {
            return prefixText + text;
        }

        let newText = "";
        let startIndex = text.lastIndexOf(".");
        if (startIndex === -1) {
            startIndex = text.length - 1;
        } else {
            // 12.34 =>   startIndex=2 ,length=5
            // 获取小数位: .34
            newText = text.substr(startIndex, text.length - startIndex);
            startIndex = startIndex - 1;
        }

        let count = 1;
        for (let i = startIndex; i >= 0; i--) {
            if (count > 3) {
                newText = "," + newText;
                count = 1;
            }
            newText = text.charAt(i) + newText;
            count++;
        }

        const newMoney = prefixText + newText;
        return newMoney;
    }

        /** 四舍五入 */
    public numberToFixed(num: number, decimalPlaceCount: number): number {
        const num1 = num * Math.pow(10, decimalPlaceCount) + 0.5; // (0.5~0.9)+ 0.5 = 进一位
        const num2 = parseInt(num1.toString(), 0);
        const num3 = num2 / Math.pow(10, decimalPlaceCount);
        return num3;
    }

          /** 转换为数值类型 */
    public toNumber(val: string | number | undefined, isNullReturn0: boolean = true): number {
        if (val == null && isNullReturn0 === true) {
            return 0;
        }
        if (val == null && isNullReturn0 === false) {
            throw new Error("val不能为空");
        }
        const num = Number(val);
        return num;
    }

    /** 加法运算，解决浮点失真问题 */
    public sum(num1: number, num2: number): number {
        let r1: number;
        let r2: number;

        try {
            r1 = num1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        const m: number = Math.pow(10, Math.max(r1, r2));
        return (num1 * m + num2 * m) / m;
    }
}

const UtilNumber = new NumberClass();
export { UtilNumber };
