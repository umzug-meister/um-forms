export function scrollToElement(rootId: string) {
  const elem = document.getElementById(rootId);
  if (elem) {
    const top = elem.getBoundingClientRect().top + window.scrollY;

    window.scroll({ top, behavior: "smooth" });
  }
}
