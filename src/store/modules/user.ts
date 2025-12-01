import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userState', () => {
  // state
  const token = ref(null);
  const userInfo = ref({});
  const roles = ref([]);

  // actions
  const login = (userInfoData) => {
    const { username } = userInfoData;
    return new Promise((resolve) => {
      token.value = username;
      userInfo.value = userInfoData;
      getRoles();
      resolve(username);
    });
  };

  const getRoles = () => {
    return new Promise((resolve) => {
      roles.value = ['admin'];
      resolve(roles.value);
    });
  };

  const getInfo = (userRoles) => {
    return new Promise((resolve) => {
      roles.value = userRoles;
      resolve(userRoles);
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      token.value = null;
      userInfo.value = {};
      roles.value = [];
      resolve(null);
    });
  };

  return {
    token,
    userInfo,
    roles,
    login,
    getRoles,
    getInfo,
    logout,
  };
}, {
  persist: {
    key: 'userState',
    storage: localStorage,
  },
});
