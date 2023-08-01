import React from 'react';
import { Field, FormSpy } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

export const WhenFieldChangesSetAnotherField = ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <FormSpy subscription={{}}>
        {({ form }) => (
          <OnChange name={field}>
            {value => {
              if (becomes && value === becomes) {
                onChange(to);
              } else {
                onChange(to);
              }
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);

export const WhenFieldChangesDo = ({ field, set, becomes, action }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <FormSpy subscription={{ values: true }}>
        {({ form }) => (
          <OnChange name={field}>
            {value => {
              action({ onChange, field, value, becomes, set });
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);

export const SetMetaDataField = ({ field, meta, mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      setFieldData(field, meta);
    }}
  />
);