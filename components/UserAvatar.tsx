import Image from "next/image";

interface Props {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
}
const UserAvatar = ({ avatarUrl, firstName, lastName, email }: Props) => {
  // Якщо аватарка відсутня, створюємо ініціали
  const getInitials = (name: string) => {
    if (!name) return "U"; // Якщо ім'я відсутнє, повертаємо "U" (User)
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(firstName || lastName || email);

  return (
    <div>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "#fff",
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
