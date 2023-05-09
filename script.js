////////// アロー関数とbind ////////////

// bindの意味や使い方
// thisは今選択しているオブジェクト
function introduce(age) {
	return (`${this.name}さんは${age}歳です。idは${this.id}番です。`);
	console.log(`${this.name}さんは${age}歳です。idは${this.id}番です。`);
}

const person1 = {
	name: "山田",
	id: "32",
}

const person2 = {
	name: "佐藤",
	id: "42",
}

const person3 = {
	name: "田中",
	id: "35",
}

// bindする時は、変数にいれ変えないと取得できない
const hoge = introduce.bind(person3);

// 画面に表示してみる
const sampleForm = document.querySelector('.sample-form');
sampleForm.innerHTML = hoge(21)

// ここからアロー関数とbindの使い方や特徴のサンプルコード
const resultForm = document.querySelector('.result-form');
const itemArea = document.querySelector('.item-area');
itemList = [{
		id: 1,
		title: "item1"
	},
	{
		id: 2,
		title: "item2"
	},
	{
		id: 3,
		title: "item3"
	}
]

function loadEvent() {
	for (let item of itemList) {
		let el = document.createElement("li");
		el.innerHTML = `
		<span>${item.title}</span>
		<button class="btn">選択</botton>
		`;
		itemArea.appendChild(el)
		const btn = el.querySelector(".btn");

		// --type1--
		// これはダメ
		// thisがbuttonタグを選択している為動作しない。（ローカルスコープだから）
		// btn.addEventListener("click", selectItem(item.id))

		// --type2--bindを使ってグローバルスコープにする方法
		// bind(null)にするとグローバルスコープになる
		// btn.addEventListener("click", selectItem.bind(null, item.id))

		// --type3--アロー関数を使う方法
		// アロー関数で呼ぶとthisが自動的にwindowオブジェクトになる、つまりグローバルスコープになるってこと
		// これが主流のモダンなJSの方法、これを使う方がいい
		btn.addEventListener("click", () => selectItem(item.id))

	}
}

loadEvent()

function selectItem(arg) {
	// thisはbuttonタグではなく、window（画面全体オブジェクト）となっている
	console.log(this);
	const selected = itemList.find((obj) => {
		return obj.id === arg;
	});
	console.log(selected.title);
	resultForm.value = selected.title;
}

// コールバックとして実行するわけではない時はbindはきにしなくてOK
// アロー関数で関数を呼ぶと自動的にグローバルスコープになるのでbindの必要なし
// モダンJSではクラスコンポーネントではなく関数コンポーネントの書き方が主流になっていてアロー関数を使うよ
// クラスを定義したり複雑なコールバックを作る時にbindを意識すべし