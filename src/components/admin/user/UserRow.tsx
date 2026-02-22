import { TableCell,TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { User } from "@/types/user";

interface Props {
  user: User;
}
export default function UserRow({ user }: Props) {
  return (
    //  {users.map((user:User) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
                        />
                      </div> */}
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.username}
                        </span>
                        {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.role}
                        </span> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.phone_number}
                  </TableCell>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {order.team.images.map((teamImage, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={teamImage}
                            alt={`Team member ${index + 1}`}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell> */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      variant="solid"

                      color={
                        user.type === "super_admin" 
                          ? "success"
                          : user.type==="admin"
                          ? "info"
                          : "warning"
                      }
                    >
                      {user.type === "super_admin" ? "Super Admin" : user.type==="admin" ? "Admin" : "Staff"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.is_active 
                          ? "success"
                          : !user.is_active
                          ? "primary"
                          : "warning"
                      }
                    >
                      {user.is_active  ? "Active" : !user.is_active  ? "Inactive" : "Error"}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.address}
                  </TableCell> */}
                </TableRow>
              )
            // )
            // }
//   );
}    