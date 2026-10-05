# Local repo & Remote repo

## 내 컴퓨터와 GitHub

- 여러 Local repository를 하나의 Remote repository에 연결할 수 있다.
- Local repository에 새로운 commit이 생겨도 Remote에 바로 반영되지는 않는다.
- Local과 Remote의 파일 및 branch 정보가 항상 동기화되어 있는 것은 아니다.

## Command

Local repository에 Remote repository를 등록한다.

```bash
git remote add {name} {remote-url}
```

기본 Remote 이름은 보통 `origin`을 사용한다.

```bash
git remote add origin https://github.com/user/repository.git
```

등록된 Remote repository를 확인한다.

```bash
git remote -v
```
