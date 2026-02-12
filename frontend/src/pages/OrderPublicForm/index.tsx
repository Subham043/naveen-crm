import { IconArrowLeft } from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Image,
  Input,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./index.module.css";
import { Link } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import logo from "@/assets/images/logo.svg";
import { useOrderPublicForm } from "./useOrderPublicForm";
import CaptchaInput from "@/components/CaptchaInput";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";

export default function OrderPublicForm() {
  const { form, loading, onSubmit, captchaRef } = useOrderPublicForm();

  return (
    <Box>
      <Center>
        <Image src={logo} h={90} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} className={classes.title} ta="center">
        Order Form
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Fill the form to submit an order
      </Text>

      <form onSubmit={onSubmit}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Name"
                  placeholder="Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                  data-autofocus
                />
              )}
            />
            <Controller
              control={form.control}
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
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Controller
              control={form.control}
              name="phone_number"
              render={({ field, fieldState }) => (
                <Input.Wrapper
                  label="Phone Number"
                  error={fieldState.error?.message}
                  withAsterisk
                  mt="sm"
                >
                  <PhoneInput
                    defaultCountry="in"
                    value={field.value}
                    disableFormatting={true}
                    onChange={(phoneNumber, meta) => {
                      const [countryCode, phone] = meta.inputValue.split(" ");
                      field.onChange(phoneNumber);
                      form.setValue("country_code", countryCode);
                      form.setValue("phone", phone);
                    }}
                    inputStyle={{ width: "100%" }}
                  />
                </Input.Wrapper>
              )}
            />
            <Controller
              control={form.control}
              name="part_year"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Part Year"
                  type="number"
                  placeholder="Part Year"
                  value={field.value ? field.value : undefined}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                  mt="sm"
                />
              )}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Controller
              control={form.control}
              name="part_model"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Part Model"
                  placeholder="Part Model"
                  value={field.value ? field.value : ""}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                  mt="sm"
                />
              )}
            />
            <Controller
              control={form.control}
              name="part_name"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Part Name"
                  placeholder="Part Name"
                  value={field.value ? field.value : ""}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                  mt="sm"
                />
              )}
            />
          </SimpleGrid>
          <Controller
            control={form.control}
            name="part_description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Part Description"
                placeholder="Part Description"
                value={field.value ? field.value : ""}
                onChange={field.onChange}
                error={fieldState.error?.message}
                rows={5}
                withAsterisk
                mt="sm"
              />
            )}
          />
          <CaptchaInput
            control={form.control}
            error={form.formState.errors.captcha?.message}
            ref={captchaRef}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor
              c="dimmed"
              size="sm"
              component={Link}
              to={page_routes.login.link}
              className={classes.control}
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className={classes.control}
            >
              Submit
            </Button>
          </Group>
        </Paper>
      </form>
    </Box>
  );
}
