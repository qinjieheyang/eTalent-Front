import * as React from "react";
import { Editor } from '@tinymce/tinymce-react';





export default class Page extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }



  public render() {
    return <Editor
      apiKey="0cp5cdywq4wik2cyx1ewp0q7dhwg5762uhpv6t7pcblkkkij"
      toolbar='undo redo | formatselect | bold italic | image table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent '
      init={{
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        menubar: false,
        height: "100%"
      }}
    />;
  }
}
