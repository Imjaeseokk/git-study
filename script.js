const markdownUrl = "./content/git-study-notes.md";
const commitsApiUrl =
  "https://api.github.com/repos/Imjaeseokk/git-study/commits?path=content%2Fgit-study-notes.md&per_page=1";

const versionElement = document.querySelector("#version");
const modifiedElement = document.querySelector("#last-modified");
const downloadButton = document.querySelector("#download-button");
const statusElement = document.querySelector("#status");

async function loadMetadata() {
  try {
    const response = await fetch(commitsApiUrl, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);

    const [latestCommit] = await response.json();
    if (!latestCommit) throw new Error("commit not found");

    versionElement.textContent = latestCommit.sha.slice(0, 7);
    modifiedElement.textContent = new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "long",
      timeStyle: "short"
    }).format(new Date(latestCommit.commit.committer.date));
  } catch (error) {
    versionElement.textContent = "확인할 수 없음";
    modifiedElement.textContent = "확인할 수 없음";
    console.error(error);
  }
}

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
    statusElement.textContent = "다운로드에 실패했습니다. 잠시 후 다시 시도해 주세요.";
    console.error(error);
  } finally {
    downloadButton.disabled = false;
  }
}

downloadButton.addEventListener("click", downloadMarkdown);
loadMetadata();
