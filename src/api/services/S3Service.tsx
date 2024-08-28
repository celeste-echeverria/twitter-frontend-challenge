import { noAuthAxios } from '../axiosConfig'

export const S3Service = {
  upload: async (file: File, url: string) => {
    const blob = new Blob([file], { type: file.type });

    await noAuthAxios.put(url, blob, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
