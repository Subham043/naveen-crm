import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import { Fieldset, Textarea, Switch } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

function CommentFormSection() {
  const { control } = useFormContext<ServiceTeamOrderFormValuesType>();

  const additionalCommentRequired = useWatch({
    control: control,
    name: "additional_comment_required",
  });

  return (
    <Fieldset legend="Comment Information" variant="filled" mt="md">
      <Controller
        control={control}
        name="comment"
        render={({ field, fieldState }) => (
          <Textarea
            label="Comment"
            value={field.value ? field.value : ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            rows={5}
            withAsterisk
          />
        )}
      />
      <Controller
        name="additional_comment_required"
        control={control}
        render={({ field, fieldState }) => (
          <Switch
            label="Additional Comment Required"
            checked={field.value === 1}
            onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
            error={fieldState.error?.message}
            mt="md"
          />
        )}
      />
      {additionalCommentRequired === 1 && (
        <Controller
          control={control}
          name="additional_comment"
          render={({ field, fieldState }) => (
            <Textarea
              label="Additional Comment"
              value={field.value ? field.value : ""}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rows={5}
              withAsterisk
              mt="md"
            />
          )}
        />
      )}
    </Fieldset>
  );
}

export default memo(CommentFormSection);
