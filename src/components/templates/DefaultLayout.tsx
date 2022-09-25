import {
  AppShell,
  createStyles,
  Navbar,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
  TablerIcon,
} from '@tabler/icons';
import React from 'react';
import { ReactNode } from 'react';
import { NavbarMinimal } from './NavbarMinimal';

type DefaultLayoutProps = { children: ReactNode };

const useStyles = createStyles((theme) => ({
  test: {
    backgroundColor: theme.colors.gray?.[9],
  },
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark?.[0]
        : theme.colors.gray?.[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark?.[5]
          : theme.colors.gray?.[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Página' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { classes } = useStyles();
  const [active, setActive] = React.useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <AppShell
      className={classes.test}
      navbar={
        <Navbar>
          <Navbar.Section>{links}</Navbar.Section>
        </Navbar>
      }
      padding={'md'}
    >
      {children}
    </AppShell>
  );
};
