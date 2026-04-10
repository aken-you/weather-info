import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: '버튼의 스타일을 설정합니다.',
      control: 'select',
      options: ['primary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      description: '버튼의 크기를 설정합니다.',
      control: 'select',
      options: ['m', 'xs', 'sm', 'lg'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args => <Button {...args}>Primary Button</Button>,
}
