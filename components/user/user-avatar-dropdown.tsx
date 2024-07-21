import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

type Props = { classname?: string };

export default function UserAvatarDropdown({ classname }: Props) {
  const { data } = useSession();
  const user = data?.user;
  return (
    <>
      <Avatar className={cn(classname)}>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback className=" bg-lime-600 font-semibold text-sm">
          {user?.name![0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </>
  );
}
