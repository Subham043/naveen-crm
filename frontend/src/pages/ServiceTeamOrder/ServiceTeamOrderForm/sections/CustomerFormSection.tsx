import type { ServiceTeamOrderFormValuesType } from "@/utils/data/schema/service_team_order";
import { countryData } from "@/utils/helper";
import { Fieldset, Input, SimpleGrid, TextInput } from "@mantine/core";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PhoneInput } from "react-international-phone";

function CustomerFormSection() {
  const { control, setValue } =
    useFormContext<ServiceTeamOrderFormValuesType>();
  return (
    <Fieldset legend="Customer Information" variant="filled">
      <SimpleGrid cols={{ base: 1, md: 3, lg: 3 }}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextInput
              label="Name"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
              data-autofocus
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextInput
              label="Email"
              placeholder="me@company.dev"
              type="email"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          control={control}
          name="phone_number"
          render={({ field, fieldState }) => (
            <Input.Wrapper
              label="Phone Number"
              error={fieldState.error?.message}
              withAsterisk
            >
              <PhoneInput
                defaultCountry="us"
                value={field.value}
                disableFormatting={true}
                hideDropdown={true}
                preferredCountries={["us"]}
                countries={countryData}
                onChange={(phoneNumber, meta) => {
                  const [countryCode, phone] = meta.inputValue.split(" ");
                  field.onChange(phoneNumber);
                  setValue("country_code", countryCode);
                  setValue("phone", phone);
                }}
                inputStyle={{ width: "100%" }}
              />
            </Input.Wrapper>
          )}
        />
      </SimpleGrid>
    </Fieldset>
  );
}

export default memo(CustomerFormSection);
