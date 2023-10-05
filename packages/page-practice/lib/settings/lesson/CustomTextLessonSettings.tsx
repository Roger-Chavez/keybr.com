import { useIntlNumbers } from "@keybr/intl";
import { type CustomTextLesson, lessonProps } from "@keybr/lesson";
import { textStatsOf } from "@keybr/plaintext";
import { useSettings } from "@keybr/settings";
import {
  CheckBox,
  Field,
  FieldList,
  FieldSet,
  NameValue,
  Para,
  styleSizeFull,
  TextField,
} from "@keybr/widget";
import { type ReactNode, useMemo } from "react";
import { useIntl } from "react-intl";
import { EXAMPLE_TEXT } from "./example.ts";
import { LessonLengthProp } from "./LessonLengthProp.tsx";
import { TargetSpeedProp } from "./TargetSpeedProp.tsx";

export function CustomTextLessonSettings({
  lesson,
}: {
  readonly lesson: CustomTextLesson;
}): ReactNode {
  const { formatMessage } = useIntl();
  return (
    <>
      <Para>
        {formatMessage({
          id: "lessonType.customText.description",
          description: "Description text.",
          defaultMessage:
            "Generate typing lessons from the words of your own custom text. All keys are included by default. This mode is for the pros.",
        })}
      </Para>

      <FieldSet
        legend={formatMessage({
          id: "settings.lessonOptionsLegend",
          description: "Fieldset legend.",
          defaultMessage: "Lesson Options",
        })}
      >
        <CustomTextInput />

        <CustomTextStats />

        <CustomTextProcessing />

        <TargetSpeedProp />

        <LessonLengthProp />
      </FieldSet>
    </>
  );
}

function CustomTextInput(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <Para>
        {formatMessage({
          id: "settings.customTextExamplesLabel",
          description: "Text label.",
          defaultMessage: "Examples:",
        })}{" "}
        {EXAMPLE_TEXT.map(({ title, content }, index) => (
          <span key={index}>
            {index > 0 ? ", " : null}
            <a
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                updateSettings(
                  settings.set(lessonProps.customText.content, content),
                );
              }}
            >
              {title}
            </a>
          </span>
        ))}
      </Para>

      <Para>
        <TextField
          className={styleSizeFull}
          value={settings.get(lessonProps.customText.content)}
          type="textarea"
          placeholder={formatMessage({
            id: "settings.customTextInputPlaceholder",
            description: "Input field placeholder.",
            defaultMessage: "Custom text...",
          })}
          onChange={(value) => {
            updateSettings(settings.set(lessonProps.customText.content, value));
          }}
        />
      </Para>
    </>
  );
}

function CustomTextStats(): ReactNode {
  const { formatMessage } = useIntl();
  const { formatNumber } = useIntlNumbers();
  const { settings } = useSettings();
  const { numWords, numUniqueWords, avgWordLength } = useMemo(
    () => textStatsOf(settings.get(lessonProps.customText.content)),
    [settings],
  );
  return (
    <FieldList>
      <Field>
        <NameValue
          name={formatMessage({
            id: "textStats.allWordCount",
            description: "Text label.",
            defaultMessage: "All words",
          })}
          value={formatNumber(numWords)}
        />
      </Field>
      <Field>
        <NameValue
          name={formatMessage({
            id: "textStats.uniqueWordCount",
            description: "Text label.",
            defaultMessage: "Unique words",
          })}
          value={formatNumber(numUniqueWords)}
        />
      </Field>
      <Field>
        <NameValue
          name={formatMessage({
            id: "textStats.averageWordLength",
            description: "Text label.",
            defaultMessage: "Average word length",
          })}
          value={formatNumber(avgWordLength, 2)}
        />
      </Field>
    </FieldList>
  );
}

function CustomTextProcessing(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <FieldList>
      <Field>
        <CheckBox
          checked={settings.get(lessonProps.customText.lettersOnly)}
          label={formatMessage({
            id: "settings.customTextLettersOnlyLabel",
            description: "Checkbox label.",
            defaultMessage: "Remove punctuation",
          })}
          title={formatMessage({
            id: "settings.customTextLettersOnlyTitle",
            description: "Checkbox title.",
            defaultMessage:
              "Remove punctuation from the text to make it simpler to type.",
          })}
          onChange={(value) => {
            updateSettings(
              settings.set(lessonProps.customText.lettersOnly, value),
            );
          }}
        />
      </Field>
      <Field>
        <CheckBox
          checked={settings.get(lessonProps.customText.lowercase)}
          label={formatMessage({
            id: "settings.customTextLowercaseLabel",
            description: "Checkbox label.",
            defaultMessage: "Transform to lowercase",
          })}
          title={formatMessage({
            id: "settings.customTextLowercaseTitle",
            description: "Checkbox title.",
            defaultMessage:
              "Transform all text to lower case to make it simpler to type.",
          })}
          onChange={(value) => {
            updateSettings(
              settings.set(lessonProps.customText.lowercase, value),
            );
          }}
        />
      </Field>
      <Field>
        <CheckBox
          checked={settings.get(lessonProps.customText.randomize)}
          label={formatMessage({
            id: "settings.customTextRandomizeLabel",
            description: "Checkbox label.",
            defaultMessage: "Shuffle words",
          })}
          title={formatMessage({
            id: "settings.customTextRandomizeTitle",
            description: "Checkbox title.",
            defaultMessage: "Put words from the custom text in a random order.",
          })}
          onChange={(value) => {
            updateSettings(
              settings.set(lessonProps.customText.randomize, value),
            );
          }}
        />
      </Field>
    </FieldList>
  );
}
