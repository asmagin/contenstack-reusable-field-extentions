import React from "react";
import {
  Field,
  FieldLabel,
  TextInput,
  ToggleSwitch,
  Select,
} from "@contentstack/venus-components";
import { UseEffectHookWrapper } from "../../component/useEffectHookWrapper";
import { FieldHandlersProps, Config } from "../models";

import "./index.css";

export interface ProductFieldProps extends FieldHandlersProps {
  config: Config;
}

const targetOptions = [
  { label: "Same Window", value: "_self" },
  { label: "New Window", value: "_blank" },
];

export class LinkField extends React.Component<ProductFieldProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      options: targetOptions,
      selected: targetOptions[0],
    };
  }

  async componentDidMount() {
    const { config, getFieldValue } = this.props;

    const data = getFieldValue();
    const options = config.targetOptions || targetOptions;

    console.log("DEBUG - config", config);

    this.setState({
      ...data,
      options: options,
      prefix: config.labelsPrefix ? `${config.labelsPrefix} ` : "",
      selected: options.find((x) => x.value === data.target) || options[0],
    });
  }

  componentDidUpdate() {
    const { setFieldValue } = this.props;
    const { label, href, external, target } = this.state;

    const data = { label, href, external, target };

    console.log("DEBUG", data);
    setFieldValue(data);
  }

  render() {
    const { resize } = this.props;
    const { label, href, external, options, selected, prefix } = this.state;

    const labelInput = React.createRef<HTMLInputElement>();
    const hrefInput = React.createRef<HTMLInputElement>();
    const externalInput = React.createRef<HTMLInputElement>();

    return (
      <div
        style={{
          paddingLeft: "10px",
          paddingTop: "10px",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            marginLeft: "10px",
            borderLeft: "1px solid gray",
            // width: "100%",
          }}
        >
          <Field required={true} testId="cs-field-label">
            <FieldLabel
              htmlFor="label"
              required={true}
              requiredText="*"
              testId="cs-field-label-label"
            >
              {`${prefix}Label`}
            </FieldLabel>
            <TextInput
              name="label"
              showCharacterCount={true}
              minLength={2}
              maxLength={32}
              testId="cs-field-label-input"
              placeholder="Provide text..."
              onChange={(e: any) => {
                this.setState({ label: e.currentTarget.value });
              }}
              inputRef={labelInput}
              width="full"
              value={label}
            />
          </Field>
          <Field
            className={undefined}
            countCharacters={false}
            disabled={false}
            required={false}
            style={undefined}
            testId="cs-field-href"
          >
            <FieldLabel
              htmlFor="href"
              required={true}
              requiredText="*"
              testId="cs-field-href-label"
            >
              {`${prefix}URL`}
            </FieldLabel>
            <TextInput
              disabled={undefined}
              name="href"
              showCharacterCount={true}
              minLength={2}
              maxLength={256}
              testId="cs-field-href-input"
              placeholder="Provide URL..."
              onChange={(e: any) => {
                this.setState({ href: e.currentTarget.value });
              }}
              inputRef={hrefInput}
              width="full"
              value={href}
            />
          </Field>
          <Field
            className={undefined}
            countCharacters={false}
            disabled={false}
            required={false}
            style={undefined}
            testId="cs-field-external"
          >
            <Select
              hideSelectedOptions={true}
              // noOptionsMessage={function noRefCheck() {}}
              onChange={(e: any) => {
                this.setState({ target: e.value, selected: e });
              }}
              options={options}
              selectLabel={`${prefix}Target`}
              width="200px"
              value={selected}
            />
          </Field>
          <Field
            className="cs-toggle-switch-external"
            countCharacters={false}
            disabled={false}
            required={false}
            style={undefined}
            testId="cs-field-external"
          >
            <ToggleSwitch
              checked={external}
              label="Is External?"
              labelPosition="left"
              inputRef={externalInput}
              onChange={(e: any) => {
                this.setState({ external: externalInput.current?.checked });
              }}
              testId="cs-toggle-switch-external"
            />
          </Field>
        </div>
        <UseEffectHookWrapper callback={resize} />
      </div>
    );
  }
}
