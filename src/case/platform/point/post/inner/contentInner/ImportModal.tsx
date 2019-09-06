import React, { useState } from "react";
import { Modal, Steps, Button, Upload, Icon, message, Table  } from "antd";
const { Step } = Steps;
const { Dragger } = Upload;

enum StepType { UPLOAD, CHECK }

interface IImportModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const UploadContent = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
        <p>
          <span style={{fontWeight:"bold",marginRight: 8}}>温馨提示：</span>
          <span style={{marginRight: 16}}>推荐下载标准模版，填写信息后再上传</span>
          <Button type="primary">下载模版</Button>
        </p>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="cloud-upload" />
          </p>
          <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
          <p className="ant-upload-hint">仅支持扩展名：.xls .xlsx</p>
          <br/>
        </Dragger>
        <p style={{ marginTop: "1em"}}>
          <span style={{fontWeight:"bold",marginRight: 8}}>导入说明：</span>
          <span>xxxx</span>
        </p>
    </div>
  )
}

const CheckTableContent = () =>{
  const columns = [
    {
      title: '序号',
      dataIndex: 'sortNo',
      key: 'sortNo',
      render: (text: any, record: any, index: number) => index+1,
    },
    {
      title: '机构编码',
      dataIndex: 'departNo',
      key: 'departNo',
    },
    {
      title: '机构名称',
      dataIndex: 'departName',
      key: 'departName',
    },
    {
      title: '机构类型',
      key: 'departType',
      dataIndex: 'departType',
    },
    {
      title: '上级机构编码',
      key: 'parentNo',
      dataIndex: 'parentNo',
    },
    {
      title: '上级机构',
      key: 'parentName',
      dataIndex: 'parentName',
    },
  ];
  const data = [
    {
      key:1,
      departNo: '101',
      departName: '深圳总部',
      departType: '单位',
      parentNo: '1010',
      parentName: '深圳勤杰软件有限公司',
    },
    {
      key:2,
      departNo: '102',
      departName: '深圳总部2',
      departType: '单位',
      parentNo: '1010',
      parentName: '深圳勤杰软件有限公司',
    },
    {
      key:3,
      departNo: '103',
      departName: '深圳总部3',
      departType: '单位',
      parentNo: '1010',
      parentName: '深圳勤杰软件有限公司',
    },
    {
      key:4,
      departNo: '104',
      departName: '深圳总部4',
      departType: '单位',
      parentNo: '1010',
      parentName: '深圳勤杰软件有限公司',
    },
   
  ];
  return (
    <div>
      <p>
        <span style={{fontWeight:"bold",marginRight: 8}}>导入文件名：</span>
        <span style={{marginRight: 16}}>集团董事会机构表.xls</span>
      </p>
      <Table columns={columns} dataSource={data}  pagination={false} scroll={{ y: 140 }}/>

    </div>
  )
}

const ImportModal = (props: IImportModalProps) => {

  const [step, setStep] = useState(0);

  const okTextArr = ["校验","导入"];

  const { title = "导入机构", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { 
    title, 
    visible, 
    confirmLoading, 
    onOk(){
      if(step === StepType.UPLOAD){
        setStep(StepType.CHECK);
        return;
      }
      if(step === StepType.CHECK){
        onOk();
      }
    } , 
    onCancel(e: any){
      console.log(e.target,e.keyCode, e)
      if(e.keyCode === 27){
        setStep(StepType.UPLOAD);
        onCancel();
        return;
      }
      if(step === StepType.UPLOAD){
        onCancel();
        return;
      }

      if(step === StepType.CHECK){
        setStep(StepType.UPLOAD);
      }
    },
    okText: okTextArr[step]
  };

  return (
    <Modal {...modalProps} width={730}>
      <Steps size="small" current={step}>
        <Step title="上传文件" />
        <Step title="导入校验" />
        <Step title="导入完成" />
      </Steps>,
      {step === StepType.UPLOAD ? UploadContent() : 
        step === StepType.CHECK ? CheckTableContent() : null }
    </Modal>
  )
}

export default ImportModal;