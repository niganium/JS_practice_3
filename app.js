//削除関数はタスク追加関数に入れる。削除ボタンの変数はcreateElementでこれもタスク追加関数に格納
//タスク追加＆削除ごとにtrタグの中身を初期化。タスク配列からHTML展開する命令を関数に
'use strict';
const todos = [];
const todoList = document.getElementById('todoList');
const addTask = document.getElementById('addTask');
const inputTask = document.getElementById('inputTask');
// 全て、作業中、完了のボタン
const swicthAll = document.getElementById('all');
const swicthWorking = document.getElementById('working');
const swicthFinished = document.getElementById('finished');

// tr下の展開した要素をリセット
const resetNodes = (todoList) => {
  todoList.textContent = null;
  // 再度配列展開
  deployTodo(todos);
};

// 配列のToDoリスト展開
const deployTodo = (todos) => {
  for (const [key, value] of todos.entries()) {
    const tr = document.createElement('tr');
    const tdKey = document.createElement('td');
    const tdTask = document.createElement('td');
    const tdStatus = document.createElement('td');
    const taskStatus = document.createElement('input');
    const taskDelete = document.createElement('input');
    tr.className = `todo_${key}`;
    tdKey.textContent = key;
    tdTask.textContent = value.content;
    taskDelete.id = key;
    taskStatus.setAttribute('type', 'submit');
    if (value.finishing === false) {
      taskStatus.value = '作業中'
    } else {
      taskStatus.value = '完了'
    }
    taskDelete.setAttribute('type', 'submit');
    taskDelete.setAttribute('value', '削除');
    tdStatus.appendChild(taskStatus);
    tdStatus.appendChild(taskDelete);
    tr.appendChild(tdKey);
    tr.appendChild(tdTask);
    tr.appendChild(tdStatus);
    todoList.appendChild(tr);

    // チェックボタンによって要素を非表示
    if (swicthFinished.checked == true) {
      hideNode(key);
    }

    // 課題3状態変更ボタン
    taskStatus.addEventListener('click', (evt) => {
    // タスクボタンに付与されているidを取得→配列内のfinishingのt/f反転→ボタン書き換え
      value.finishing = !value.finishing
      if (value.finishing === false) {
        taskStatus.value = '作業中'
      } else {
        taskStatus.value = '完了'
      }
    });
      // 課題2削除ボタン
    taskDelete.addEventListener('click', (evt) => {
      todos.splice(key, 1);
      // リセット
      resetNodes(todoList);
    });
  }
}; 

// Todoの新規作成→配列に格納
const newTodo = (task, todos) => {
  let newTodo = { content: task, finishing: false };
  todos.push(newTodo);
  // リセット
  resetNodes(todoList);
};

// 追加するイベント(空だと何も起こらない)
addTask.addEventListener('click', (evt) => {
  const task = inputTask.value;
  if (task.length) {
    newTodo(task, todos);
    inputTask.value = '';
  }
});


// 第3-４課題
const hideNode = (node) => {
  // 指定した要素を非表示(HTML_COLLECTIONは[]に格納されてるので[0]で展開{あまり良さげではない})
  document.getElementsByClassName(`todo_${node}`)[0].style.display = "none";
};

swicthAll.addEventListener('click', (evt) => {
  // 非表示要素を解体→再展開
  resetNodes(todoList);
});

swicthWorking.addEventListener('click', (evt) => {
  // 表示したい要素が隠れている場合があるので非表示要素を解体→再展開
  resetNodes(todoList);
  for (var i=0; i<todos.length; i++) {
    if (todos[i].finishing === true) {
      hideNode(i)
    }
  }
});
swicthFinished.addEventListener('click', (evt) => {
  // 表示したい要素が隠れている場合があるので非表示要素を解体→再展開
  resetNodes(todoList);
  for (var i=0; i<todos.length; i++) {
    if (todos[i].finishing === false) {
      hideNode(i)
    }
  }
});