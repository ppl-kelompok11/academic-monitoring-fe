import React, { useState } from "react";
import {
  Stack,
  createStyles,
  Box,
  TextInput,
  Group,
  Button,
  Space,
  ScrollArea,
  Center,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import TitleWithBack from "@/components/atoms/TitleWithBack";
import api from "@/configs/axios-interceptors";
import { useRouter } from "next/router";
import AppLayout from "@/layouts/AppLayout";
import Cookies from "js-cookie";

const UseStyles = createStyles((theme) => ({
  wrapper: {
    background: "#FFFFFF",
  },
  form: {
    background: "#FFFFFF",
    borderRadius: "10px",
  },
  title: {
    [theme.fn.smallerThan("lg")]: {
      fontSize: "60px",
    },
  },
  bioMahasiswaFormLayout: {
    [theme.fn.smallerThan("md")]: {
      width: "300px",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Index() {
  const { classes } = UseStyles();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [departemen, setDepartemen] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });

  const getDepartemen = async (id: any) => {
    try {
      setIsFetching(true);
      const response = await api.get(`/department/${id}`);
      if (response.status === 200) {
        console.log("ini response", response.data);
        setDepartemen(response.data);
        form.setValues(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDepartemen(user.ref_id);
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await api.put("/department", {
        id: user.ref_id,
        name: form.values.name,
        email: form.values.email,
      });

      if (response.status === 201) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    console.log(form.values);
  };

  return (
    <AppLayout activeLink="profile">
      <Stack my={35} mx={45}>
        <TitleWithBack title="Update Profile" route="/profile" />
        <Box className={classes.form} py={20} pl={30} pr={15}>
          {isFetching ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <ScrollArea
              h="calc(100vh - 225px)"
              pr={15}
              offsetScrollbars
              styles={(theme) => ({
                scrollbar: {
                  "&, &:hover": {
                    background:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },

                  '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                    backgroundColor: theme.colors.primary[5],
                  },
                },

                corner: {
                  opacity: 1,
                  background:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              })}
            >
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                  disabled
                  size="md"
                  label="Nama Lengkap"
                  {...form.getInputProps("name")}
                />

                <Space h={15} />

                <TextInput
                  required
                  withAsterisk={false}
                  size="md"
                  label="Email"
                  disabled={isLoading}
                  {...form.getInputProps("email")}
                />

                <Group mt="md">
                  <Button
                    loading={isLoading}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Simpan
                  </Button>
                </Group>
              </form>
            </ScrollArea>
          )}
        </Box>
      </Stack>
    </AppLayout>
  );
}
