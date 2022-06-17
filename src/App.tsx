import React from "react";
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";

import { LinkField } from "./fieldExtensions/link";

class App extends React.Component<any, any> {
  extension: any;

  constructor(props: any) {
    super(props);

    this.state = { config: null };

    this.getFieldValue = this.getFieldValue.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.resize = this.resize.bind(this);
  }

  async componentDidMount() {
    const self = this;

    // connect to ContentStack
    console.log("DEBUG", ContentstackUIExtension);

    ContentstackUIExtension.init().then(function (ex: any) {
      console.log("DEBUG 2", ex);

      // make extension object globally available
      self.extension = ex;
      self.setState({
        config: { ...self.extension.config, ...self.extension.fieldConfig },
      });
    });
  }

  private getFieldValue(): any {
    return this?.extension?.field?.getData();
  }

  private setFieldValue(data: any) {
    this?.extension?.field?.setData(data);
  }

  private resize() {
    console.log("resize()");
    this?.extension?.window?.updateHeight();
  }

  render() {
    const { config } = this.state;

    if (!config) {
      return null;
    }

    const fieldProps = {
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      resize: this.resize,
    };

    return <LinkField config={config} {...fieldProps} />;
  }
}

export default App;
