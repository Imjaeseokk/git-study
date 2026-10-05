const downloadButton = document.querySelector("#download-button");
const statusElement = document.querySelector("#status");

async function downloadMarkdown() {
  const markdownUrl = "../content/git-study-notes.md";
  downloadButton.disabled = true;
  statusElement.textContent = "파일을 준비하고 있습니다…";

  try {
    const response = await fetch(markdownUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "git-study-notes.md";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    statusElement.textContent = "다운로드를 시작했습니다.";
  } catch (error) {
    statusElement.textContent = "다운로드에 실패했습니다.";
    console.error(error);
  } finally {
    downloadButton.disabled = false;
  }
}

if (downloadButton) {
  downloadButton.addEventListener("click", downloadMarkdown);
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      fallbackCopy(text);
    }

    const tooltip = button.querySelector(".copy-tooltip");
    button.dataset.copied = "true";
    button.setAttribute("aria-label", "복사됨");
    tooltip.textContent = "copied";

    window.setTimeout(() => {
      delete button.dataset.copied;
      button.setAttribute("aria-label", "명령어 복사");
      tooltip.textContent = "copy";
    }, 1600);
  });
});

const sectionLinks = [...document.querySelectorAll("[data-section]")];
const sectionMap = new Map(
  sectionLinks
    .map((link) => [link.dataset.section, document.getElementById(link.dataset.section)])
    .filter(([, section]) => section)
);

function setCurrentSection(id) {
  sectionLinks.forEach((link) => {
    if (link.dataset.section === id) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (sectionMap.size) {
  setCurrentSection(sectionMap.keys().next().value);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setCurrentSection(visible.target.id);
    },
    { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.5] }
  );

  sectionMap.forEach((section) => observer.observe(section));
  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => setCurrentSection(link.dataset.section));
  });
}
