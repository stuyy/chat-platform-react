import axios, { AxiosRequestConfig } from 'axios';
import {
  Conversation,
  CreateConversationParams,
  CreateGroupParams,
  CreateMessageParams,
  CreateUserParams,
  DeleteGroupMessageParams,
  DeleteGroupMessageResponse,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessagePayload,
  FetchGroupMessagePayload,
  FetchMessagePayload,
  Group,
  MessageType,
  User,
  UserCredentialsParams,
} from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) =>
  axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getConversations = () =>
  axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationMessages = (conversationId: number) =>
  axiosClient.get<FetchMessagePayload>(
    `/conversations/${conversationId}/messages`,
    config
  );

export const postNewMessage = ({ id, content }: CreateMessageParams) =>
  axiosClient.post(`/conversations/${id}/messages`, { content }, config);

export const postNewConversation = (data: CreateConversationParams) =>
  axiosClient.post<Conversation>(`/conversations`, data, config);

export const deleteMessage = ({ id, messageId }: DeleteMessageParams) =>
  axiosClient.delete<DeleteMessageResponse>(
    `/conversations/${id}/messages/${messageId}`,
    config
  );

export const editMessage = ({
  content,
  conversationId,
  messageId,
}: EditMessagePayload) =>
  axiosClient.patch<MessageType>(
    `/conversations/${conversationId}/messages/${messageId}`,
    { content },
    config
  );

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupMessages = (id: number) =>
  axiosClient.get<FetchGroupMessagePayload>(`/groups/${id}/messages`, config);

export const postGroupMessage = ({ id, content }: CreateMessageParams) =>
  axiosClient.post(`/groups/${id}/messages`, { content }, config);

export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const createGroup = (params: CreateGroupParams) =>
  axiosClient.post(`/groups`, params, config);

export const deleteGroupMessage = ({
  id,
  messageId,
}: DeleteGroupMessageParams) =>
  axiosClient.delete<DeleteGroupMessageResponse>(
    `/groups/${id}/messages/${messageId}`,
    config
  );
