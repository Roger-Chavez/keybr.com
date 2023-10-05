import { lessonProps } from "@keybr/lesson";
import { useSettings } from "@keybr/settings";
import { Field, FieldList, Range, styleSizeWide } from "@keybr/widget";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";

export function LessonLengthProp(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <FieldList>
      <Field>
        {formatMessage({
          id: "settings.lessonLengthLabel",
          description: "Input field label.",
          defaultMessage: "Add words to lessons:",
        })}
      </Field>
      <Field>
        <Range
          className={styleSizeWide}
          min={1}
          max={100}
          step={1}
          value={Math.round(settings.get(lessonProps.length) * 100)}
          title={formatMessage({
            id: "settings.lessonLengthTitle",
            description: "Input field title.",
            defaultMessage: "Add more words to every generated lesson.",
          })}
          onChange={(value) => {
            updateSettings(settings.set(lessonProps.length, value / 100));
          }}
        />
      </Field>
    </FieldList>
  );
}
