// For file /tabs/[activeTab].tsx
import { useRouter } from 'next/router';
import { Tabs } from '@mantine/core';

export default function Tab() {
  const router = useRouter();

  return (
    <Tabs
      value={router.query.activeTab as string}
      onTabChange={(value) => router.push(`/test/tab/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}