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
interface SelectionProcess1Props {
  onChangeName: any;
}
export default function Index({
  onChangeName,
}: Partial<SelectionProcess1Props>) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [rooms, setRooms] = useState<any>([]);
  const form = useForm({
    // initialValues: {
    //   fullname: "",
    //   institution: "",
    //   born_date: new Date(),
    //   major: "",
    //   phone: "",
    //   file_cv: {
    //     url: "",
    //     filename: "",
    //     path: "",
    //     ext: "",
    //   },
    //   biggest_motivation: data.biggest_motivation || "",
    //   worrying_topics_and_solutions: data.worrying_topics_and_solutions || "",
    //   priority_room1_id: data.priority_room1_id || "",
    //   priority_room2_id: data.priority_room2_id || "",
    // },

    validate: (values) => {
      if (active === 0) {
        return {
          // username:
          //   values.username.trim().length < 6
          //     ? "Username must include at least 6 characters"
          //     : null,
          // password:
          //   values.password.length < 6
          //     ? "Password must include at least 6 characters"
          //     : null,
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
      const response = await api.get(`/user-identity/${user.id}/show`);
      form.setValues({
        user_id: user.id,
        fullname: response.data.data.fullname,
        institution: response.data.data.institution,
        born_date: new Date(response.data.data.born_date),
        major: response.data.data.major,
        phone: response.data.data.phone,
        file_cv: response.data.data.file_cv,
        biggest_motivation: response.data.data.biggest_motivation,
        worrying_topics_and_solutions:
          response.data.data.worrying_topics_and_solutions,
        priority_room_1_id: response.data.data.priority_room_1_id,
        priority_room_2_id: response.data.data.priority_room_2_id,
      });
      // console.log("ini form", form.values);
      setData(response.data.data);
      // console.log("ini response", response.data.data);
    } catch (error) {}
  }, []);
  const getRooms = useCallback(async () => {
    try {
      const response = await api.get(`/rooms/dataset`);
      setRooms([]);
      response.data.data.map((item: any) => {
        setRooms((prev: any) => [
          ...prev,
          { value: item.id, label: item.name },
        ]);
      });
    } catch (error) {}
  }, []);
  useEffect(() => {
    getSelectionProcess();
    getRooms();
    setLoading(false);
  }, []);
  const [active, setActive] = useState(0);

  const saveIdentity = async () => {
    try {
      // console.log("ini form values", form.values);
      const response = await api.put("/user-identity/update", {
        ...form.values,
        id: data.id,
      });
      // console.log("ini response saat save", response.data);
      form.setValues({
        user_id: response.data.data.user_id,
        fullname: response.data.data.fullname,
        institution: response.data.data.institution,
        born_date: new Date(response.data.data.born_date),
        major: response.data.data.major,
        phone: response.data.data.phone,
        file_cv: response.data.data.file_cv,
        biggest_motivation: response.data.data.biggest_motivation,
        worrying_topics_and_solutions:
          response.data.data.worrying_topics_and_solutions,
        priority_room_1_id: response.data.data.priority_room_1_id,
        priority_room_2_id: response.data.data.priority_room_2_id,
      });
      onChangeName(response.data.data.fullname);
    } catch (error) {}
  };
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      } else {
        saveIdentity();
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFileUpload = (file: any) => {
    form.setValues({ ...form.values, file_cv: file });
    // console.log("ini file", file);
    // console.log("ini form values", form.values);
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
              Fill Your Identity
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
            Welcome to the very first step of the selection process, please do
            read the questions on the forms carefully and answer it honestly.
          </Text>
          <br />
          <br />
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step
              label="First step"
              description="Identity"
              sx={{ color: "white" }}
            >
              <TextInput
                label="Fullname"
                placeholder="Fullname"
                {...form.getInputProps("fullname")}
              />
              <TextInput
                mt="md"
                label="Institution (ex : Universitas Diponegoro)"
                placeholder="Institution"
                {...form.getInputProps("institution")}
              />
              <DateInput
                mt="md"
                label="Born Date"
                placeholder="Born Date"
                valueFormat="YYYY-MM-DD"
                {...form.getInputProps("born_date")}
              />
              <TextInput
                mt="md"
                label="Major (ex : Ilmu Komunikasi)"
                placeholder="Major"
                {...form.getInputProps("major")}
              />
              <TextInput
                mt="md"
                label="Phone"
                placeholder="Phone"
                {...form.getInputProps("phone")}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              description="Curiculum Vitae"
              sx={{ color: "white" }}
            >
              <FileUpload
                mt="lg"
                onFileUpload={handleFileUpload}
                mimeTypes={[MIME_TYPES.pdf]}
                file={form.values.file_cv}
              />
            </Stepper.Step>

            <Stepper.Step
              label="Final step"
              description="Motivation Letter"
              sx={{ color: "white" }}
            >
              <Textarea
                mt="md"
                placeholder="Your Answer"
                label="What’s your biggest motivation to be part of FLS 2023? (200 words max)"
                minRows={4}
                maxRows={6}
                {...form.getInputProps("biggest_motivation")}
              />
              <Textarea
                mt="md"
                placeholder="Your Answer"
                label="What is the most alarming national challenge to you? Please elaborate your concern comprehensively along with related realistic solutions! (400 words max)"
                minRows={4}
                maxRows={6}
                {...form.getInputProps("worrying_topics_and_solutions")}
              />
              <Select
                mt="md"
                label="First Room Priority"
                placeholder="Pick one"
                data={rooms}
                {...form.getInputProps("priority_room_1_id")}
              />
              <Select
                mt="md"
                label="Second Room Priority"
                placeholder="Pick one"
                data={rooms}
                {...form.getInputProps("priority_room_2_id")}
              />
            </Stepper.Step>
            <Stepper.Completed>
              <Text align="center" color="white">
                Thank you for filling your identity
              </Text>
            </Stepper.Completed>
          </Stepper>

          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
          </Group>
        </Card>
      )}
    </>
  );
}
