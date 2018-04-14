# formik-custom-fields 
> Setup fields ahead of time and reuse them throughout your app, completely customizable and takes no time to setup. 

 Setting up your input fields in now easy with `formik-custom-fields`.  If formik wasn't easy enough to setup, it just got easier.  Create `Field`s, pass them around, extend them, and build forms with ease.

## Installation

```sh
npm install formik-custom-fields --save
```
or

```sh
yarn add formik-custom-fields
```

## Usage example

You'll notice formik under `peerDependencies`, this module is based solely on [Formik](https://github.com/jaredpalmer/formik) and will not work otherwise.

Use the provided `createField` function to create a `Field` component.

```javascript
  import { createField } from 'formik-custom-fields';

  const Field = createField();
  ...
    <Field 
      label="Email"
      name="email"
      required={true}
    />
    <Field 
      label="Password"
      type="password"
      name="password"
      required={true}
    />
  ...
```
You can also pass options to your field.  

```javascript
  import { createField } from 'formik-custom-fields';
  import { 
    FormGroup, 
    HelpText, 
    Input, 
    Label, 
    Select,
    TextArea,
    Checkbox,
  } from './forms';

  const options = {
    input: Input,
    select: Select,
    textarea: TextArea,
    checkbox: Checkbox,
    helpText: HelpText,
    label: Label,
    formGroup: FormGroup,
    selectPathSpec: 'value',
  };

  const Field = createField(options);
  ...
    <Field 
      label="Email"
      name="email"
      required={true}
    />
    <Field 
      label="Password"
      type="password"
      name="password"
      required={true}
    />
  ...
```

You can also pass custom types to your options.

```javascript
  import { createField } from 'formik-custom-fields';
  import { Toggle } from './forms';

  const customTypes = {
    toggle: ({
      field,
      form,
      showLabel = true,
      label,
      ...props
    }) => (
      <FormGroup>
        <Toggle
          {...field}
          {...props}
          label={label}
          checked={get(form, `values.${field.name}`, false)}
        />
      </FormGroup>
    )
  };

  const options = {
    customTypes
  };

  const Field = createField(options);
  ...
    <Field 
      label="Test Toggle"
      type="toggle"
      name="test-toggle"
    />
  ...
```

## Development setup


```sh
npm i
```

then

```sh
npm start 
```

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/npm.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/formik-custom-fields
