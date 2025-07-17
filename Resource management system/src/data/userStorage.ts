import type { UserInfo } from '../redux/userSlice';

export function loadUsers(): UserInfo[] {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

export function saveUsers(users: UserInfo[]): void {
  localStorage.setItem('users', JSON.stringify(users));
}
