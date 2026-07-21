import type { Meta, StoryObj } from '@storybook/react-vite'

import { VideoPlayer } from '@components/VideoPlayer'
import type { TFile } from '@api/models/file/type/TFile'
import { StoryRow } from '../../storybook/AppDecorator'

const sampleVideo: TFile = {
  id: 10,
  original_name: 'demo.mp4',
  mime_type: 'video/mp4',
  extension: 'mp4',
  size_bytes: 1_024_000,
  scan_status: 'clean',
  owner_profile_type: 'worker_profile',
  owner_profile_id: 1,
  created_at: '2026-07-20',
  updated_at: '2026-07-20',
  deleted_at: null,
}

const meta = {
  title: 'Primitives/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <StoryRow>
        <Story />
      </StoryRow>
    ),
  ],
  args: {
    file: sampleVideo,
    // Public sample — Storybook only; CRM uses authenticated blob URLs.
    previewUrl:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
} satisfies Meta<typeof VideoPlayer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NotVideo: Story = {
  args: {
    file: {
      ...sampleVideo,
      mime_type: 'application/pdf',
      extension: 'pdf',
      original_name: 'doc.pdf',
    },
  },
}

export const Dark: Story = {
  globals: {
    theme: 'dark',
  },
}
