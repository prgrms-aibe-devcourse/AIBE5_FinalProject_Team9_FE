export const DEFAULT_PROFILE_AVATAR = "/images/령냥/ghost-cat-avatar.png";

export const getProfileAvatar = (
  profileImageUrl: string | undefined,
) => {
  const trimmedUrl = profileImageUrl?.trim();
  return trimmedUrl || DEFAULT_PROFILE_AVATAR;
};
