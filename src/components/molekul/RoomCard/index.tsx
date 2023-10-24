import {
  Button,
  Card,
  Image,
  Text,
  createStyles,
  Modal,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const UseStyles = createStyles((theme) => ({
  card: {
    [theme.fn.smallerThan("md")]: {
      width: "340px",
    },
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
    },
  },
  modal: {
    [theme.fn.smallerThan("md")]: {
      size: "xs",
    },
  },
}));
interface RoomCardProps {
  name: string;
  description: string;
  image: string;
}
export default function Index({ name, description, image }: RoomCardProps) {
  const { classes } = UseStyles();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        // className={classes.modal}
        size="lg"
        opened={opened}
        onClose={close}
        title={
          <Text size={17} color="white" weight={500} align="center">
            {name}
          </Text>
        }
        centered
        styles={{
          header: {
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
          },
          content: {
            backgroundColor: "black",
            height: "70vh",
          },
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            // className={classes.image}
            src={image}
            alt="Random image from unsplash"
            width={380}
            height={200}
            style={{ padding: "auto" }}
            fit="contain"
          />
        </Box>
        <br />
        <Box>
          <Text color="white" align="justify">
            {description}
          </Text>
        </Box>
      </Modal>
      <Card
        className={classes.card}
        padding="lg"
        sx={{
          margin: "0 auto",
          width: "380px",
          border: "1px solid #243063",
          borderRadius: "8px",
          backgroundColor: "#243063",
        }}
      >
        <Card.Section sx={{ backgroundColor: "black", height: "200px" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              // className={classes.image}
              src={image}
              alt="Random image from unsplash"
              width={380}
              height={200}
              style={{ padding: "auto" }}
              fit="contain"
            />
          </Box>
        </Card.Section>
        <Box sx={{ height: "60px" }}>
          <Text size={17} color="white" weight={500} align="center">
            {name}
          </Text>
        </Box>

        {/* <Text size={14} color="white">
          Its about us learning and managing to utilize technology other than
          the opposite.
        </Text> */}
        <br />
        <Button fullWidth onClick={open}>
          See Detail Room
        </Button>
      </Card>
    </>
  );
}
