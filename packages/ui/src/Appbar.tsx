import { Button } from "./button";

interface AppbarProps {
  user?: { name?: string | null  } ;
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
 
  return (
    <div className="flex justify-between border-b px-4 py-2">
      <div className="text-lg flex items-center">PayTM</div>
      <div className="flex items-center ">
      <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  );
};
