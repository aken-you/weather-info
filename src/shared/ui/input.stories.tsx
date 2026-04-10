import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'placeholder 텍스트를 설정합니다.',
      control: 'text',
    },
    disabled: {
      description: '비활성화 여부를 설정합니다.',
      control: 'boolean',
    },
    value: {
      description: '입력값을 설정합니다.',
      control: 'text',
    },
  },
  args: {
    placeholder: '입력하세요',
    disabled: false,
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
    disabled: false,
    value: '',
  },
}
