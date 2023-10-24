import {
  Card,
  Text,
  Stepper,
  PasswordInput,
  TextInput,
  Group,
  Button,
  Code,
  Flex,
  Loader,
  Textarea,
  Select,
  Input,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "@mantine/form";
import Logo from "@/components/atoms/logo";
import FileUpload from "@/components/molekul/FileUpload";
import { Document } from "iconsax-react";
import Cookies from "js-cookie";
import api from "@/configs/axios-interceptors";
import { MIME_TYPES } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
export default function Index() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [file_payment_confirmation, setFilePaymentConfirmation] = useState({});
  const [paymentOption, setPaymentOption] = useState<any>([]);
  const form = useForm({
    validate: (values) => {
      if (active === 0) {
        return {
          payment_option_id: !values.payment_option_id
            ? "Please Select Your Payment Option"
            : null,
        };
      }

      if (active === 1) {
        return {
          // name:
          //   values.name.trim().length < 2
          //     ? "Name must include at least 2 characters"
          //     : null,
          // email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
        };
      }
      return {};
    },
  });
  const getSelectionProcess = useCallback(async () => {
    try {
      const user = JSON.parse(Cookies.get("user") as string);
      const response = await api.get(
        `/investment_fee_submission/${user.id}/show`
      );
      form.setValues({
        user_id: response.data.data.user_id,
        payment_option_id: response.data.data.payment_option_id,
        file_payment_confirmation: response.data.data.file_payment_confirmation,
        status: response.data.data.status,
      });
      setData(response.data.data);
      setFilePaymentConfirmation(response.data.data.file_payment_confirmation);
      // console.log(data);
      // console.log("process2", response.data.data);
      // console.log("ini form", form.values);
    } catch (error) {}
  }, []);
  const getPaymentOption = useCallback(async () => {
    try {
      const response = await api.get(`/payment-option/dataset`);
      setPaymentOption([]);
      response.data.data.map((item: any) => {
        setPaymentOption((prev: any) => [
          ...prev,
          {
            value: item.id,
            label: `${item.name} - ${item.number} - ${item.account_name}`,
          },
        ]);
      });
      // console.log(response);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getSelectionProcess();
    getPaymentOption();
    setLoading(false);
    // console.log("ini state", file_payment_confirmation);
  }, []);
  const [active, setActive] = useState(0);

  const saveIdentity = async () => {
    try {
      const response = await api.put("/investment_fee_submission/update", {
        ...form.values,
        id: data.id,
      });
      form.setValues({
        user_id: response.data.data.user_id,
        payment_option_id: response.data.data.payment_option_id,
        file_payment_confirmation: response.data.data.file_payment_confirmation,
        status: response.data.data.status,
      });
      // console.log(response.data.data);
    } catch (error) {}
  };
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      } else if (!form.values.file_payment_confirmation) {
        notifications.show({
          title: "Error",
          color: "red",
          message: "Please Upload Your Payment Confirmation",
        });
      } else {
        saveIdentity();
      }
      return current < 1 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFileUpload = (file: any) => {
    // console.log(file);
    form.setValues({ ...form.values, file_payment_confirmation: file });
  };
  return (
    <>
      {loading ? (
        <Flex align="center" justify="center">
          <Loader variant="dots" />
        </Flex>
      ) : (
        <Card sx={{ backgroundColor: "#111213", border: "1px solid #243063" }}>
          <Card.Section sx={{ borderBottom: "1px solid #243063" }}>
            <Text
              color="white"
              align="center"
              sx={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Investment Fee
            </Text>
          </Card.Section>
          <div style={{ textAlign: "center" }}>
            <Logo />
          </div>
          <Text
            color="white"
            align="center"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            weight={700}
          >
            Hi candidate of FLS 2023 Delegates!
          </Text>
          <Text color="white" align="center">
            {" "}
            Welcome to the very second step of the selection process, please do
            read the questions on the forms carefully and answer it honestly.
          </Text>
          <br />
          <br />
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step
              label="First step"
              description="Investment Fee"
              sx={{ color: "white" }}
            >
              <Select
                label="First Room Priority"
                placeholder="Pick one"
                data={paymentOption}
                disabled={form.values.status === "approved"}
                {...form.getInputProps("payment_option_id")}
              />
              <FileUpload
                isDisable={form.values.status === "pending"}
                mt="lg"
                onFileUpload={handleFileUpload}
                file={form.values.file_payment_confirmation}
                mimeTypes={[MIME_TYPES.png, MIME_TYPES.jpeg]}
              />
            </Stepper.Step>
            <Stepper.Completed>
              <Text color="white" align="center">
                Your payment status :{" "}
                <Text span>{form.values.status as string}</Text>
              </Text>
              <Text align="center" color="white">
                Thank you for Complete Your Payment Confirmation. Wait until
                your payment is verified by our team.
              </Text>
            </Stepper.Completed>
          </Stepper>

          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 1 && <Button onClick={nextStep}>Next step</Button>}
          </Group>
        </Card>
      )}
    </>
  );
}
