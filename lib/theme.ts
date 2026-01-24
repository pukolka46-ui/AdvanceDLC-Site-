export const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
};

export const loadTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add("dark");
};
