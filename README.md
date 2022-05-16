# XelticaMC BOT

XelticaMC Discord専用の汎用BOT

## 動かし方

まず example.env を .env にコピーする

```shell
cp example.env .env
# お好きなエディターで編集する
```

それか、新しく作成する

```conf
# BOT トークン
BOT_TOKEN=your_bot_token
# はじめに channel ID
TOS_CHANNEL=
# ロール　チャンネル ID
ROLE_CHANNEL=
# メンバーロール ID
MEMBER_ROLE=
# コマンドのプレフィックス
COMMAND_PREFIX=!
# 管理者のDiscord 内部ID。カンマ区切りで複数指定できる
ADMINS=
```

```shell
# インストール
yarn install
# ビルド
yarn build
# 起動
yarn start
```

## LICENSE

[MIT ライセンス](LICENSE)