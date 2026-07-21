import type { Meta, StoryObj } from '@storybook/react-vite'

import { MediaGallery } from '@components/MediaGallery'
import type { TFile } from '@api/models/file/type/TFile'
import { StoryRow } from '../../storybook/AppDecorator'
import { withStoryReduxState } from '../../storybook/storyDecorators'

const sampleImages: TFile[] = [
  {
    id: 1,
    original_name: 'seed-badge.png',
    mime_type: 'image/png',
    extension: 'png',
    size_bytes: 4200,
    scan_status: 'clean',
    owner_profile_type: 'worker_profile',
    owner_profile_id: 1,
    created_at: '2026-07-20',
    updated_at: '2026-07-20',
    deleted_at: null,
  },
  {
    id: 2,
    original_name: 'preview.jpg',
    mime_type: 'image/jpeg',
    extension: 'jpg',
    size_bytes: 12800,
    scan_status: 'clean',
    owner_profile_type: 'worker_profile',
    owner_profile_id: 1,
    created_at: '2026-07-20',
    updated_at: '2026-07-20',
    deleted_at: null,
  },
]

const meta = {
  title: 'Primitives/MediaGallery',
  component: MediaGallery,
  tags: ['autodocs'],
  decorators: [
    withStoryReduxState,
    Story => (
      <StoryRow>
        <Story />
      </StoryRow>
    ),
  ],
  args: {
    files: sampleImages,
    thumbUrl: (id: number) =>
      `https://picsum.photos/seed/thumb-${id}/240/240`,
    originalUrl: (id: number) =>
      `https://picsum.photos/seed/original-${id}/1200/800`,
    ensureOriginal: () => undefined,
  },
} satisfies Meta<typeof MediaGallery>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    files: [],
  },
}

export const Dark: Story = {
  globals: {
    theme: 'dark',
  },
  parameters: {
    reduxState: {
      theme: { currentTheme: 'dark' },
    },
  },
}
