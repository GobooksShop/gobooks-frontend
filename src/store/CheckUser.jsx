import useUserStore from './useUserStore';

const checkUserData = () => {
  const { user } = useUserStore.getState();
  console.log(user);
};

checkUserData();