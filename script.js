const markdownUrl = "../content/git-study-notes.md";
const downloadButton = document.querySelector("#download-button");
const statusElement = document.querySelector("#status");

async function downloadMarkdown() {
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

downloadButton.addEventListener("click", downloadMarkdown);
