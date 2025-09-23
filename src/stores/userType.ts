import { ref } from 'vue';

let initialType = null;

if (typeof window !== 'undefined' && window.localStorage) {
  initialType = localStorage.getItem('userType');
}

export const userType = ref(initialType);

export function setUserType(type) {
  userType.value = type;
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('userType', type);
  }
}
