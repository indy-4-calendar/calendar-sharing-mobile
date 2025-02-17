import { useMutation } from '@tanstack/react-query';

import { updateUser } from '@/api';
import { UpdateUserRequest } from '@/@types';

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      const res = await updateUser(data);
      if ('error' in res) throw res;
      return res.data;
    },
  });
};
