import { queryOptions, UseMutationOptions } from "@tanstack/react-query";
import { fileApi, memberApi, storageApi } from "./fetch";

const normalRetryCount = 3;
const normalStaleTime = 1000 * 60 * 10;

// member
const getMember = queryOptions({
  queryKey: ["member"],
  queryFn: async () => {
    const response = await memberApi.get();
    return response.body;
  },
  retry: normalRetryCount,
  staleTime: normalStaleTime,
});
const createMember: UseMutationOptions<
  Awaited<ReturnType<typeof memberApi.create>>["body"],
  Error,
  void
> = {
  retry: normalRetryCount,
  mutationFn: async () => {
    const response = await memberApi.create();
    return response.body;
  },
};
const deleteMember: UseMutationOptions<
  Awaited<ReturnType<typeof memberApi.delete>>["body"],
  Error,
  void
> = {
  retry: normalRetryCount,
  mutationFn: async () => {
    const response = await memberApi.delete();
    return response.body;
  },
};
export const memberQuery = {
  get: getMember,
  create: createMember,
  delete: deleteMember,
};

// file
// fileApi.create
const createFile: UseMutationOptions<
  Awaited<ReturnType<typeof fileApi.create.container>>["body"],
  Error,
  {
    parentKey: string;
    fileName: string;
  }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ parentKey, fileName }) => {
    const response = await fileApi.create.container(parentKey, fileName);
    return response.body;
  },
};
// fileApi.delete
const deleteFilePermanent: UseMutationOptions<
  Awaited<ReturnType<typeof fileApi.delete.permanent>>['body'],
  Error,
  { fileKey: string }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ fileKey }) => {
    const response = await fileApi.delete.permanent(fileKey);
    return response.body;
  },
};
const deleteFileToTrash: UseMutationOptions<
  Awaited<ReturnType<typeof fileApi.delete.trash>>['body'],
  Error,
  { fileKey: string }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ fileKey }) => {
    const response = await fileApi.delete.trash(fileKey);
    return response.body;
  },
};
// fileApi.read
const readFileStorage = (fileKey: string) =>
  queryOptions({
    queryKey: ["file", "storage", fileKey],
    queryFn: async () => {
      const response = await fileApi.read.storage(fileKey);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const readFileRoot = (fileKey: string) =>
  queryOptions({
    queryKey: ["file", "root", fileKey],
    queryFn: async () => {
      const response = await fileApi.read.root(fileKey);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const readFileInfo = (fileKey: string) =>
  queryOptions({
    queryKey: ["file", "info", fileKey],
    queryFn: async () => {
      const response = await fileApi.read.info(fileKey);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const readFileParent = (fileKey: string) =>
  queryOptions({
    queryKey: ["file", "parent", fileKey],
    queryFn: async () => {
      const response = await fileApi.read.parent(fileKey);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const readFileChildren = (fileKey: string) =>
  queryOptions({
    queryKey: ["file", "children", fileKey],
    queryFn: async () => {
      const response = await fileApi.read.children(fileKey);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const readFileFind = (fileKey: string, fileName: string) =>
  queryOptions({
    queryKey: ["file", "find", fileKey],
    queryFn: async () => {
      const response = await fileApi.read.find(fileKey, fileName);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
// fileApi.update
const updateFileName: UseMutationOptions<
  Awaited<ReturnType<typeof fileApi.update.name>>['body'],
  Error,
  { fileKey: string; fileName: string }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ fileKey, fileName }) => {
    const response = await fileApi.update.name(fileKey, fileName);
    return response.body;
  }
};
const updateFileParent: UseMutationOptions<
  Awaited<ReturnType<typeof fileApi.update.parent>>['body'],
  Error,
  { fileKey: string; parentKey: string }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ fileKey, parentKey }) => {
    const response = await fileApi.update.parent(fileKey, parentKey);
    return response.body;
  }
};
// fileApi.upload
const uploadFileWriteToken = (
  parentKey: string,
  fileName: string,
  byteSize: number,
) =>
  queryOptions({
    queryKey: ["file", "writeToken", parentKey, fileName],
    queryFn: async () => {
      const response = await fileApi.upload.writeToken(parentKey, fileName, byteSize);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const uploadFileComplete: UseMutationOptions<
  Awaited<ReturnType<typeof fileApi.upload.complete>>['body'],
  Error,
  { fileKey: string; totalChunks: number }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ fileKey, totalChunks }) => {
    const response = await fileApi.upload.complete(fileKey, totalChunks);
    return response.body;
  },
};
// fileApi.stream
const streamFileReadToken = (fileKey: string) =>
  queryOptions({
    queryKey: ["file", "stream", fileKey],
    queryFn: async () => await fileApi.stream.readToken(fileKey),
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
export const fileQuery = {
  create: {
    container: createFile,
  },
  delete: {
    permanent: deleteFilePermanent,
    trash: deleteFileToTrash,
  },
  read: {
    storage: readFileStorage,
    root: readFileRoot,
    info: readFileInfo,
    parent: readFileParent,
    children: readFileChildren,
    find: readFileFind,
  },
  update: {
    name: updateFileName,
    parent: updateFileParent,
  },
  upload: {
    writeToken: uploadFileWriteToken,
    complete: uploadFileComplete,
  },
  stream: {
    readToken: streamFileReadToken,
  },
};

// storage
// storageApi.file
const readStorageFile = (fileKey: string, fileName: string) =>
  queryOptions({
    queryKey: ["storage", "file", fileKey, fileName],
    queryFn: async () => {
      const response = await storageApi.file.read(fileKey, fileName);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
const writeStorageFile: UseMutationOptions<
  Awaited<ReturnType<typeof storageApi.file.write>>['body'],
  Error,
  { fileKey: string; chunkCount: number; fileData: Blob }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ fileKey, chunkCount, fileData }) => {
    const response = await storageApi.file.write(fileKey, chunkCount, fileData);
    return response.body;
  },
};
// storageApi.session
const issueSession = (token: string) =>
  queryOptions({
    queryKey: ["storage", "session", "issue"],
    queryFn: async () => {
      const response = await storageApi.session.issue(token);
      return response.body;
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });
export const storageQuery = {
  file: {
    read: readStorageFile,
    write: writeStorageFile,
  },
  session: {
    issue: issueSession,
  },
};