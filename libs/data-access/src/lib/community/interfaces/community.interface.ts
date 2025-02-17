export interface Community {
  id: number,
  admin: {
    id: number,
    username: string,
    avatarUrl: string,
    subscribersAmount: number,
    firstName: string,
    lastName: string,
    isActive: true,
    stack: string[],
    city: string,
    description: string
  },
  name: string,
  themes: string[],
  tags: string[],
  bannerUrl: string,
  avatarUrl: string,
  description: string,
  subscribersAmount: number,
  createdAt: string,
  isJoined: boolean
}
