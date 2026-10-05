# Local repo & Remote repo

## Local과 Remote의 관계

- Local은 작업 중인 commit과 branch를 보관하는 내 컴퓨터의 저장소다.
- Remote는 협업과 백업을 위해 네트워크 또는 다른 경로에 둔 저장소다. GitHub는 Remote를 제공하는 서비스 중 하나다.
- Local의 새 commit은 `git push`를 실행하기 전까지 Remote에 반영되지 않는다.
- `git fetch`는 Remote의 최신 이력을 내려받아 Local의 remote-tracking branch를 갱신한다. working tree를 자동으로 바꾸지는 않는다.

## Command

Local repository에 Remote repository를 등록한다.

```bash
git remote add <name> <remote-url>
```

기본 Remote 이름은 보통 `origin`을 사용한다.

```bash
git remote add origin https://github.com/user/repository.git
```

등록된 Remote repository를 확인한다.

```bash
git remote -v
```
