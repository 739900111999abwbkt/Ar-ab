// user.js

export function createUserCard(user) {
  const card = document.createElement("div");
  card.classList.add("user-card");

  const avatar = document.createElement("img");
  avatar.src = user.avatar || "/src/assets/default-avatar.png";
  avatar.alt = user.username;
  avatar.classList.add("avatar");

  const name = document.createElement("span");
  name.textContent = user.username;

  card.appendChild(avatar);
  card.appendChild(name);

  // إضافة ID عند الضغط
  card.addEventListener("click", () => {
    navigator.clipboard.writeText(user.id);
    alert(`Copied ID: ${user.id}`);
  });

  return card;
}
