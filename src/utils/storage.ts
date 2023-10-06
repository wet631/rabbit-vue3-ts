import { Profile } from "@/types/user";
const PROFILE_KEY = "rabbit-profile-92";
// 封装和localstorage相关的api

/**
 * 设置个人信息
 * @param profile
 */
export function setProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

/**
 * 获取个人信息
 * @returns
 */
export function getProfile(): Profile {
  return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
}

/**
 * 移除个人信息
 */
export function removeProfile(): void {
  localStorage.removeItem(PROFILE_KEY);
}
