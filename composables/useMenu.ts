export const useNoMenu = () => {
  const { $menu } = useNuxtApp()

  return $menu
}
