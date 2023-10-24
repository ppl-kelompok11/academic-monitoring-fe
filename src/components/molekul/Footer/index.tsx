import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Logo from "@/components/atoms/logo";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: "#111213",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "80px",
    paddingRight: "80px",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color: "white",
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: "white",
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "80px",
    marginRight: "80px",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid white`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

export default function FooterLinks({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} href={link.link}>
        <Text className={classes.link}>{link.label}</Text>
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
          <Text size="xs" color="dimmed" className={classes.description}>
            Golden Generation 2045: Levearaging Leadership Through Resistance
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </div>
      <div className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 Future Leader Summit.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <Link
            href="https://www.youtube.com/@FutureLeaderSummit"
            target="_blank"
          >
            <ActionIcon size="lg">
              <IconBrandTwitter size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link
            href="https://www.youtube.com/@FutureLeaderSummit"
            target="_blank"
          >
            <ActionIcon size="lg">
              <IconBrandYoutube size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link href="https://www.instagram.com/flsummit/" target="_blank">
            <ActionIcon size="lg">
              <IconBrandInstagram size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
      </div>
    </footer>
  );
}
