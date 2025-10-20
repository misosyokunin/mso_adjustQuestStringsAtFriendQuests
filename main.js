javascript:(async()=>{
"use strict";

/*
┏━━━━━━━━━━━━━━━━━┓
┃ＭＳＯ＿友好イベント用クエスト整形┃
┗━━━━━━━━━━━━━━━━━┛
Developer:
	魚頭男（https://minesweeper.online/ja/player/16842796 ）
Writing:
	魚頭男（https://minesweeper.online/ja/player/16842796 ）

贈れるクエストをいちいちコピペするのは面倒…。
というわけで、ツールを作りました。

=======================================================
このツールはMinesweeper.Online様（https://minesweeper.online/ 、以下「ＭＳＯ」）より公認を受けていない、非公認のものです。
当プログラムは、ＭＳＯ様とは一切関係ございませんので、このプログラムに関する質問・提言等の連絡は魚頭男（https://minesweeper.online/ja/player/16842796 、以下「魚」）までお願いします。
当プログラムについて、ＭＳＯ様に連絡することは絶対にしないでください。
運営者様並びにユーザー様にご迷惑にならないように努めておりますが、万が一のことがありましたら即削除いたします。
=======================================================
*/

/*
＝＝＝＝＝＝＝＝＝【使い方】＝＝＝＝＝＝＝＝＝
このスクリプトを実行して身を任せるだけです。

すべてのクエストを最短1秒で取得します
（環境によっては2秒以上掛かるかもしれません）。
スクリプト実行中は、できるだけタブの遷移やブラウザをバックグラウンドにしないようにしてください。

なお、他言語でも同じようなことができると思います。
ただ、このスクリプトのままでは動きませんので、適宜変えてください（「ja」や抽出文言）。

*/

const JEMS = [
	"アクアマリン",
	"オニキス",
	"サファイア",
	"トパーズ",
	"ルビー",
	"翡翠",
	"ダイヤモンド",
	"アメジスト",
	"ガーネット",
	"エメラルド"
];
const ARENAS = [
	"速度NG",
	"速度",
	"フラグなし",
	"効率",
	"高難易度",
	"ランダム難易度",
	"ハードコアNG",
	"ハードコア",
	"耐久",
	"ナイトメア"
];
const MODES = [
	"初級",
	"中級",
	"上級",
/*
	"イージー NG",
	"ミディアム NG",
	"ハード NG",
	"エビル NG",
*/
	"イージー",
	"ミディアム",
	"ハード",
	"エビル",
	"PvP"
];

function getAdjustQuestString(text){
	for(let i = 0; i < compactFuncs.length; i++){
		const rs = compactFuncs[i](text);
		if(rs){
			return rs;
		}
	}
}

const compactFuncs = [
	function(str){
		const jem = JEMS.find((JEM) => str.includes(JEM));
		if(jem){
			const num = str.match(/\d+/);
			return `${jem}${num}個`;
		}
	},
	function(str){
		if(/宝石/.test(str)){
			const num = str.match(/\d+/) ?? 1;
			if(/ゲームの報酬で/.test(str)){
				return `宝石${num}個（ゲーム報酬）`;
			}
			return `宝石${num}個`;
		}
	},
	function(str){
		if(/アリーナチケット/.test(str)){
			const num = str.match(/\d+/) ?? 1;
			return `アリーナチケット${num}枚`;
		}
	},
	function(str){
		if(/アリーナコイン/.test(str)){
			const num = str.match(/\d+/) ?? 1;
			return `アリーナコイン${num}枚`;
		}
	},
	function(str){
		if(!/アリーナ/.test(str)){
			return;
		}
		const num = str.match(/\d+/);
		const arena = ARENAS.find((ARENA) => str.includes(ARENA));
		if(arena){
			return `${arena}アリーナL${num}以上`;
		}
		return `好きなアリーナL${num}以上`;
	},
	function(str){
		if(/カスタム/.test(str)){
			const nums = str.match(/\d+/g);
			return `カスタム${nums[0]}x${nums[1]}/${nums[2]}`;
		}
	},
	function(str){
		const mode = MODES.find((MODE) => str.includes(MODE));
		if(mode){
			const num = str.match(/\d+/) ?? 1;
			if(/ヒントなし/.test(str)){
				return `${mode}ヒントなし${num}回`;
			}
			if(/秒以内/.test(str)){
				return `${mode}${num}秒以内`;
			}
			if(/フラグなし/.test(str)){
				return `${mode}フラグなし${num}回`;
			}
			if(/連続/.test(str)){
				return `${mode}${num}連`;
			}
			const num2 = str.match(/\d+/g);
			if(/効率/.test(str)){
				return `${mode}効率${num2[0]}%以上${num2[1] ?? 1}回`;
			}
			if(/回中/.test(str)){
				return `${mode}習熟${num2[1]}`;
			}
			if(/24時間/.test(str)){
				return `${mode}${num2[1]}回（24時間以内）`;
			}
			return `${mode}${num}回`;
		}
	},
	function(str){
		if(/名誉ポイント/.test(str)){
			const num = str.match(/\d+/) ?? 1;
			return `名誉${num}ﾎﾟｲﾝﾄ`;
		}
	},
	function(str){
		if(/コイン/.test(str)){
			const num = str.match(/[\d\s]+/) ?? 1;
			if(/ゲームの報酬で/.test(str)){
/*
				return `コイン${num}枚（ゲーム報酬）`;
*/
				return `コイン${num.replace(/\s/g, "")}枚`;
			}
			return `コイン${num.replace(/\s/g, "")}枚`;
		}
	},
	function(str){
		if(/イベントポイント/.test(str)){
			const num = str.match(/\d+/) ?? 1;
			return `イベントポイント${num}つ`;
		}
	},
	function(str){
		if(/経験/.test(str)){
			const num = str.match(/[\d\s]+/) ?? 1;
			return `経験${num.replace(/\s/g, "")}ポイント`;
		}
	},
];
const PUSH_NORMALQUEST_FLAG = "_";


/*＝＝＝＝＝＝＝＝＝＝【スクリプト実行確認】＝＝＝＝＝＝＝＝＝＝*/
{
	const TAR_URL = "https://minesweeper.online/ja/friend-quests";
	const TAR_TITLE = "イベントクエスト画面";
	if(location.href.includes(TAR_URL)){
		
	}else{
		const result = window.confirm(`${TAR_TITLE}ではありません。\n${TAR_TITLE}へ飛びますか？\n（ページ遷移後に再度このスクリプトを実行してください。）`);
		if(result){
			location.href = TAR_URL;
		}else{
			alert(`${TAR_TITLE}（${TAR_URL}）を表示させてください。`);
		}
		return;
	}
}


if(document.querySelector("#QuestsBlock > div").textContent.includes("贈れるクエスト")){

}else{
	alert("贈れるクエストがありません。");
	return;
}

const Wait = {
	waits : [],
	num : -1,
	add(){
		return new Promise((resolve) =>{
			this.num++;
			this.waits[this.num] = resolve;
		});
	},
	release(){
		this.waits[this.num]();
		this.waits[this.num] = "";
		this.num--;
	},
	time(sec){
		return new Promise((resolve) =>{
			setTimeout(function(){resolve();}, sec * 1000);
		});
	},
};


let Pagenation = document.querySelector("#QuestsBlock > div").nextElementSibling?.nextElementSibling;
async function updatePageNation(callback){
	Pagenation = document.querySelector("#QuestsBlock > div").nextElementSibling?.nextElementSibling;	/*再定義*/
	const target = document.body;
	const observer = new MutationObserver(async function (mutations) {
		const tar = mutations[0].target;
/*
					console.log(tar);
*/
		if(tar.classList.contains("pagination")){
			Wait.release();
			Pagenation = document.querySelector("#QuestsBlock > div").nextElementSibling?.nextElementSibling;	/*再定義*/
			observer.disconnect();
		}
	});
	observer.observe(target, {
		characterData: true,	/*テキストノードの変化を監視*/
		childList: true,	/*子ノードの変化を監視*/
		subtree: true,	/*子孫ノードも監視対象に含める*/
	});
	callback();	/*ページネーション操作を行う*/
	await Wait.add();
}
let moveNextPage = function(){
	isLooping = false;
	return true;
};
if(Pagenation?.tagName === "UL"){
	moveNextPage = (async () => {
		const nextButton = Pagenation.querySelector(".next");
		if(nextButton.classList.contains("disabled")){
			isLooping = false;
			return;
		}else{
			const callback = function(){
				nextButton.click();
			};
			await updatePageNation(callback);
		}
	});
	if(Pagenation.querySelector(".first").classList.contains("disabled")){
	}else{
		const callback = function(){
			Pagenation.querySelector(".first").click();
		};
		await updatePageNation(callback);
	}
}else{

}


let pa = [];
function getQuests(){
	const trs = document.querySelectorAll("#QuestsBlock > table:first-of-type > tbody > tr");
	trs.forEach((tr, index) => {
		const td = tr.querySelectorAll("td");
		const ind = pa.length + 1;
		const detail = getAdjustQuestString(td[1].textContent);
		const level = (() => {
			if(td[0].querySelector("img[alt=💀]")){
				return "L💀";
			}
			let rs = td[0].textContent;
/*
			if(rs.includes("E")){
			
			}else{
				rs += PUSH_NORMALQUEST_FLAG;
			}
*/
			return rs;
		})();
		
		const ta = [];
		ta.push(ind);
		ta.push(level);
		ta.push(detail);
	/*
		ta.push(td[2].textContent);
	*/
		pa.push(`${ta.join("\t")}\n`);
	});
}

let isLooping = true;
while(isLooping){
	getQuests();
/*
	console.log(pa);
*/
	await moveNextPage();
/*
	console.log(isLooping);
*/
};

const SCRIPT_STYLE = document.createElement("style");
SCRIPT_STYLE.innerHTML = `
#___________bk{
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 999;
	right: 0px;
	bottom: 0px;
	margin: auto;
	padding: 5%;
	height: 90%;
	width: 90%;
	display: flex;
	flex-direction: column;
}
#_________loadingtext{
	position: absolute;
	height: 90%;
	width: 90%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	font-size: 2em;
}
.hiddenContent{
	display: none !important;
}
#___________bk > textarea{
	height: 80%;
}
#___________bk > footer{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0px;
	height: 20%;
	padding: 0px;
}
#___________bk > footer > button:nth-of-type(3){
	grid-column: span 2 / span 2;
}
`;

const bk = document.createElement("div");
bk.id = "___________bk";
document.body.append(bk);
bk.append(SCRIPT_STYLE);
{
	const loadingtext = document.createElement("p");
	loadingtext.id = "_________loadingtext";
	loadingtext.classList.add("hiddenContent");
	bk.append(loadingtext);
	const textarea = document.createElement("textarea");
	textarea.value = pa.join("");
	bk.append(textarea);
	const footer = document.createElement("footer");
	bk.append(footer);
	{
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = "再採番";
		button.addEventListener("click", () => {
			const strs = textarea.value.split("\n");
			const newstrs = strs.map((str, index) => {
				return str.replace(/^\d+/, `${index + 1}`);
			});
			textarea.value = newstrs.join("\n");
		});
		footer.append(button);
	}
	{
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = "カスタムデータセット";
		button.addEventListener("click", () => {
			const arr = [...textarea.value.matchAll(/\d+x\d+\/\d+/g)];
			if(!arr.length){
				alert("カスタムがありません。");
				return;
			}
/*
			const size = window.prompt("カスタムのサイズをコピペしてね\n例：100x100/2183", arr[0][0]);
*/
			const size = arr[0][0];
			if(size){
				const url = `https://minesweeper.online/ja/start/${size}`;
/*
				window.open(url, "_blank");
*/
				bk.setAttribute("inert", "");
				loadingtext.classList.remove("hiddenContent");
				loadingtext.innerText = `${size}のカスタムデータ取得中…\nしばらくお待ち下さい。`;
				const iframe = document.createElement("iframe");
				iframe.setAttribute("src", url);
				iframe.style = "height: 100%; width: 100%;";
				document.body.append(iframe);
				iframe.addEventListener("load", () => {
					const target = iframe.contentWindow.document.body;
					const observer = new MutationObserver(function(mutations) {
						const tar = mutations[0].target;
/*
						console.log(tar);
*/
						if (tar.id === "difficulty_popover"){
							const content = tar.dataset.content;
							const mitudo = content.match(/(?<=爆弾の密度：<span class\=".*?">)\d+\.?\d+%/)[0];
							const hukuzatusa = content.match(/(?<=複雑さ：.*?)\d+\s?\d+/)[0].replace(/\s/, "");
							textarea.value = textarea.value.replace(size, `${size}☠${hukuzatusa}💣${mitudo}`);
							loadingtext.classList.add("hiddenContent");
							bk.removeAttribute("inert");
							observer.disconnect();
							iframe.remove();
						}
					}
					);
					observer.observe(target, {
						attributes: true,
						characterData: true,
						childList: true,
						subtree: true,
					});
				}
				);
			}
		});
		footer.append(button);
	}
	{
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = "コピーしておわる";
		button.addEventListener("click", () => {
			textarea.select();
			document.execCommand("copy");
	/*
			window.getSelection?.().removeAllRanges();
			textarea.blur();
	*/
			bk.remove();
		});
		footer.append(button);
	}
}


})();
