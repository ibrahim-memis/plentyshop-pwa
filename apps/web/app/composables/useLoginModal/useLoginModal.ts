export const useLoginModal = () => {
  const isLoginModalOpen = useState('isLoginModalOpen', () => false);

  const openLoginModal = () => {
    isLoginModalOpen.value = true;
  };

  const closeLoginModal = () => {
    isLoginModalOpen.value = false;
  };

  return { isLoginModalOpen, openLoginModal, closeLoginModal };
};
