/**
 * @format
 */

import { appClient } from './lib/client';

export const postService = {
  publish: async (id: number) => {
    const res = await appClient.post(`/post/publish/${id}`, {});
    return res.data;
  },
  create: async (data: { url: string; content: string }) => {
    const res = await appClient.post('/post', data);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await appClient.delete(`/post/${id}`);
    return res.data;
  },
  getRecent: async () => {
    const res = await appClient.get('/post/new');
    return res.data;
  },
  getFromUser: async () => {
    const res = await appClient.get('/post/user');
    return res.data;
  },
  like: async (id: number) => {
    const res = await appClient.post(`/like/${id}`, {});
    return res.data;
  },
  removeLike: async (id: number) => {
    const res = await appClient.delete(`/like/${id}`);
    return res.data;
  },
};
