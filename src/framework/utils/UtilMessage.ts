import { message, notification } from "antd";

message.config({
    duration: 3
});

export enum MessageType {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error"
}

export interface IMessage {
    type?: MessageType;
    title?: string;
    content: string;
    okText?: string;
}

export interface IConfirmMessage {
    type?: MessageType;
    title: string;
    content: string;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
}

class MessageClass {
    public Type = MessageType;


 
    /** 用户操作反馈信息 （不打扰、自动关闭） */
    public showMessage( msgText: string,msgType: MessageType =MessageType.info) {
   
        if (msgText != null) {
            const callFunc = message[msgType];
            callFunc(msgText);
        }
    }

    /**
     * 通知 (打扰、手动/自动关闭)
     */
    public Notification(title: string ,description:string ,msgType: MessageType =MessageType.info ,autoClose:boolean= true ) {
        let type = MessageType.info;
        if (msgType != null) {
            type =msgType;
        }
        notification[type]({
            message:title,
            description  ,
            duration:(autoClose?4.5:0)
          });
    }
}

const UtilMessage = new MessageClass();
export { UtilMessage };
