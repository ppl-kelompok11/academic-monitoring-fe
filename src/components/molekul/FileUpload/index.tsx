import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Flex,
  Button,
  Stack,
  createStyles,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { Document } from "iconsax-react";
import axios from "axios";
import api from "@/configs/axios-interceptors";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { on } from "events";

interface FileUploadProps extends DropzoneProps {
  mimeTypes?: string[];
  onFileUpload: any;
  file?: any;
  isDisable?: boolean;
}
const useStyles = createStyles((theme) => ({
  disabled: {
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.gray[5],
    cursor: "not-allowed",
  },
}));
export default function Index(props: Partial<FileUploadProps>) {
  const [load, setLoad] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  // console.log("ini file", props.file);
  return (
    <>
      <Dropzone
        disabled={props.isDisable}
        className={props.isDisable ? classes.disabled : ""}
        loading={load}
        onDrop={async (files) => {
          try {
            setLoad(true);
            // console.log(files[0]);
            const formData = new FormData();
            formData.append("file", files[0]);

            const response = await api.post("/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            if (response.status === 200) setLoad(false);
            props.onFileUpload(response.data);
            notifications.show({
              title: "Success",
              color: "green",
              message: "File uploaded",
            });
          } catch (error) {
            setLoad(false);
            notifications.show({
              title: "Error",
              color: "red",
              message: "Failed Upload",
            });
          }
        }}
        onReject={(files) => {}}
        maxSize={3 * 1024 ** 3}
        sx={{ ":hover": { backgroundColor: "#EEF0F6" } }}
        // sx={{ backgroundColor: "black" }}
        color="black"
        bg="white"
        accept={props.mimeTypes}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          sx={{
            minHeight: "150px",
            // backgroundColor: "black",
            // border: "none",
            // color: "black",
          }}
          color="black"
        >
          <Dropzone.Accept>
            <IconUpload size="3.2rem" color="black" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="3.2rem" color="black" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconUpload size="3.2rem" color="black" />
          </Dropzone.Idle>

          <div>
            <Text color="black" size="xl" inline>
              Letakkan atau Pilih File
            </Text>
            <Text size="sm" color="black" inline mt={7}>
              Masukkan File Kurang Dari 3 MB
            </Text>
          </div>
        </Group>
      </Dropzone>
      {props.file?.filename ? (
        <Flex
          mt="md"
          align="center"
          direction="row"
          gap="lg"
          sx={{
            border: "1px solid #243063",
            width: "fit-content",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Document size="80px" color="#243063" />
          <Stack justify="flex-end" align="flex-start">
            <Text color="white" size="15px">
              {props.file?.filename}
            </Text>
            <Group>
              <Link href="">
                <Text
                  color="white"
                  onClick={async () => {
                    try {
                      const response = await axios.get(props.file.url, {
                        responseType: "blob", // Menentukan respons sebagai tipe blob (binary data)
                      });

                      // Membuat URL objek blob yang dapat digunakan untuk membuat tautan unduhan
                      const blob = new Blob([response.data]);
                      const downloadUrl = URL.createObjectURL(blob);

                      // Membuat tautan unduhan palsu dan mengkliknya untuk memulai unduhan
                      const link = document.createElement("a");
                      link.href = downloadUrl;
                      link.setAttribute("download", props.file.filename); // Mengganti "file-name.ext" dengan nama file yang diinginkan
                      document.body.appendChild(link);
                      link.click();
                      // Menghapus tautan unduhan palsu setelah unduhan selesai
                      URL.revokeObjectURL(downloadUrl);
                      document.body.removeChild(link);
                    } catch (error) {}
                  }}
                >
                  Download
                </Text>
              </Link>
              {!props.isDisable &&(<Link href="">
                <Text
                  color="white"
                  onClick={async () => {
                    // setFile(null);
                    props.onFileUpload(null);
                  }}
                >
                  Delete
                </Text>
              </Link>)}
            </Group>
          </Stack>
        </Flex>
      ) : null}
    </>
  );
}
