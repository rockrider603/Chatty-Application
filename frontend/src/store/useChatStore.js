import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  onlineUsers: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ Fetch users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res?.data || [] }); // 🔥 SAFE fallback
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
      set({ users: [] }); // 🔥 ensure safe state
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ Fetch messages
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res?.data || [] }); // 🔥 SAFE fallback
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
      set({ messages: [] }); // 🔥 ensure safe state
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Send message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser?._id) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({
        messages: [...(messages || []), res?.data], // 🔥 SAFE spread
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  // ✅ Socket subscription
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageFromSelectedUser) return;

      set({
        messages: [...(get().messages || []), newMessage], // 🔥 SAFE
      });
    });
  },

  // ✅ Unsubscribe
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },

  // ✅ Select user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));