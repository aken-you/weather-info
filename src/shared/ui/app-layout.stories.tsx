import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  AppLayout,
  AppLayoutHeader,
  AppLayoutContent,
  AppLayoutMain,
  AppLayoutSidebar,
  AppLayoutFooter,
} from './app-layout'

const meta: Meta<typeof AppLayout> = {
  title: 'Layouts/AppLayout',
  component: AppLayout,
  parameters: {
    // 추가
    componentSubtitle: '페이지의 레이아웃을 구성합니다.',
  },
}

export default meta

type Story = StoryObj<typeof AppLayout>

/**
 * 💻 Desktop 레이아웃은 header, sidebar, main으로 구성됩니다.
 */
export const Desktop: Story = {
  name: 'Desktop Layout',
  render: () => {
    return (
      <AppLayout>
        <AppLayoutHeader>
          <div>header!</div>
        </AppLayoutHeader>

        <AppLayoutContent>
          <AppLayoutSidebar>sidebar</AppLayoutSidebar>
          <AppLayoutMain>main</AppLayoutMain>
        </AppLayoutContent>
      </AppLayout>
    )
  },
}

/**
 * 📱 Mobile 레이아웃은 header, main, footer로 구성됩니다.
 */
export const Mobile: Story = {
  name: 'Mobile Layout',
  render: () => {
    return (
      <AppLayout>
        <AppLayoutHeader>
          <div>header!</div>
        </AppLayoutHeader>

        <AppLayoutContent>
          <AppLayoutMain>main</AppLayoutMain>
        </AppLayoutContent>

        <AppLayoutFooter>footer</AppLayoutFooter>
      </AppLayout>
    )
  },
}
