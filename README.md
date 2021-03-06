# Shogi.js (Ver. 1.0)
将棋の盤駒を扱うシンプルなJavaScriptライブラリ．DOM, jQuery等不使用．TypeScript．

## インストール

```
npm install shogi.js
```

もしくは右のDownload ZIPから．

## 概要
* 最低限の将棋の法則に従って操作ができる．
	* 局面を平手に並べることができる．
	* 駒を移動(move)すると，移動先の駒を取れる．
	* 駒を打つ(drop)ことができる．
	* 動作を戻すことができる．
* モード(editMode)
	* 通常(false)
		* 手番と動きを守っているかどうかをチェック
		* 手番を管理
	* 編集(true): 
		* 手番や動きをチェックしない
		* 手番を変更する
		* 盤上の駒を駒台に載せる
		* 盤上の駒を裏返し・反転させる

通常モードは棋譜再生および対局を，編集モードは盤面編集をモデル化するものである．

## クラス概要
各クラスのメソッドの概要についてはコメントを確認されたい．
また，`test`ディレクトリ以下のテストで実際の挙動を確認されたい．

* class Shogi
	* 将棋盤を管理するクラス
* enum Color
	* Black=0, White=1
* class Piece
	* 駒を表すクラス

## TODO
* 駒箱

## 開発環境
package.jsonに必要モジュールが書いてあります．パッケージマネージャnpmを使用し，

```
$ npm install

```

を実行することで下記のモジュールをインストールできます．

* TypeScript 1.5
* gulp 3.9 (自動化ツール)
	* gulp-typescript 2.8
	* gulp-mocha 2.1 (テストフレームワーク)
	* gulp-istanbul 0.10 (カバレッジ計測)
	* gulp-webserver 0.9 (ライブリロード付きサーバ)


```
$ ./node_modules/.bin/gulp # パスが通っている場合は単にgulp
```

を起動すると，コンソールでテスト結果が表示され，カバレッジレポートが立ち上がります．ソースコードを変更するとTypeScriptのコンパイルとテストが，テストを変更するとテストが走り，カバレッジレポートがリロードされます．

開発時にこれを起動しておくと，テストの通過具合とカバレッジの網羅具合を確認しながら開発できます．テストがすべて通過していることとカバレッジが十分高いことを確認できたらコミットしてください．

コンパイルは`gulp build`，テストは`gulp test`でも実行できます．

## license

MIT License (see LICENSE.txt)
